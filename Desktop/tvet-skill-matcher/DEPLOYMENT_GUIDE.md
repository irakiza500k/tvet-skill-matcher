# 🚀 TVET Skill Matcher Deployment Guide

## Overview
This guide will help you deploy the TVET Skill Matcher platform online using modern, free hosting services.

## Architecture
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Database**: MongoDB Atlas (Free tier)

---

## 📋 Prerequisites
- GitHub account
- Vercel account (connect with GitHub)
- Render account (connect with GitHub)
- MongoDB Atlas account (free tier)

---

## 🔧 Step 1: Prepare for Deployment

### Frontend Setup
✅ Already configured:
- `vercel.json` created
- Production build completed
- Environment variables template ready

### Backend Setup
✅ Already configured:
- `Procfile` created
- Node.js engines specified
- Environment variables ready

---

## 🌐 Step 2: Deploy Backend (Render)

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy on Render
1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `tvet-skill-matcher-api`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 3. Environment Variables
Add these in Render dashboard:
```
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_here
PORT=8080
MONGO_URI=your_mongodb_atlas_connection_string
```

---

## 🎨 Step 3: Deploy Frontend (Vercel)

### 1. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2. Environment Variables
Add in Vercel dashboard:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 🗄️ Step 4: Set Up MongoDB Atlas

### 1. Create Cluster
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create free cluster (M0)
3. Choose region closest to your users

### 2. Configure Network
1. Go to "Network Access"
2. Add IP: `0.0.0.0/0` (allows all connections)
3. Create database user with username/password

### 3. Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your user password

---

## 🔄 Step 5: Update Environment Variables

### Backend (Render)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tvet_skill_matcher?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret_key_here
NODE_ENV=production
PORT=8080
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-name.onrender.com
```

---

## ✅ Step 6: Test Deployment

1. **Backend**: Visit `https://your-backend.onrender.com/health`
2. **Frontend**: Visit `https://your-frontend.vercel.app`
3. **Test**: Register/login functionality

---

## 🔧 Troubleshooting

### Common Issues
1. **CORS Errors**: Update `FRONTEND_URL` in backend .env
2. **Database Connection**: Check MongoDB Atlas IP whitelist
3. **Build Failures**: Verify `package.json` scripts
4. **Environment Variables**: Ensure all secrets are set

### Debug Commands
```bash
# Check backend logs
curl https://your-backend.onrender.com/health

# Check frontend build
npm run build
```

---

## 📱 Next Steps

### Optional Enhancements
1. **Custom Domain**: Add custom domain on both platforms
2. **SSL**: Already included with both platforms
3. **Monitoring**: Add error tracking (Sentry)
4. **Analytics**: Add Google Analytics

### Performance Tips
1. **Images**: Optimize with WebP format
2. **Bundle**: Code splitting with React.lazy()
3. **Cache**: Implement browser caching
4. **CDN**: Vercel provides built-in CDN

---

## 💰 Cost Breakdown

### Free Tier Limits
- **Vercel**: 100GB bandwidth/month
- **Render**: 750 hours/month (free tier)
- **MongoDB Atlas**: 512MB storage

### When to Upgrade
- >10,000 monthly users
- >1GB database storage
- Need custom domains

---

## 🎉 You're Live!

Your TVET Skill Matcher is now deployed and accessible worldwide!

**Frontend URL**: `https://your-app.vercel.app`
**Backend URL**: `https://your-api.onrender.com`

For support, check the platform documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.mongodb.com/atlas)
