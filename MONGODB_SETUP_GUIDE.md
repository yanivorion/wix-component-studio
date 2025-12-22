# 🍃 MongoDB Atlas Setup - Complete Guide

## ✅ **WHAT I DID FOR YOU**

1. ✅ **Installed MongoDB** - `npm install mongodb`
2. ✅ **Created MongoDB Client** - `src/mongoClient.js` (500+ lines)
3. ✅ **Updated App.js** - Switched from Firebase to MongoDB
4. ✅ **Ready for MongoDB Atlas** - Free cloud database

---

## 🎯 **TWO OPTIONS:**

### **Option A: MongoDB Atlas (Cloud - Recommended)** ☁️
- Free tier: 512MB storage
- No local installation needed
- Accessible from anywhere
- **Setup time: 10 minutes**

### **Option B: Local MongoDB** 💻
- Runs on your computer
- Faster for development
- Requires installation
- **Setup time: 5 minutes**

---

# 📋 **OPTION A: MongoDB Atlas (Cloud)**

## **STEP 1: Create MongoDB Atlas Account**

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** with:
   - Email
   - Or Google account (faster!)
3. **Verify email** if needed

---

## **STEP 2: Create a Cluster**

1. **Choose deployment:**
   - Select **"M0 FREE"** (512MB)
   - ✅ **FREE FOREVER**

2. **Provider & Region:**
   - Provider: **AWS** (default is fine)
   - Region: Choose **closest to you**
     - US: `us-east-1` (Virginia)
     - Europe: `eu-west-1` (Ireland)
     - Asia: `ap-southeast-1` (Singapore)

3. **Cluster Name:**
   - Name: `wix-component-studio` (or keep default)

4. **Click:** "Create Cluster"
   - ⏳ Wait 1-3 minutes (cluster is provisioning)

---

## **STEP 3: Setup Database Access**

1. **Security → Database Access** (left sidebar)
2. **Click:** "+ ADD NEW DATABASE USER"
3. **Authentication Method:** Password
4. **Username:** `wixadmin` (or your choice)
5. **Password:** Click "Autogenerate Secure Password"
   - **COPY THIS PASSWORD!** You'll need it!
   - Or create your own (remember it!)
6. **Database User Privileges:** 
   - Select **"Read and write to any database"**
7. **Click:** "Add User"

---

## **STEP 4: Setup Network Access**

1. **Security → Network Access** (left sidebar)
2. **Click:** "+ ADD IP ADDRESS"
3. **Select:** "ALLOW ACCESS FROM ANYWHERE"
   - This adds `0.0.0.0/0` (allows all IPs)
   - ⚠️ For production, restrict this!
4. **Click:** "Confirm"

---

## **STEP 5: Get Connection String**

1. **Go to:** Database (left sidebar)
2. **Click:** "Connect" button (on your cluster)
3. **Choose:** "Connect your application"
4. **Driver:** Node.js
5. **Version:** 6.9 or later
6. **Copy the connection string:**

```
mongodb+srv://wixadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

7. **Replace `<password>`** with your actual password from Step 3
8. **Add database name** at the end:

```
mongodb+srv://wixadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/wix-component-studio?retryWrites=true&w=majority
```

---

## **STEP 6: Configure Your App**

### **Create `.env` file** in project root:

**Location:** `/Users/yanivo/Documents/CURSOR/CC/wix-component-studio/.env`

**Content:**
```env
# MongoDB Atlas Configuration
REACT_APP_MONGODB_URI=mongodb+srv://wixadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/wix-component-studio?retryWrites=true&w=majority
REACT_APP_MONGODB_DATABASE=wix-component-studio
```

**Important:**
- Replace `YOUR_PASSWORD` with your actual password
- Replace `cluster0.xxxxx` with your actual cluster URL
- Keep the database name: `wix-component-studio`

---

## **STEP 7: Restart Your App**

```bash
# Stop both servers (Ctrl+C in both terminals)

# Terminal 1: React app
npm start

# Terminal 2: API server
cd api && npm start
```

**Look for in console:**
```
✅ MongoDB connected successfully
```

---

## **STEP 8: Test It!**

1. **Open browser:** `http://localhost:3000`
2. **Click** "+ Add New" button
3. **Toggle** to "Bulk" mode
4. **Upload** CSV or enter prompts
5. **Click** "Bulk Generate with Claude"
6. **Watch** real-time progress
7. **See toast:** "✓ Saved to library!"

---

## **STEP 9: Verify in MongoDB Atlas**

1. **Go to:** MongoDB Atlas dashboard
2. **Click:** "Browse Collections" (on your cluster)
3. **You should see:**
   - Database: `wix-component-studio`
   - Collections: `components`, `bulkSessions`
4. **Click into collections** to see your data!

---

# 📋 **OPTION B: Local MongoDB**

## **Install MongoDB Locally**

### **macOS (with Homebrew):**
```bash
# Install
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify it's running
mongosh
```

### **Your `.env` file:**
```env
REACT_APP_MONGODB_URI=mongodb://localhost:27017
REACT_APP_MONGODB_DATABASE=wix-component-studio
```

