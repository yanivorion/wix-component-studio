const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
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
          system: systemInstructions || `You are a React component generator. Create a complete React component with MANIFEST and Component function.`,
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

        const result = {
          index: i,
          prompt: request.prompt,
          code,
          usage: message.usage,
          success: true
        };

        results.push(result);

        // Track token usage
        totalTokensUsed.input_tokens += message.usage.input_tokens;
        totalTokensUsed.output_tokens += message.usage.output_tokens;

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

    // Send completion notification
    sendProgress({
      type: 'complete',
      results,
      errors,
      totalGenerated: results.length,
      totalFailed: errors.length,
      totalRequests: requests.length,
      totalTokensUsed
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
});

