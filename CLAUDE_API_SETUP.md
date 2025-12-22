# Claude API Integration Guide

Complete setup guide for connecting Claude API to Wix Component Studio for generating components.

## 🎯 Overview

This integration allows you to:
- Generate single React components with Claude AI
- Bulk generate multiple components at once (batch processing)
- Use your own Claude API key or a server-side key
- Automatically load generated components into tabs

## 📦 What's Included

### Backend (API Server)
- **`api/server.js`** - Express server with Claude integration
- **`api/package.json`** - Server dependencies
- **`api/env.example`** - Environment variables template
- **`api/README.md`** - Detailed API documentation

### Frontend (React App)
- **Single Generation Mode** - Generate one component at a time
- **Bulk Generation Mode** - Generate multiple components from a list of prompts
- **Toggle UI** - Switch between single and bulk modes
- **Progress Tracking** - See generation progress for bulk operations
- **Auto-loading** - Optionally load all generated components as tabs

## 🚀 Quick Setup

### Step 1: Install API Server Dependencies

```bash
cd api
npm install
```

### Step 2: Configure Environment

Create `api/.env` file:

```bash
CLAUDE_API_KEY=sk-ant-api03-...your_key_here...
PORT=3001
```

Get your API key from: https://console.anthropic.com/

### Step 3: Start the API Server

```bash
# From the api directory
npm start

# Or for development with auto-reload
npm run dev
```

You should see:
```
🚀 Claude API server running on http://localhost:3001
📝 Endpoints:
   - POST http://localhost:3001/api/claude (Single generation)
   - POST http://localhost:3001/api/claude/bulk (Bulk generation)
   - GET  http://localhost:3001/api/health (Health check)
✅ Using server-side Claude API key
```

### Step 4: Start the React App

```bash
# From the project root
npm start
```

The app will open at `http://localhost:3000`

### Step 5: Test the Integration

1. Click the **"+ Add New"** button (top left, dark primary button)
2. In the modal, you'll see:
   - **Single/Bulk toggle** (top right of AI Generation section)
   - **Single mode**: Generate one component
   - **Bulk mode**: Generate multiple components

## 💡 Usage

### Single Generation Mode

1. Click **"+ Add New"** button
2. Ensure **"Single"** is selected
3. Fill in:
   - **Project Name**: e.g., "My Website"
   - **User Request**: e.g., "Create a modern hero section"
   - **Design Brief**: Optional design guidelines
   - **System Instructions**: How Claude should generate
   - **Claude API Key**: Your key (if not using server key)
4. Click **"Generate with Claude"**
5. Wait for generation (typically 5-10 seconds)
6. Review the code in the right panel
7. Click **"Load Component"** to render it

### Bulk Generation Mode

1. Click **"+ Add New"** button
2. Click **"Bulk"** toggle
3. Enter prompts (one per line):
   ```
   Create a navigation bar with logo and menu
   Create a hero section with CTA button
   Create a feature grid with 3 columns
   Create a testimonial card with avatar
   Create a pricing table with 3 tiers
   ```
4. Fill in:
   - **Design Brief**: Shared guidelines for all components
   - **Claude API Key**: Your key (if not using server key)
5. Click **"Generate X Components"**
6. Wait for bulk generation (progress shown)
7. When complete, you'll be asked: "Load all X generated components as tabs?"
   - **Yes**: All components load as separate tabs
   - **No**: Results are saved, you can load them manually later

## 🔑 API Key Options

### Option 1: Server-Side Key (Recommended)
- Set `CLAUDE_API_KEY` in `api/.env`
- All users share this key
- Leave the API key field empty in the UI
- Best for team/production use

### Option 2: Client-Side Key
- Don't set `CLAUDE_API_KEY` in `api/.env`
- Each user enters their own key in the UI
- Key is stored in browser memory (not persisted)
- Best for personal/development use

### Option 3: Hybrid
- Set a default key in `api/.env`
- Users can override by entering their own key
- Flexible for mixed use cases

## ⚙️ Configuration

### Change Server Port

Edit `api/.env`:
```bash
PORT=3002
```

And update frontend API calls in `src/App.js`:
```javascript
const response = await fetch('http://localhost:3002/api/claude', {
  // ...
});
```

### Adjust Generation Settings

Edit `api/server.js`:

```javascript
const message = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022', // Change model
  max_tokens: 8000, // Adjust max length
  temperature: 1, // Adjust creativity (0-1)
  // ...
});
```

**Available Models:**
- `claude-3-5-sonnet-20241022` - Best quality (default)
- `claude-3-haiku-20240307` - Faster, cheaper
- `claude-3-opus-20240229` - Most powerful

### Adjust Bulk Generation Delay

Edit `api/server.js` (line ~200):
```javascript
// Delay between requests (avoid rate limits)
await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second
```

