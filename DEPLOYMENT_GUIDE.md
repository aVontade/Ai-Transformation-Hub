# 🚀 AI Transformation Hub - Deployment Guide

Complete step-by-step guide to deploy your AI Transformation Hub locally and on the web.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Deployment](#local-deployment)
3. [Web Deployment (Vercel)](#web-deployment-vercel)
4. [Web Deployment (Netlify)](#web-deployment-netlify)
5. [Environment Variables](#environment-variables)
6. [Database Setup](#database-setup)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- ✅ **Git** - [Download here](https://git-scm.com/)
- ✅ **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)
- ✅ **GitHub Account** - [Sign up here](https://github.com/)

### Check Your Installation

Open terminal/command prompt and run:

```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show 9.0.0 or higher
git --version     # Should show 2.0.0 or higher
```

---

## 🏠 Local Deployment

### Step 1: Clone the Repository

```bash
# Navigate to where you want the project
cd ~/Documents

# Clone the repository
git clone https://github.com/YOUR_USERNAME/Ai-Transformation-Hub.git

# Navigate into the project
cd Ai-Transformation-Hub
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install

# This will take 2-3 minutes
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Create .env file
touch .env
```

Add the following to `.env`:

```env
# Database
DATABASE_URL="file:./dev.db"

# Z-AI API (Optional - for AI-powered reports)
ZAI_API_KEY="your_zai_api_key_here"
ZAI_BASE_URL="https://open.bigmodel.cn/api/paas/v4"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Note:** The app works without Z-AI API key (uses fallback data). Get a key from [Z-AI](https://open.bigmodel.cn/) if you want AI-powered reports.

### Step 4: Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

### Step 5: Run Development Server

```bashnpm
# Start the development server
npm run dev

# Server will start at http://localhost:3000
```

### Step 6: Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

You should see the AI Transformation Hub home page! 🎉

### Step 7: Test the Application

1. **Home Page** - Check all sections load
2. **Take Assessment** - Complete the 10-question assessment
3. **View Report** - See your AI readiness report with citations
4. **Download Report** - Test the download functionality
5. **View Reports** - Check the reports dashboard

---

## 🌐 Web Deployment (Vercel)

Vercel is the recommended platform (made by Next.js creators).

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - AI Transformation Hub"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/Ai-Transformation-Hub.git

# Push to GitHub
git push -u origin main
```

### Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

### Step 3: Import Project

1. Click "Add New..." → "Project"
2. Find your `Ai-Transformation-Hub` repository
3. Click "Import"

### Step 4: Configure Project

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./` (leave as is)

**Build Command:** `npm run build` (auto-filled)

**Output Directory:** `.next` (auto-filled)

**Install Command:** `npm install` (auto-filled)

### Step 5: Add Environment Variables

Click "Environment Variables" and add:

```
DATABASE_URL = file:./dev.db
NEXT_PUBLIC_APP_URL = https://your-app-name.vercel.app
```

**Optional (for AI features):**
```
ZAI_API_KEY = your_zai_api_key_here
ZAI_BASE_URL = https://open.bigmodel.cn/api/paas/v4
```

### Step 6: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Click "Visit" to see your live site!

### Step 7: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-30 minutes)

**Your site is now live!** 🚀

Example: `https://ai-transformation-hub.vercel.app`

---

## 🌐 Web Deployment (Netlify)

Alternative to Vercel.

### Step 1: Push to GitHub

(Same as Vercel Step 1 above)

### Step 2: Sign Up for Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Sign Up"
3. Choose "GitHub"
4. Authorize Netlify

### Step 3: Import Project

1. Click "Add new site" → "Import an existing project"
2. Choose "GitHub"
3. Select your `Ai-Transformation-Hub` repository

### Step 4: Configure Build Settings

**Build command:** `npm run build`

**Publish directory:** `.next`

**Base directory:** (leave empty)

### Step 5: Add Environment Variables

Click "Site settings" → "Environment variables" → "Add a variable"

Add:
```
DATABASE_URL = file:./dev.db
NEXT_PUBLIC_APP_URL = https://your-site-name.netlify.app
```

### Step 6: Deploy

1. Click "Deploy site"
2. Wait for build to complete
3. Click your site URL to visit

**Your site is now live!** 🚀

Example: `https://ai-transformation-hub.netlify.app`

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `file:./dev.db` |
| `NEXT_PUBLIC_APP_URL` | Your app's URL | `http://localhost:3000` |

### Optional Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `ZAI_API_KEY` | Z-AI API key for AI reports | [Z-AI Platform](https://open.bigmodel.cn/) |
| `ZAI_BASE_URL` | Z-AI API endpoint | `https://open.bigmodel.cn/api/paas/v4` |

### Local Development (.env)

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ZAI_API_KEY="your_key_here"
ZAI_BASE_URL="https://open.bigmodel.cn/api/paas/v4"
```

### Production (Vercel/Netlify)

Add the same variables in the platform's environment variables section.

**Important:** Never commit `.env` file to Git! It's already in `.gitignore`.

---

## 💾 Database Setup

### Local Development (SQLite)

The app uses SQLite by default - no setup needed!

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# View database
npx prisma studio
```

Database file location: `prisma/dev.db`

### Production (Recommended: PostgreSQL)

For production, use PostgreSQL:

#### Option 1: Vercel Postgres

1. Go to your Vercel project
2. Click "Storage" → "Create Database"
3. Choose "Postgres"
4. Copy the `DATABASE_URL`
5. Add to environment variables

#### Option 2: Supabase (Free)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string
5. Add to environment variables as `DATABASE_URL`

#### Option 3: Railway (Free)

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL
4. Copy `DATABASE_URL`
5. Add to environment variables

### Update Database Schema

After changing `DATABASE_URL`:

```bash
# Push schema to new database
npx prisma db push

# Generate client
npx prisma generate
```

---

## 🐛 Troubleshooting

### Issue: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: "Prisma Client not generated"

**Solution:**
```bash
npx prisma generate
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process using port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Database connection error

**Solution:**
```bash
# Reset database
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

### Issue: Build fails on Vercel/Netlify

**Solution:**
1. Check build logs for specific error
2. Ensure all environment variables are set
3. Try building locally first: `npm run build`
4. Check Node.js version matches (18+)

### Issue: "Cannot find module '@prisma/client'"

**Solution:**
```bash
npm install @prisma/client
npx prisma generate
```

### Issue: Styles not loading

**Solution:**
```bash
# Rebuild Tailwind
npm run build
```

### Issue: API routes not working

**Solution:**
1. Check `.env` file exists
2. Restart development server
3. Clear browser cache
4. Check console for errors

---

## 📱 Mobile Testing

### Local Network Testing

1. Find your local IP:
```bash
# Mac/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

2. Access from mobile:
```
http://YOUR_IP:3000
```

Example: `http://192.168.1.100:3000`

---

## 🔄 Continuous Deployment

### Automatic Deployments

Both Vercel and Netlify support automatic deployments:

1. Push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push
```

2. Platform automatically:
   - Detects push
   - Runs build
   - Deploys new version
   - Updates live site

### Preview Deployments

- **Vercel:** Every branch gets preview URL
- **Netlify:** Pull requests get deploy previews

---

## 📊 Monitoring

### Vercel Analytics

1. Go to your project on Vercel
2. Click "Analytics" tab
3. View traffic, performance, errors

### Netlify Analytics

1. Go to your site on Netlify
2. Click "Analytics" tab
3. View visitors, bandwidth, forms

---

## 🔒 Security Checklist

Before going live:

- [ ] Environment variables set correctly
- [ ] `.env` file not committed to Git
- [ ] Database secured (not using SQLite in production)
- [ ] HTTPS enabled (automatic on Vercel/Netlify)
- [ ] API keys kept secret
- [ ] CORS configured if needed
- [ ] Rate limiting considered for APIs

---

## 📈 Performance Optimization

### Image Optimization

Images are automatically optimized by Next.js.

### Caching

Vercel/Netlify automatically cache static assets.

### Database Optimization

For production:
1. Use PostgreSQL instead of SQLite
2. Add database indexes
3. Enable connection pooling

---

## 🎯 Next Steps

After deployment:

1. **Test Everything**
   - Complete an assessment
   - Download a report
   - Check all pages load

2. **Share Your Site**
   - Share URL with team
   - Get feedback
   - Iterate

3. **Monitor Performance**
   - Check analytics
   - Monitor errors
   - Optimize as needed

4. **Custom Domain** (Optional)
   - Purchase domain
   - Configure DNS
   - Add to Vercel/Netlify

5. **SEO Optimization**
   - Add meta tags
   - Submit to Google
   - Create sitemap

---

## 📞 Support

### Resources

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Prisma Docs:** [prisma.io/docs](https://prisma.io/docs)

### Community

- **GitHub Issues:** Report bugs or request features
- **Discussions:** Ask questions, share ideas
- **Discord:** Join Next.js community

---

## ✅ Deployment Checklist

### Before Deployment

- [ ] Code tested locally
- [ ] All features working
- [ ] Environment variables documented
- [ ] Database schema finalized
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors
- [ ] Mobile responsive tested

### During Deployment

- [ ] Repository pushed to GitHub
- [ ] Platform account created (Vercel/Netlify)
- [ ] Project imported
- [ ] Environment variables added
- [ ] Build completed successfully
- [ ] Site accessible

### After Deployment

- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Database operations work
- [ ] Downloads function properly
- [ ] Mobile version works
- [ ] Performance acceptable
- [ ] Analytics configured
- [ ] Custom domain added (if applicable)

---

## 🎉 Congratulations!

Your AI Transformation Hub is now deployed and ready to help businesses assess their AI readiness!

**Local:** `http://localhost:3000`
**Production:** `https://your-site.vercel.app`

---

## 📝 Quick Reference

### Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server

# Database
npx prisma generate     # Generate Prisma client
npx prisma migrate dev  # Run migrations
npx prisma studio       # Open database GUI
npx prisma db push      # Push schema to database

# Git
git add .               # Stage changes
git commit -m "message" # Commit changes
git push                # Push to GitHub

# Deployment
vercel                  # Deploy to Vercel (if CLI installed)
netlify deploy          # Deploy to Netlify (if CLI installed)
```

### Port Options

```bash
npm run dev -- -p 3001  # Port 3001
npm run dev -- -p 3002  # Port 3002
npm run dev -- -p 3003  # Port 3003
npm run dev -- -p 3004  # Port 3004
```

---

**Need help?** Check the troubleshooting section or create an issue on GitHub!

Happy deploying! 🚀
