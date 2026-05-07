# 🎓 Smart TVET Skill Matcher Platform

A professional skill-based matching platform that connects TVET students with employers based on real abilities rather than traditional CVs.

## 🚀 Features

- **Skill-based Matching**: Intelligent matching algorithm connecting students to jobs based on skills
- **Dual Role System**: Separate interfaces for students and employers
- **Portfolio Management**: Students can showcase projects and skills
- **Real-time Chat**: WebSocket-based communication between employers and students
- **Professional UI**: Modern, responsive design using React and Tailwind CSS
- **Secure Authentication**: JWT-based authentication with role-based access

## 🏗️ Technology Stack

### Backend
- **Node.js** + **Express.js**
- **MySQL** Database
- **JWT** Authentication
- **Socket.io** for real-time chat
- **Multer** for file uploads
- **bcrypt** for password hashing

### Frontend
- **React.js** with modern hooks
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Socket.io-client** for real-time features

## 📁 Project Structure

```
tvet-skill-matcher/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── utils/
│   └── package.json
├── database/
│   └── schema.sql
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MySQL Server
- npm or yarn

### 1. Clone and Setup
```bash
git clone <repository-url>
cd tvet-skill-matcher
```

### 2. Database Setup
```bash
# Create database in MySQL
mysql -u root -p
CREATE DATABASE tvet_skill_matcher;

# Import schema
mysql -u root -p tvet_skill_matcher < database/schema.sql
```

### 3. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm start
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🎯 Core Features

### For Students
- Create professional profile with skills and bio
- Upload portfolio projects with images
- Browse and apply for jobs
- Track application status
- Chat with employers

### For Employers
- Post job openings with required skills
- Search and filter students by skills
- Review applications and portfolios
- Communicate with candidates
- Manage hiring workflow

### Matching Algorithm
The system uses an intelligent matching algorithm that:
- Compares student skills with job requirements
- Calculates match scores based on skill overlap
- Ranks candidates by relevance
- Provides personalized job recommendations

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control
- Input validation and sanitization
- File upload security
- CORS protection

## 🌟 Unique Features

- **Skill Endorsements**: Students can endorse each other's skills
- **Portfolio Ratings**: Employers can rate student projects
- **AI Skill Suggestions**: Recommends skills to learn based on job trends
- **Real-time Notifications**: Instant updates for applications and messages

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Accessible UI components
- Smooth animations and transitions

## 🚀 Deployment

The application is structured for easy deployment to:
- **Backend**: Heroku, AWS, DigitalOcean
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Database**: AWS RDS, Google Cloud SQL

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting pull requests.

---

**Built with ❤️ for TVET students and employers**
