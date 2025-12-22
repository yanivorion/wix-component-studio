# Claude API Backend for Wix Component Studio

A Node.js/Express server that provides Claude API integration for generating React components.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd api
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `api` directory:

```bash
CLAUDE_API_KEY=your_claude_api_key_here
PORT=3001
```

Get your Claude API key from: https://console.anthropic.com/

### 3. Start the Server

```bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
```

The server will start on `http://localhost:3001`

## 📡 API Endpoints

### Health Check
```bash
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-12-21T14:00:00.000Z"
}
```

### Single Component Generation
```bash
POST /api/claude
```

**Request Body:**
```json
{
  "prompt": "Create a modern hero section with title, subtitle, and CTA button",
  "designBrief": "Clean, minimalist design with blue accents",
  "projectName": "My Website",
  "systemInstructions": "Optional custom system prompt",
  "apiKey": "Optional: sk-ant-... (if not using server key)"
}
```

**Response:**
```json
{
  "code": "const MANIFEST = {...}\n\nfunction Component({ config }) {...}",
  "usage": {
    "input_tokens": 450,
    "output_tokens": 1200
  },
  "model": "claude-3-5-sonnet-20241022"
}
```

### Bulk Component Generation
```bash
POST /api/claude/bulk
```

**Request Body:**
```json
{
  "requests": [
    {
      "prompt": "Create a navbar with logo and menu items",
      "designBrief": "Modern, responsive design",
      "projectName": "My Website"
    },
    {
      "prompt": "Create a footer with social links",
      "designBrief": "Dark theme",
      "projectName": "My Website"
    }
  ],
  "systemInstructions": "Optional custom system prompt",
  "apiKey": "Optional: sk-ant-... (if not using server key)"
}
```

**Response:**
```json
{
  "results": [
    {
      "index": 0,
      "prompt": "Create a navbar with logo and menu items",
      "code": "const MANIFEST = {...}",
      "usage": { "input_tokens": 450, "output_tokens": 1200 },
      "success": true
    },
    {
      "index": 1,
      "prompt": "Create a footer with social links",
      "code": "const MANIFEST = {...}",
      "usage": { "input_tokens": 420, "output_tokens": 1100 },
      "success": true
    }
  ],
  "errors": [],
  "totalGenerated": 2,
  "totalFailed": 0,
  "totalRequests": 2,
  "totalTokensUsed": {
    "input_tokens": 870,
    "output_tokens": 2300
  }
}
```

## 🔑 API Key Options

### Option 1: Server-Side Key (Recommended for production)
Set `CLAUDE_API_KEY` in the `.env` file. All requests will use this key.

### Option 2: Client-Side Key (For personal use)
Don't set `CLAUDE_API_KEY` in `.env`. Users provide their own key in each request via the `apiKey` field.

### Option 3: Hybrid
Set a server key, but allow clients to override it by providing their own `apiKey` in the request.

## ⚡ Rate Limiting

Claude API has rate limits. The bulk generation endpoint includes:
- Sequential processing (one request at a time)
- 1-second delay between requests
- Error handling for individual failures

Adjust the delay in `server.js` if needed:
```javascript
await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
```

## 🔧 Configuration

### Change Port
Edit `.env`:
```bash
PORT=3002
```

### Adjust Max Tokens
Edit `server.js` and modify the `max_tokens` parameter:
```javascript
const message = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 8000, // Increase or decrease as needed
  // ...
});
```

### Change Model
You can switch to different Claude models:
- `claude-3-5-sonnet-20241022` (Default - Best quality)
- `claude-3-haiku-20240307` (Faster, cheaper)
- `claude-3-opus-20240229` (Most powerful, slower)

## 🧪 Testing

### Test Health Endpoint
```bash
curl http://localhost:3001/api/health
```

### Test Single Generation
```bash
curl -X POST http://localhost:3001/api/claude \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a button component with hover effect",
    "apiKey": "sk-ant-..."
  }'
```

### Test Bulk Generation
```bash
curl -X POST http://localhost:3001/api/claude/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "requests": [
      {"prompt": "Create a card component"},
      {"prompt": "Create a modal component"}
    ],
    "apiKey": "sk-ant-..."
  }'
```

## 🚨 Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request (missing parameters)
- `500` - Server Error (Claude API error)

Error responses include:
```json
{
  "error": "Error message",
  "details": {} // Additional error details if available
}
```

## 📊 Logging

The server logs:
- All API requests
- Claude API errors
- Token usage for each request
- Startup configuration

## 🔒 Security Notes

1. **Never commit `.env` file** - Add it to `.gitignore`
2. **Use environment variables** for sensitive data
3. **Consider adding authentication** if exposing publicly
4. **Monitor API usage** to avoid unexpected costs
5. **Implement rate limiting** for production use

## 📚 Integration with Frontend

Update your React app's API calls to point to this server:

```javascript
const response = await fetch('http://localhost:3001/api/claude', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: userPrompt,
    designBrief: designBrief,
    projectName: projectName,
    apiKey: claudeApiKey // Optional if using server key
  })
});
```

For production, replace `http://localhost:3001` with your deployed API URL.

## 🐛 Troubleshooting

### Port already in use
```bash
# Change port in .env or kill the process
lsof -ti:3001 | xargs kill
```

### Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Claude API errors
- Check API key is valid
- Verify you have credits in your Anthropic account
- Check rate limits haven't been exceeded

## 📦 Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
heroku config:set CLAUDE_API_KEY=your_key_here
git push heroku main
```

### Deploy to Railway
1. Connect your GitHub repo
2. Add `CLAUDE_API_KEY` environment variable
3. Deploy automatically on push

### Deploy to DigitalOcean/AWS
1. Set up Node.js environment
2. Install dependencies
3. Set environment variables
4. Use PM2 or similar for process management
5. Set up reverse proxy (nginx)

## 📝 License

MIT

