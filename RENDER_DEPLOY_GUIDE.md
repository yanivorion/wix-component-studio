# 🚀 Deploy API Server to Render.com (FREE)

## ⚠️ **Why We Need This**

Claude API doesn't support CORS (browser direct calls). We need a backend server.

**Solution:** Deploy the API server to Render.com (free tier)

---

## 📋 **Step-by-Step Guide**

### **Step 1: Create Account**
1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with GitHub

### **Step 2: Create New Web Service**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `yanivorion/wix-component-studio`
3. Configure:
   - **Name:** `wix-component-api`
   - **Root Directory:** `api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`

### **Step 3: Add Environment Variable**
1. Scroll to **"Environment Variables"**
2. Click **"Add Environment Variable"**
3. Set:
   - **Key:** `CLAUDE_API_KEY`
   - **Value:** `[YOUR_CLAUDE_API_KEY_HERE]`

### **Step 4: Deploy**
1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://wix-component-api.onrender.com`

### **Step 5: Update Frontend**
1. Copy your Render URL
2. Create `.env` file in project root:
   ```
   REACT_APP_API_URL=https://wix-component-api.onrender.com/api
   ```
3. Redeploy frontend

---

## ✅ **What You'll Get**

- ✅ Free API server (always online)
- ✅ Works with GitHub Pages
- ✅ No CORS issues
- ✅ Bulk generation works!

---

## 🎯 **Alternative: Use Locally**

If you don't want to deploy:

1. Run API server locally:
   ```bash
   cd api
   npm install
   node server.js
   ```

2. Use ngrok to expose it:
   ```bash
   ngrok http 3001
   ```

3. Update `.env` with ngrok URL

---

## ⚡ **Quick Deploy Commands**

```bash
# 1. Make sure api/package.json exists
cd api
npm install

# 2. Push to GitHub (Render will auto-deploy)
git add .
git commit -m "Add API server for deployment"
git push

# 3. Then follow Render.com steps above
```

---

## 🔧 **Need Help?**

Just say "deploy to render" and I'll guide you through each step!