### **Restart app:**
```bash
npm start
cd api && npm start
```

---

# 🎨 **MONGODB DATA STRUCTURE**

## **Components Collection:**
```javascript
{
  _id: ObjectId("..."),
  name: "Cinematic Ken Burns Gallery",
  category: "Complex Slideshows & Carousels",
  componentType: "Cinematic Ken Burns Gallery",
  description: "Create a photo gallery...",
  code: "const MANIFEST = {...}; function Component...",
  manifest: {...},
  userPrompt: "Category: X, Type: Y - Request",
  designBrief: "...",
  generatedBy: "claude",
  tags: ["carousel", "animation"],
  isFavorite: false,
  usageCount: 0,
  bulkSessionId: "...",
  createdAt: ISODate("2025-12-22T00:00:00Z"),
  updatedAt: ISODate("2025-12-22T00:00:00Z")
}
```

## **Bulk Sessions Collection:**
```javascript
{
  _id: ObjectId("..."),
  totalRequested: 10,
  totalGenerated: 10,
  totalFailed: 0,
  status: "completed",
  csvFilename: "bulk-components-template.csv",
  createdAt: ISODate("2025-12-22T00:00:00Z"),
  completedAt: ISODate("2025-12-22T00:00:05Z")
}
```

---

# 🚀 **FEATURES**

### ✅ **Implemented:**
- Complete CRUD operations
- Bulk session tracking
- Auto-save during generation
- Search with regex
- Filter by category/type/favorite
- Usage statistics
- Text search across fields

### ✅ **MongoDB Advantages:**
- Flexible schema (perfect for components)
- Powerful queries ($regex, $or, $and)
- Native text search
- Aggregation pipeline
- Indexes for performance
- GridFS for large files (future)

---

# 🔐 **SECURITY NOTES**

### **Current Setup (Development):**
```env
# Allow from anywhere
Network Access: 0.0.0.0/0
User privileges: Read/Write all databases
```

### **Production Setup (Recommended):**
```env
# Restrict IP addresses
Network Access: Your server IPs only
# Create separate users per app
User privileges: Specific database only
# Enable monitoring & alerts
```

---

# 🆘 **TROUBLESHOOTING**

### **"MongoDB not configured"**
- Did you create `.env` file?
- Is it in project root?
- Did you restart servers?
- Check console for errors

### **"Authentication failed"**
- Password incorrect in connection string
- User not created in Database Access
- Check for special characters (URL encode them)

### **"Connection timed out"**
- Network Access not configured
- Not allowed from 0.0.0.0/0
- Check your internet connection

### **"Cannot connect to localhost"**
- MongoDB not installed locally
- MongoDB service not running
- Try: `brew services start mongodb-community`

### **Special Characters in Password**
If your password has special characters, URL encode them:
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `&` → `%26`

Example:
```
Password: Pass@123#
Encoded: Pass%40123%23
```

---

# 📊 **MONGODB vs FIREBASE**

| Feature | MongoDB | Firebase |
|---------|---------|----------|
| **Query Power** | ✅ Full MongoDB queries | ❌ Limited queries |
| **Text Search** | ✅ Native $regex | ❌ Need external service |
| **Aggregation** | ✅ Powerful pipeline | ❌ Basic only |
| **Schema** | ✅ Flexible NoSQL | ✅ Flexible NoSQL |
| **Free Tier** | ✅ 512MB | ✅ 50K reads/day |
| **Real-time** | ⚠️ Via Change Streams | ✅ Built-in |
| **Setup** | ⚠️ 10 min (Atlas) | ⚠️ 15 min |
| **Hosting** | ☁️ Atlas or Self-host | ☁️ Google only |

**For this project, MongoDB is better because:**
- ✅ More powerful queries
- ✅ Better search capabilities
- ✅ Familiar to most developers
- ✅ Can self-host if needed
- ✅ Full database control

---

# ✅ **QUICK CHECKLIST**

- [ ] Signed up for MongoDB Atlas
- [ ] Created free M0 cluster
- [ ] Created database user with password
- [ ] Added Network Access (0.0.0.0/0)
- [ ] Copied connection string
- [ ] Replaced `<password>` with actual password
- [ ] Added database name to connection string
- [ ] Created `.env` file in project root
- [ ] Added `REACT_APP_MONGODB_URI` to `.env`
- [ ] Added `REACT_APP_MONGODB_DATABASE` to `.env`
- [ ] Restarted React server
- [ ] Restarted API server
- [ ] Saw "✅ MongoDB connected successfully"
- [ ] Tested bulk generation
- [ ] Saw "✓ Saved to library!" toast
- [ ] Verified data in Atlas → Browse Collections

---

# 🎉 **YOU'RE READY!**

Once you complete the checklist above, you'll have:
- ✅ Cloud MongoDB database
- ✅ Auto-save during bulk generation
- ✅ Persistent component library
- ✅ Never lose data again!
- ✅ Powerful search & filtering

**Start here: Go to https://www.mongodb.com/cloud/atlas/register** 🍃🚀

