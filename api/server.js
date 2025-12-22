const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection
let db;
let componentsCollection;
let bulkSessionsCollection;

async function connectToMongoDB() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn('⚠️  MONGODB_URI not found in environment. Database features will be disabled.');
      return;
    }

    const client = new MongoClient(mongoUri);
    await client.connect();
    
    db = client.db();
    componentsCollection = db.collection('components');
    bulkSessionsCollection = db.collection('bulkSessions');
    
    console.log('✅ Connected to MongoDB successfully');
    console.log(`📦 Database: ${db.databaseName}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.warn('⚠️  Database features will be disabled.');
  }
}

// Configure CORS to accept requests from GitHub Pages
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://yanivorion.github.io',
    'https://yanivorion.github.io/wix-component-studio'
  ],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Single component generation endpoint
app.post('/api/claude', async (req, res) => {
  try {
    const { prompt, designBrief, projectName, systemInstructions, apiKey } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Use provided API key or fallback to server environment variable
    const claudeApiKey = apiKey || process.env.CLAUDE_API_KEY;
    
    if (!claudeApiKey) {
      return res.status(400).json({ 
        error: 'Claude API key is required. Please provide it in the request or set CLAUDE_API_KEY environment variable.' 
      });
    }

    const anthropic = new Anthropic({
      apiKey: claudeApiKey
    });

    // Build the user message
    let userMessage = `User Request: ${prompt}`;
    
    if (designBrief) {
      userMessage += `\n\nDesign Brief:\n${designBrief}`;
    }
    
    if (projectName) {
      userMessage += `\n\nProject Name: ${projectName}`;
    }

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 4096,
      temperature: 1,
      system: systemInstructions || `You are a React component generator. Create a complete React component with MANIFEST and Component function.

MANIFEST structure:
- type: Component category (e.g., "Layout.HeroSection", "Navigation.Menu")
- description: Brief component description
- editorElement.data: Configuration properties with dataType, displayName, defaultValue, group

Component function:
- Accepts { config = {} } parameter
- Uses config values for customization
- Returns JSX with inline styles
- Should be responsive and modern

Requirements:
- Use modern React patterns
- Include proper TypeScript-style prop destructuring
- Use inline styles (no external CSS)
- Make components visually appealing
- Include hover effects and transitions
- Ensure accessibility
- Use semantic HTML elements

IMPORTANT: Return ONLY the code without any markdown formatting, explanations, or code fences. Start directly with 'const MANIFEST = ...'`,
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ]
    });

    // Extract the code from Claude's response
    let code = message.content[0].text;
    
    // Remove markdown code fences if present
    code = code.replace(/```(?:javascript|jsx|js)?\n?/g, '').replace(/```$/g, '').trim();

    res.json({ 
      code,
      usage: message.usage,
      model: message.model
    });

  } catch (error) {
    console.error('Claude API Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate component',
      details: error.response?.data || null
    });
  }
});

// Bulk generation endpoint with Server-Sent Events for progress
app.post('/api/claude/bulk-stream', async (req, res) => {
  try {
    const { requests, systemInstructions, apiKey } = req.body;

    if (!requests || !Array.isArray(requests) || requests.length === 0) {
      return res.status(400).json({ error: 'Requests array is required and must not be empty' });
    }

    // Use provided API key or fallback to server environment variable
    const claudeApiKey = apiKey || process.env.CLAUDE_API_KEY;
    
    if (!claudeApiKey) {
      return res.status(400).json({ 
        error: 'Claude API key is required. Please provide it in the request or set CLAUDE_API_KEY environment variable.' 
      });
    }

    // Setup Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const anthropic = new Anthropic({
      apiKey: claudeApiKey
    });

    const results = [];
    const errors = [];
    let totalTokensUsed = { input_tokens: 0, output_tokens: 0 };
    
    // Create bulk session in MongoDB
    let bulkSessionId = null;
    if (bulkSessionsCollection) {
      try {
        const sessionDoc = {
          createdAt: new Date(),
          totalRequested: requests.length,
          totalGenerated: 0,
          totalFailed: 0,
          status: 'in_progress'
        };
        const sessionResult = await bulkSessionsCollection.insertOne(sessionDoc);
        bulkSessionId = sessionResult.insertedId;
        console.log('✅ Created bulk session:', bulkSessionId);
      } catch (error) {
        console.error('Failed to create bulk session:', error);
      }
    }

    // Send progress update function
    const sendProgress = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // Process requests sequentially to avoid rate limits
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      
      // Send start notification
      sendProgress({
        type: 'progress',
        current: i + 1,
        total: requests.length,
        prompt: request.prompt
      });

      try {
        // Build the user message
        let userMessage = `User Request: ${request.prompt}`;
        
        if (request.designBrief) {
          userMessage += `\n\nDesign Brief:\n${request.designBrief}`;
        }
        
        if (request.projectName) {
          userMessage += `\n\nProject Name: ${request.projectName}`;
        }

        // Call Claude API
        const message = await anthropic.messages.create({
          model: 'claude-3-opus-20240229',
          max_tokens: 4096,
          temperature: 1,
          system: systemInstructions || `You are a React component generator. Create a complete React component with MANIFEST and Component function.

CRITICAL: Return ONLY the code without ANY markdown formatting, explanations, descriptions, or comments before the code.

Start your response IMMEDIATELY with: const MANIFEST = {

Do NOT include:
- Any introductory text like "Here is the component"
- Any explanations before the code
- Any markdown code fences
- Any descriptions

Your response must start with the exact text: const MANIFEST = {`,
          messages: [
            {
              role: 'user',
              content: userMessage
            }
          ]
        });

        // Extract the code from Claude's response
        let code = message.content[0].text;
        
        // Remove markdown code fences if present
        code = code.replace(/```(?:javascript|jsx|js)?\n?/g, '').replace(/```$/g, '').trim();
        
        // 🔥 AGGRESSIVELY CLEAN - Remove ANY text before "const MANIFEST"
        // Try multiple patterns Claude might use
        const patterns = [
          'const MANIFEST',
          'const MANIFEST =',
          'const MANIFEST=',
          'const\nMANIFEST'
        ];
        
        let cleaned = false;
        for (const pattern of patterns) {
          const index = code.indexOf(pattern);
          if (index > 0) {
            code = code.substring(index);
            cleaned = true;
            console.log(`✅ Cleaned ${index} characters before MANIFEST`);
            break;
          }
        }
        
        if (!cleaned) {
          console.warn('⚠️ Could not find MANIFEST in code, sending as-is');
        }
        
        // Extract component name from prompt (Category: X, Type: Y format)
        let componentName = `Component ${i + 1}`;
        const typeMatch = request.prompt.match(/Type:\s*([^-,]+)/i);
        if (typeMatch) {
          componentName = typeMatch[1].trim();
        }

        const result = {
          index: i,
          prompt: request.prompt,
          code,
          usage: message.usage,
          success: true,
          name: componentName
        };

        results.push(result);

        // Track token usage
        totalTokensUsed.input_tokens += message.usage.input_tokens;
        totalTokensUsed.output_tokens += message.usage.output_tokens;
        
        // 🔥 SAVE TO MONGODB IMMEDIATELY
        if (componentsCollection) {
          try {
            const componentDoc = {
              name: componentName,
              description: request.prompt,
              code: code,
              userPrompt: request.prompt,
              designBrief: request.designBrief || null,
              projectName: request.projectName || null,
              bulkSessionId: bulkSessionId,
              createdAt: new Date(),
              tokenUsage: message.usage
            };
            const saveResult = await componentsCollection.insertOne(componentDoc);
            console.log(`✅ Saved component "${componentName}" to MongoDB:`, saveResult.insertedId);
          } catch (error) {
            console.error(`Failed to save component ${i + 1} to MongoDB:`, error);
          }
        }

        // Send success notification with generated code
        sendProgress({
          type: 'success',
          index: i,
          result
        });

        // Small delay to avoid rate limits
        if (i < requests.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }

      } catch (error) {
        console.error(`Error generating component ${i}:`, error);
        const errorData = {
          index: i,
          prompt: request.prompt,
          error: error.message,
          success: false
        };
        errors.push(errorData);

        // Send error notification
        sendProgress({
          type: 'error',
          index: i,
          error: errorData
        });
      }
    }
    
    // Update bulk session in MongoDB
    if (bulkSessionsCollection && bulkSessionId) {
      try {
        await bulkSessionsCollection.updateOne(
          { _id: bulkSessionId },
          {
            $set: {
              completedAt: new Date(),
              totalGenerated: results.length,
              totalFailed: errors.length,
              status: 'completed',
              totalTokensUsed
            }
          }
        );
        console.log('✅ Updated bulk session:', bulkSessionId);
      } catch (error) {
        console.error('Failed to update bulk session:', error);
      }
    }

    // Send completion notification
    sendProgress({
      type: 'complete',
      results,
      errors,
      totalGenerated: results.length,
      totalFailed: errors.length,
      totalRequests: requests.length,
      totalTokensUsed,
      bulkSessionId: bulkSessionId ? bulkSessionId.toString() : null
    });

    res.end();

  } catch (error) {
    console.error('Bulk generation error:', error);
    res.write(`data: ${JSON.stringify({
      type: 'error',
      error: error.message || 'Failed to generate components'
    })}\n\n`);
    res.end();
  }
});

// Bulk generation endpoint
app.post('/api/claude/bulk', async (req, res) => {
  try {
    const { requests, systemInstructions, apiKey } = req.body;

    if (!requests || !Array.isArray(requests) || requests.length === 0) {
      return res.status(400).json({ error: 'Requests array is required and must not be empty' });
    }

    // Use provided API key or fallback to server environment variable
    const claudeApiKey = apiKey || process.env.CLAUDE_API_KEY;
    
    if (!claudeApiKey) {
      return res.status(400).json({ 
        error: 'Claude API key is required. Please provide it in the request or set CLAUDE_API_KEY environment variable.' 
      });
    }

    const anthropic = new Anthropic({
      apiKey: claudeApiKey
    });

    const results = [];
    const errors = [];
    let totalTokensUsed = { input_tokens: 0, output_tokens: 0 };

    // Process requests sequentially to avoid rate limits
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      
      try {
        // Build the user message
        let userMessage = `User Request: ${request.prompt}`;
        
        if (request.designBrief) {
          userMessage += `\n\nDesign Brief:\n${request.designBrief}`;
        }
        
        if (request.projectName) {
          userMessage += `\n\nProject Name: ${request.projectName}`;
        }

        // Call Claude API
        const message = await anthropic.messages.create({
          model: 'claude-3-opus-20240229',
          max_tokens: 4096,
          temperature: 1,
          system: systemInstructions || `You are a React component generator. Create a complete React component with MANIFEST and Component function.

MANIFEST structure:
- type: Component category (e.g., "Layout.HeroSection", "Navigation.Menu")
- description: Brief component description
- editorElement.data: Configuration properties with dataType, displayName, defaultValue, group

Component function:
- Accepts { config = {} } parameter
- Uses config values for customization
- Returns JSX with inline styles
- Should be responsive and modern

Requirements:
- Use modern React patterns
- Include proper TypeScript-style prop destructuring
- Use inline styles (no external CSS)
- Make components visually appealing
- Include hover effects and transitions
- Ensure accessibility
- Use semantic HTML elements

IMPORTANT: Return ONLY the code without any markdown formatting, explanations, or code fences. Start directly with 'const MANIFEST = ...'`,
          messages: [
            {
              role: 'user',
              content: userMessage
            }
          ]
        });

        // Extract the code from Claude's response
        let code = message.content[0].text;
        
        // Remove markdown code fences if present
        code = code.replace(/```(?:javascript|jsx|js)?\n?/g, '').replace(/```$/g, '').trim();

        results.push({
          index: i,
          prompt: request.prompt,
          code,
          usage: message.usage,
          success: true
        });

        // Track token usage
        totalTokensUsed.input_tokens += message.usage.input_tokens;
        totalTokensUsed.output_tokens += message.usage.output_tokens;

        // Small delay to avoid rate limits (adjust as needed)
        if (i < requests.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

      } catch (error) {
        console.error(`Error generating component ${i}:`, error);
        errors.push({
          index: i,
          prompt: request.prompt,
          error: error.message,
          success: false
        });
      }
    }

    res.json({ 
      results,
      errors,
      totalGenerated: results.length,
      totalFailed: errors.length,
      totalRequests: requests.length,
      totalTokensUsed
    });

  } catch (error) {
    console.error('Bulk generation error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate components',
      details: error.response?.data || null
    });
  }
});

// Start server
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Claude API server running on http://localhost:${PORT}`);
    console.log(`📝 Endpoints:`);
    console.log(`   - POST http://localhost:${PORT}/api/claude (Single generation)`);
    console.log(`   - POST http://localhost:${PORT}/api/claude/bulk (Bulk generation)`);
    console.log(`   - GET  http://localhost:${PORT}/api/health (Health check)`);
    
    if (process.env.CLAUDE_API_KEY) {
      console.log(`✅ Using server-side Claude API key`);
    } else {
      console.log(`⚠️  No server-side Claude API key found. Clients must provide their own.`);
    }
    
    if (db) {
      console.log(`✅ MongoDB connected - components will be saved permanently`);
    } else {
      console.log(`⚠️  MongoDB not connected - components will only exist in memory`);
    }
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

