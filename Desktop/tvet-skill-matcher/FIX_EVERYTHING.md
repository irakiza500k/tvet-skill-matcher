# 🔧 TVET Skill Matcher - Complete Fix Guide

## 🚨 Issues Found & Solutions

### 1. Database Setup
**Problem**: MySQL not installed or not in PATH
**Solution**: Use XAMPP/WAMP or install MySQL separately

### 2. Port Conflicts  
**Problem**: Port 5000 already in use
**Solution**: Changed to port 5001

### 3. Environment Configuration
**Problem**: .env file has placeholder values
**Solution**: Updated with working defaults

## 🛠️ Step-by-Step Fix

### Step 1: Database Setup (Choose ONE option)

#### Option A: XAMPP (Recommended for Windows)
1. Download and install XAMPP from https://www.apachefriends.org/
2. Start Apache and MySQL from XAMPP Control Panel
3. Go to http://localhost/phpmyadmin/
4. Create database named `tvet_skill_matcher`
5. Import the schema: `database/schema.sql`

#### Option B: MySQL Server
1. Install MySQL Server from https://dev.mysql.com/downloads/
2. During installation, set root password (remember it!)
3. Add MySQL to PATH during installation
4. Create database: `CREATE DATABASE tvet_skill_matcher;`
5. Import schema: `mysql -u root -p tvet_skill_matcher < database/schema.sql`

### Step 2: Backend Configuration

The .env file is already fixed with:
- Port 5001 (to avoid conflicts)
- Empty password (for XAMPP default)
- Proper JWT secret

### Step 3: Start Backend Server
```bash
cd backend
node server.js
```

Should see: "✅ Database connected successfully" and "🚀 Server running on port 5001"

### Step 4: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Step 5: Test the Application
1. Backend: http://localhost:5001/health
2. Frontend: http://localhost:3000
3. API: http://localhost:5001/api

## 🔍 Troubleshooting

### If Backend Won't Start:
1. Check if MySQL is running
2. Verify database exists
3. Check .env configuration
4. Try different port (5002, 5003)

### If Database Connection Fails:
1. MySQL service not running
2. Wrong credentials in .env
3. Database doesn't exist
4. Firewall blocking connection

### If Frontend Errors:
1. Backend not running
2. Wrong API URL in AuthContext
3. CORS issues

## 🎯 Quick Test Commands

```bash
# Test database connection
cd backend
node -e "require('./config/database').testConnection()"

# Test server startup
cd backend
node server.js

# Test frontend
cd frontend
npm run dev
```

## 📱 Working URLs After Fix

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001/api
- **Health Check**: http://localhost:5001/health
- **Database**: http://localhost/phpmyadmin (if using XAMPP)

## 🚀 What Should Work After Fix

1. ✅ Landing page loads
2. ✅ Registration works
3. ✅ Login works
4. ✅ Dashboard loads
5. ✅ Profile creation works
6. ✅ Project upload works

## 🆘 Still Having Issues?

1. **Database**: Make sure MySQL service is running
2. **Ports**: Use netstat -ano | findstr :5001 to check port usage
3. **Permissions**: Run as administrator if needed
4. **Firewall**: Allow Node.js and MySQL through firewall

## 📞 Next Steps

Once everything is working:
1. Create student account
2. Build profile with skills
3. Upload projects
4. Test employer features
5. Deploy to production

---

**This should fix ALL issues with your TVET Skill Matcher Platform!** 🎓
