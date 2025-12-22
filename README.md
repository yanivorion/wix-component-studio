# Wix Component Studio 🎨

A powerful visual playground for creating, editing, and testing React components with AI-powered generation via Claude API.

## ✨ Features

### Component Development
- 🎨 **Visual Canvas** - Real-time component preview with responsive scaling
- 📱 **Responsive Design** - Test components at any screen size (390px - 1920px+)
- 🔧 **Live Editing** - Edit component code and see changes instantly
- 📑 **Multi-tab Interface** - Work on multiple components simultaneously
- 🎯 **Section Mode** - Break components into manageable sections
- ⚡ **Hot Reload** - Babel transpilation in the browser

### AI-Powered Generation 🤖
- 🚀 **Claude API Integration** - Generate components with AI
- 📝 **Single Generation** - Create one component at a time
- 📦 **Bulk Generation** - Generate 10, 50, 100+ components at once
- 🎯 **Smart Prompts** - Natural language component descriptions
- 📊 **Token Tracking** - Monitor usage and costs
- 🔄 **Auto-loading** - Batch load generated components as tabs

### Design Tools
- 🎨 **Theme Switcher** - Light/Dark mode support
- 📏 **Grid & Rulers** - Precision alignment tools
- 🔍 **Zoom Controls** - 50% - 200% zoom levels
- 🖼️ **Screenshot Capture** - Export component screenshots
- 📐 **Custom Sizing** - Precise width control with slider
- 🎭 **Font Selector** - Multiple typography options

### Workflow Features
- 💾 **Auto-save** - Never lose your work
- ⏮️ **Undo/Redo** - Full history support
- 📚 **Component Library** - Browse built-in components
- 💼 **Sessions** - Save and load work sessions
- 📥 **Import/Export** - Save components as JSON files
- 🎪 **Preview Mode** - Distraction-free component viewing

## 🚀 Quick Start

### Option 1: With Claude API (Recommended)

```bash
# Quick start script (sets up everything)
chmod +x start-with-api.sh
./start-with-api.sh
```

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up Claude API (optional, for AI generation)
cd api
npm install
# Create api/.env and add your CLAUDE_API_KEY
npm start &
cd ..

# 3. Start the app
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000)

## 🤖 Claude API Setup

For AI-powered component generation, you'll need to set up the API server.

### Quick Setup

1. **Get Claude API Key**
   - Visit: https://console.anthropic.com/
   - Create an account and get your API key

2. **Configure API Server**
   ```bash
   cd api
   cp env.example .env
   # Edit .env and add: CLAUDE_API_KEY=sk-ant-...
   npm install
   npm start
   ```

3. **Test Integration**
   - Start the React app
   - Click "+ Add New" button
   - Try single or bulk generation mode
   - Enter prompts and generate!

### Detailed Documentation
- **Setup Guide**: [`CLAUDE_API_SETUP.md`](./CLAUDE_API_SETUP.md)
- **API Docs**: [`api/README.md`](./api/README.md)
- **Implementation**: [`IMPLEMENTATION_SUMMARY.md`](./IMPLEMENTATION_SUMMARY.md)

## 📱 Usage

### Creating Components

#### Method 1: Manual Code
1. Click **"+ Add New"** button
2. Paste your React component code
3. Click **"Load Component"**
4. Customize via Properties panel

#### Method 2: AI Generation (Single)
1. Click **"+ Add New"** button
2. Select **"Single"** mode
3. Enter prompt: "Create a modern hero section"
4. Add design brief (optional)
5. Click **"Generate with Claude"**
6. Review code, then **"Load Component"**

#### Method 3: AI Generation (Bulk)
1. Click **"+ Add New"** button
2. Select **"Bulk"** mode
3. Enter prompts (one per line):
   ```
   Create a navigation bar
   Create a hero section
   Create a features grid
   Create a pricing table
   Create a footer
   ```
4. Click **"Generate 5 Components"**
5. Wait for progress: "Generating 2/5..."
6. Choose to load all as tabs

### Editing Components

- **Properties Panel** (right) - Adjust component config
- **Section Mode** - Break into editable sections
- **Multi-tab** - Switch between components
- **Responsive Mode** - Test different screen sizes
- **Fixed Section** - Set consistent heights

### Viewing Components

- **Canvas** - Main editing view with controls
- **Preview Mode** - Clean view without UI
- **Zoom** - Magnify for detail work
- **Grid/Rulers** - Precision alignment
- **Screenshot** - Capture as PNG

## 🎨 Component Structure

Components follow the Wix Component Studio format:

```javascript
const MANIFEST = {
  "type": "Layout.HeroSection",
  "description": "Modern hero section with CTA",
  "editorElement": {
    "data": {
      "title": {
        "dataType": "string",
        "displayName": "Title",
        "defaultValue": "Welcome",
        "group": "Content"
      }
      // ... more properties
    }
  }
};

function Component({ config = {} }) {
  const {
    title = MANIFEST.editorElement.data.title.defaultValue
  } = config;

  return (
    <div style={{ /* inline styles */ }}>
      <h1>{title}</h1>
      {/* component content */}
    </div>
  );
}
```

