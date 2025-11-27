# ⚡ Quick Start Guide

Get your AI Transformation Hub running in 5 minutes!

---

## 🚀 Super Fast Setup (Local)

### 1. Clone & Install (2 minutes)

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/Ai-Transformation-Hub.git
cd Ai-Transformation-Hub

# Install dependencies
npm install
```

### 2. Setup Database (1 minute)

```bash
# Generate Prisma client and setup database
npx prisma generate
npx prisma migrate dev --name init
```

### 3. Run (30 seconds)

```bash
# Start the server
npm run dev
```

### 4. Open Browser

Go to: **http://localhost:3000**

**That's it! You're running! 🎉**

---

## 🌐 Deploy to Web (5 minutes)

### Option 1: Vercel (Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign up with GitHub
   - Click "Import Project"
   - Select your repo
   - Click "Deploy"

3. **Done!** Your site is live in 2 minutes! 🚀

### Option 2: Netlify

1. **Push to GitHub** (same as above)

2. **Go to [netlify.com](https://netlify.com)**
   - Sign up with GitHub
   - Click "Add new site"
   - Select your repo
   - Click "Deploy"

3. **Done!** Your site is live! 🚀

---

## 🎯 First Steps After Setup

### 1. Take the Assessment (2 minutes)
- Click "Take Assessment"
- Answer 10 questions
- Get your AI readiness score

### 2. View Your Report (1 minute)
- See competitive analysis
- Check market opportunities
- Review recommendations

### 3. Download Report (30 seconds)
- Go to "View Reports"
- Click "Download"
- Get comprehensive .txt file

### 4. Explore Learning Paths (1 minute)
- Browse 6 learning pathways
- See 2-week implementation plans
- Track your progress

---

## 🔧 Optional: Add AI Features

Want AI-powered reports? Add Z-AI API key:

1. **Get API Key**
   - Go to [Z-AI Platform](https://open.bigmodel.cn/)
   - Sign up and get API key

2. **Add to .env**
   ```env
   ZAI_API_KEY="your_key_here"
   ZAI_BASE_URL="https://open.bigmodel.cn/api/paas/v4"
   ```

3. **Restart Server**
   ```bash
   npm run dev
   ```

**Note:** App works great without AI key (uses smart fallback data)!

---

## 📱 Test on Mobile

1. **Find your IP**
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. **Open on phone**
   ```
   http://YOUR_IP:3000
   ```
   Example: `http://192.168.1.100:3000`

---

## 🐛 Quick Fixes

### Port already in use?
```bash
npm run dev -- -p 3001
```

### Module not found?
```bash
rm -rf node_modules
npm install
```

### Database error?
```bash
npx prisma generate
npx prisma migrate dev
```

---

## 📚 What's Next?

- **Full Guide:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Features:** Check [README.md](./README.md)
- **Updates:** See [PREMIUM_UPDATES_SUMMARY.md](./PREMIUM_UPDATES_SUMMARY.md)

---

## ✅ Quick Checklist

- [ ] Cloned repository
- [ ] Installed dependencies (`npm install`)
- [ ] Setup database (`npx prisma generate`)
- [ ] Started server (`npm run dev`)
- [ ] Opened http://localhost:3000
- [ ] Took assessment
- [ ] Downloaded report
- [ ] (Optional) Deployed to Vercel/Netlify

---

## 🎉 You're Ready!

Your AI Transformation Hub is running!

**Local:** http://localhost:3000
**Production:** Deploy in 5 minutes with Vercel/Netlify

Need help? Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

---

**Happy transforming! 🚀**
