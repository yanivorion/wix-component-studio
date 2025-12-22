/**
 * Client-side Claude API integration
 * This allows direct API calls from the browser when no backend is available
 */

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-3-opus-20240229';
const MAX_TOKENS = 4096;

/**
 * Call Claude API directly from the browser
 * Note: This requires CORS support or a proxy
 */
export const callClaudeAPI = async ({ prompt, systemInstructions, apiKey }) => {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: MAX_TOKENS,
        system: systemInstructions,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the code from the response
    const content = data.content?.[0]?.text || '';
    
    return {
      code: content,
      usage: data.usage
    };
  } catch (error) {
    // Check if it's a CORS error
    if (error.message.includes('CORS') || error.name === 'TypeError') {
      throw new Error('Cannot call Claude API directly from browser due to CORS restrictions. Please run the API server locally (npm start in /api folder) or deploy the backend API.');
    }
    throw error;
  }
};

/**
 * Generate a single component with client-side API
 */
export const generateSingleComponent = async ({ prompt, designBrief, projectName, systemInstructions, apiKey }) => {
  const fullPrompt = `
Project: ${projectName || 'Component Studio'}
Design Brief: ${designBrief || 'Create a high-quality React component'}

User Request: ${prompt}

Please generate the complete React component code with MANIFEST and Component function.
`;

  const result = await callClaudeAPI({
    prompt: fullPrompt,
    systemInstructions,
    apiKey
  });

  return {
    success: true,
    code: result.code,
    prompt: prompt
  };
};

/**
 * Generate multiple components with client-side API
 * Processes them sequentially with progress updates
 */
export const generateBulkComponents = async ({ 
  requests, 
  designBrief, 
  projectName, 
  systemInstructions, 
  apiKey,
  onProgress 
}) => {
  const results = [];
  let generatedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    
    // Send progress update
    if (onProgress) {
      onProgress({
        current: i + 1,
        total: requests.length,
        status: 'generating'
      });
    }

    try {
      const result = await generateSingleComponent({
        prompt: request.prompt,
        designBrief: request.designBrief || designBrief,
        projectName: request.projectName || projectName,
        systemInstructions,
        apiKey
      });

      results.push({
        index: i,
        prompt: request.prompt,
        code: result.code,
        success: true
      });
      
      generatedCount++;
      
      // Send result update
      if (onProgress) {
        onProgress({
          current: i + 1,
          total: requests.length,
          status: 'completed',
          result: results[results.length - 1]
        });
      }
      
      // Small delay to avoid rate limiting
      if (i < requests.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Error generating component ${i + 1}:`, error);
      
      results.push({
        index: i,
        prompt: request.prompt,
        error: error.message,
        success: false
      });
      
      failedCount++;
      
      // Send error update
      if (onProgress) {
        onProgress({
          current: i + 1,
          total: requests.length,
          status: 'error',
          error: error.message
        });
      }
    }
  }

  return {
    results,
    totalGenerated: generatedCount,
    totalFailed: failedCount,
    totalRequests: requests.length
  };
};

export default {
  callClaudeAPI,
  generateSingleComponent,
  generateBulkComponents
};