### Key Requirements
- ✅ MANIFEST object with metadata
- ✅ Component function accepting `config` prop
- ✅ Inline styles (no external CSS)
- ✅ Responsive design patterns
- ✅ Proper prop destructuring
- ✅ Default values from MANIFEST

## 🗂️ Project Structure

```
wix-component-studio/
├── api/                    # Claude API server
│   ├── server.js          # Express API
│   ├── package.json       # API dependencies
│   ├── env.example        # Config template
│   └── README.md          # API documentation
├── src/
│   ├── App.js             # Main application
│   ├── ThemeSwitcher.js   # Theme context
│   ├── hooks/             # Custom hooks
│   └── utils/             # Helper functions
├── public/
│   ├── components-library.json  # Built-in components
│   └── ...
├── CLAUDE_API_SETUP.md    # AI setup guide
├── IMPLEMENTATION_SUMMARY.md # Implementation details
├── start-with-api.sh      # Quick start script
└── README.md              # This file
```

## ⚙️ Configuration

### API Server
Edit `api/.env`:
```bash
CLAUDE_API_KEY=sk-ant-...  # Your Claude API key
PORT=3001                   # Server port
```

### Claude Model
Edit `api/server.js`:
```javascript
model: 'claude-3-5-sonnet-20241022'  // Default (best quality)
// Options:
// - claude-3-5-sonnet-20241022 (best quality)
// - claude-3-haiku-20240307 (faster, cheaper)
// - claude-3-opus-20240229 (most powerful)
```

### System Instructions
Customize in UI or edit default in `src/App.js`

## 💰 Cost Estimation

**Claude 3.5 Sonnet** (Dec 2024):
- **Per component**: ~$0.02-0.03
- **10 components**: ~$0.20-0.30
- **100 components**: ~$2.00-3.00

Tips to reduce costs:
- Use Claude Haiku for faster, cheaper generation
- Write specific prompts (less back-and-forth)
- Adjust `max_tokens` in API server

## 🔧 Available Scripts

### Frontend (React App)
```bash
npm start          # Start development server (port 3000)
npm test           # Run tests
npm run build      # Build for production
npm run deploy     # Deploy to GitHub Pages
```

### Backend (API Server)
```bash
cd api
npm start          # Start API server (port 3001)
npm run dev        # Start with auto-reload (nodemon)
```

### Combined
```bash
./start-with-api.sh   # Start both frontend and API
```

## 📚 Documentation

- **[Claude API Setup Guide](./CLAUDE_API_SETUP.md)** - Complete AI integration guide
- **[API Documentation](./api/README.md)** - Backend API reference
- **[Implementation Summary](./IMPLEMENTATION_SUMMARY.md)** - Technical details
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Production deployment
- **[Changes Summary](./CHANGES_SUMMARY.md)** - Feature changelog

## 🐛 Troubleshooting

### API Server Issues

**Server won't start**
```bash
# Check if port is in use
lsof -i:3001
# Kill process
lsof -ti:3001 | xargs kill
# Or change port in api/.env
```

**"Failed to fetch" error**
- Ensure API server is running: `curl http://localhost:3001/api/health`
- Check console for CORS errors
- Verify port matches in code (default: 3001)

**"Claude API key required"**
- Add `CLAUDE_API_KEY` to `api/.env`
- Or enter key in UI
- Restart API server after adding key

### Component Issues

**Component not rendering**
- Check browser console for errors
- Verify MANIFEST structure is correct
- Ensure inline styles (no external CSS)
- Try simpler test component

**Properties not updating**
- Check config prop is being used
- Verify property names match MANIFEST
- Ensure default values are set

## 🚀 Deployment

### Frontend (React App)
```bash
# GitHub Pages
npm run build
npm run deploy

# Or deploy build/ folder to:
# - Netlify
# - Vercel
# - AWS S3
# - Any static hosting
```

### Backend (API Server)
```bash
# Heroku
cd api
heroku create wix-component-api
heroku config:set CLAUDE_API_KEY=sk-ant-...
git push heroku main

# Or deploy to:
# - Railway (git-based deploys)
# - DigitalOcean App Platform
# - AWS Elastic Beanstalk
```

### Update API URL
After deploying API, update frontend:
```javascript
// src/App.js
const API_URL = 'https://your-api.herokuapp.com';
```

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional AI models integration
- Component templates library
- Collaborative features
- Advanced customization options
- Performance optimizations
- Testing coverage

## 📄 License

MIT License - feel free to use in your projects!

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- AI powered by [Anthropic Claude](https://www.anthropic.com/)
- Fonts from [Fontshare](https://www.fontshare.com/)
- Icons and UI inspired by modern design systems

## 📞 Support

- **Issues**: Check troubleshooting section above
- **API Docs**: See `CLAUDE_API_SETUP.md`
- **Questions**: Review documentation files
- **Updates**: Check `CHANGES_SUMMARY.md` for latest features

---

**Built with ❤️ for the Wix Component Studio**

Happy component building! 🎨✨
