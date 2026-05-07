# 🎓 TVET Skill Matcher Platform - Setup Guide

A professional skill-based matching platform that connects TVET students with employers based on real abilities rather than traditional CVs.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16+)
- **MySQL Server** (v8.0+)
- **npm** or **yarn**

### 1. Database Setup

```sql
-- Create database
CREATE DATABASE tvet_skill_matcher;

-- Import schema
mysql -u root -p tvet_skill_matcher < database/schema.sql
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=tvet_skill_matcher
# JWT_SECRET=your_super_secret_jwt_key_here
# FRONTEND_URL=http://localhost:3000

# Start development server
npm run dev
```

Backend will run on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 🏗️ Project Structure

```
tvet-skill-matcher/
├── backend/                    # Node.js + Express API
│   ├── config/               # Database configuration
│   ├── controllers/           # Route handlers
│   ├── middleware/            # Auth, validation, etc.
│   ├── models/               # Database models
│   ├── routes/                # API routes
│   ├── uploads/               # File uploads
│   └── server.js             # Main server file
├── frontend/                   # React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── context/          # React context
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   └── utils/            # Utility functions
│   └── package.json
├── database/                   # Database schema
│   └── schema.sql
└── README.md
```

## 🔐 Authentication

The platform uses JWT-based authentication with role-based access control:

- **Students**: Can create profiles, upload projects, apply for jobs
- **Employers**: Can post jobs, search students, review applications

## 📊 Features Implemented

### ✅ Completed
- **Backend API** with MySQL database
- **User Authentication** (Register/Login with JWT)
- **Role-based Access Control**
- **Professional UI** with Tailwind CSS
- **Responsive Design** (Mobile-first)
- **Student Profiles** with skills and projects
- **Project Management** with file uploads
- **Database Models** for all entities

### 🚧 In Progress
- **Job Posting System**
- **Application Management**
- **Skill Matching Algorithm**
- **Real-time Chat** (WebSocket)

### 🎯 Planned Features
- **Skill Endorsements**
- **Portfolio Ratings**
- **AI Skill Suggestions**
- **Advanced Search & Filtering**
- **Email Notifications**
- **Dashboard Analytics**

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Students
- `GET /api/students/profile` - Get student profile
- `PUT /api/students/profile` - Update student profile
- `GET /api/students/projects` - Get student projects
- `POST /api/students/projects` - Create new project
- `PUT /api/students/projects/:id` - Update project
- `DELETE /api/students/projects/:id` - Delete project
- `GET /api/students/search` - Search students (for employers)

## 🎨 UI Components

### Professional Design
- **Modern Color Scheme**: Primary blue, clean grays
- **Responsive Layout**: Mobile-first approach
- **Interactive Elements**: Hover states, transitions
- **Loading States**: Spinners and skeleton screens
- **Error Handling**: User-friendly error messages

### Key Components
- **Layout**: Sidebar navigation with role-based menu
- **ProtectedRoute**: Authentication wrapper
- **AuthContext**: Global authentication state
- **Forms**: Validation and error handling
- **Cards**: Professional content containers

## 🗃 Database Schema

### Core Tables
- **users**: Basic user information and authentication
- **student_profiles**: Extended student information
- **employer_profiles**: Company information
- **projects**: Student portfolio projects
- **jobs**: Job postings with skill requirements
- **applications**: Job applications with status tracking
- **skill_endorsements**: Student skill endorsements
- **project_ratings**: Project rating system
- **messages**: Real-time chat messages
- **notifications**: User notifications

## 🚀 Deployment

### Backend (Node.js)
```bash
# Install production dependencies
npm install --production

# Start production server
NODE_ENV=production npm start
```

### Frontend (React)
```bash
# Build for production
npm run build

# Deploy build/ folder to your web server
```

### Environment Variables
- **Backend**: `.env` file in backend/
- **Frontend**: `.env` file in frontend/
- **Database**: MySQL connection settings

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure authentication
- **Input Validation**: Express-validator
- **Rate Limiting**: Prevent brute force attacks
- **CORS Protection**: Cross-origin security
- **File Upload Security**: Type and size validation
- **SQL Injection Prevention**: Parameterized queries

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Development Notes

### Code Style
- **ESLint**: JavaScript/React linting
- **Prettier**: Code formatting (recommended)
- **Component Structure**: Functional components with hooks
- **Error Boundaries**: React error handling

### Git Workflow
```bash
# Feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "Add new feature"

# Push and create PR
git push origin feature/new-feature
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- **Email**: support@tvetmatcher.com
- **Documentation**: Check this README first
- **Issues**: Create GitHub issue with details

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for TVET students and employers**