Increase for safety, decrease for speed (if your rate limits allow).

## 📊 Cost Estimation

Based on Claude 3.5 Sonnet pricing (December 2024):
- Input: $3 per million tokens
- Output: $15 per million tokens

**Typical component generation:**
- Input: ~500-1000 tokens ($0.0015-0.003)
- Output: ~1000-2000 tokens ($0.015-0.030)
- **Total per component: ~$0.02-0.03**

**Bulk generation (100 components):**
- Approximate cost: **$2-3**

Always check current pricing at: https://www.anthropic.com/pricing

## 🔒 Security Best Practices

1. **Never commit `.env` files**
   - Add to `.gitignore`
   - Use `.env.example` as template

2. **Rotate API keys regularly**
   - Especially if exposed publicly

3. **Monitor usage**
   - Check Anthropic dashboard for usage
   - Set up billing alerts

4. **Add rate limiting** (production)
   - Prevent abuse
   - Protect your API key

5. **Add authentication** (production)
   - Require user login
   - Implement API key validation

## 🐛 Troubleshooting

### "Failed to fetch" error
**Problem**: Frontend can't reach API server  
**Solution**: 
- Ensure API server is running (`npm start` in `api/` directory)
- Check API server is on port 3001
- Verify no CORS issues in browser console

### "Claude API key is required" error
**Problem**: No API key provided  
**Solution**:
- Set `CLAUDE_API_KEY` in `api/.env`, OR
- Enter your API key in the UI

### "Rate limit exceeded" error
**Problem**: Too many requests to Claude API  
**Solution**:
- Increase delay between bulk requests
- Wait a few minutes and try again
- Upgrade your Claude API tier

### Components not rendering
**Problem**: Generated code has errors  
**Solution**:
- Check browser console for errors
- Review system instructions
- Try generating again with more specific prompts

### Server won't start (port in use)
**Problem**: Port 3001 already taken  
**Solution**:
```bash
# Find and kill process
lsof -ti:3001 | xargs kill

# Or change port in api/.env
PORT=3002
```

## 🧪 Testing

### Test API Server

```bash
# Health check
curl http://localhost:3001/api/health

# Should return:
# {"status":"ok","timestamp":"..."}
```

### Test Single Generation

```bash
curl -X POST http://localhost:3001/api/claude \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a simple button component",
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

## 📱 Production Deployment

### Deploy API Server

**Recommended platforms:**
- **Heroku** - Easy setup, auto-scaling
- **Railway** - Modern, Git-based deploys
- **DigitalOcean App Platform** - Simple, predictable pricing
- **AWS Elastic Beanstalk** - Full control

**Example (Heroku):**
```bash
cd api
heroku create wix-component-api
heroku config:set CLAUDE_API_KEY=sk-ant-...
git push heroku main
```

### Update Frontend API URL

In production, update all `fetch` calls to use your deployed API URL:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const response = await fetch(`${API_URL}/api/claude`, {
  // ...
});
```

Add to `.env`:
```bash
REACT_APP_API_URL=https://your-api.herokuapp.com
```

## 📚 Additional Resources

- **Anthropic API Docs**: https://docs.anthropic.com/
- **Claude API Reference**: https://docs.anthropic.com/claude/reference
- **Rate Limits**: https://docs.anthropic.com/claude/reference/rate-limits
- **Best Practices**: https://docs.anthropic.com/claude/docs/intro-to-claude

## 🆘 Support

### Common Issues

1. **Generation is slow**
   - Claude 3.5 Sonnet: 5-15 seconds
   - Bulk mode: Linear (5s × number of components)
   - Consider using Claude Haiku for faster results

2. **Generated code is not rendering**
   - Check browser console for errors
   - Verify MANIFEST structure is correct
   - Try adjusting system instructions

3. **Cost is too high**
   - Use shorter prompts
   - Switch to Claude Haiku model
   - Reduce max_tokens parameter

### Getting Help

- Check `api/README.md` for API-specific docs
- Review browser console for frontend errors
- Check API server logs for backend errors
- Test with curl to isolate issues

## ✅ Checklist

- [ ] Installed API server dependencies (`cd api && npm install`)
- [ ] Created `api/.env` with `CLAUDE_API_KEY`
- [ ] Started API server (`npm start` in `api/`)
- [ ] Started React app (`npm start` in root)
- [ ] Tested single generation
- [ ] Tested bulk generation
- [ ] Reviewed generated components
- [ ] Understood cost implications
- [ ] Set up monitoring/alerts (production)
- [ ] Configured rate limiting (production)

## 🎉 You're Ready!

You now have a fully functional Claude API integration that can:
- Generate high-quality React components
- Process bulk requests efficiently
- Scale from personal to production use
- Track usage and costs

Happy generating! 🚀


