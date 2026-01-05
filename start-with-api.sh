#!/bin/bash

echo "🚀 Starting Wix Component Studio with Claude API..."
echo ""

# Check if api/.env exists
if [ ! -f api/.env ]; then
    echo "⚠️  Warning: api/.env not found!"
    echo "📝 Creating from template..."
    cp api/env.example api/.env
    echo "✅ Created api/.env"
    echo ""
    echo "⚡ IMPORTANT: Edit api/.env and add your CLAUDE_API_KEY"
    echo "   Get your key from: https://console.anthropic.com/"
    echo ""
    read -p "Press Enter once you've added your API key..."
fi

# Check if api dependencies are installed
if [ ! -d api/node_modules ]; then
    echo "📦 Installing API server dependencies..."
    cd api
    npm install
    cd ..
    echo "✅ API dependencies installed"
    echo ""
fi

# Start API server in background
echo "🔧 Starting API server..."
cd api
npm start &
API_PID=$!
cd ..
echo "✅ API server started (PID: $API_PID)"
echo ""

# Wait a moment for server to start
sleep 3

# Test API server
echo "🧪 Testing API server..."
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ API server is healthy!"
else
    echo "❌ API server health check failed!"
    echo "   Make sure it's running on port 3001"
fi
echo ""

# Start React app
echo "⚛️  Starting React app..."
npm start

# Cleanup on exit
trap "echo '🛑 Shutting down...'; kill $API_PID 2>/dev/null; exit" INT TERM EXIT



