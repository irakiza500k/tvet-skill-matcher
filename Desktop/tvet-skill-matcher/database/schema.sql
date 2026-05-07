-- TVET Skill Matcher Platform Database Schema
-- MySQL Database Structure

-- Create database (run this separately)
-- CREATE DATABASE tvet_skill_matcher;
-- USE tvet_skill_matcher;

-- Users table - Core authentication table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'employer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Student profiles table
CREATE TABLE student_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    bio TEXT,
    skills JSON, -- Array of skills
    education VARCHAR(255),
    location VARCHAR(255),
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Employer profiles table
CREATE TABLE employer_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    company_description TEXT,
    industry VARCHAR(255),
    location VARCHAR(255),
    website VARCHAR(255),
    logo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Projects table
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255),
    technologies JSON, -- Array of technologies used
    project_url VARCHAR(255),
    github_url VARCHAR(255),
    status ENUM('draft', 'published') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE
);

-- Jobs table
CREATE TABLE jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employer_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    required_skills JSON, -- Array of required skills
    experience_level ENUM('entry', 'junior', 'mid', 'senior') DEFAULT 'entry',
    job_type ENUM('full-time', 'part-time', 'contract', 'internship') DEFAULT 'full-time',
    location VARCHAR(255),
    salary_range VARCHAR(255),
    application_deadline DATE,
    status ENUM('active', 'closed', 'draft') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employer_id) REFERENCES employer_profiles(id) ON DELETE CASCADE
);

-- Applications table
CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT NOT NULL,
    student_id INT NOT NULL,
    cover_letter TEXT,
    status ENUM('pending', 'accepted', 'rejected', 'withdrawn') DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (job_id, student_id)
);

-- Skill endorsements table
CREATE TABLE skill_endorsements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    endorser_id INT NOT NULL, -- Student who is endorsing
    endorsed_student_id INT NOT NULL, -- Student being endorsed
    skill VARCHAR(255) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (endorser_id) REFERENCES student_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (endorsed_student_id) REFERENCES student_profiles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_endorsement (endorser_id, endorsed_student_id, skill)
);

-- Project ratings table
CREATE TABLE project_ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    employer_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (employer_id) REFERENCES employer_profiles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_rating (project_id, employer_id)
);

-- Messages table for chat system
CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    job_id INT NULL, -- Optional: link message to a specific job
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
);

-- Notifications table
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('application', 'message', 'endorsement', 'rating') NOT NULL,
    related_id INT, -- ID of related entity (application, message, etc.)
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_student_profiles_user_id ON student_profiles(user_id);
CREATE INDEX idx_employer_profiles_user_id ON employer_profiles(user_id);
CREATE INDEX idx_projects_student_id ON projects(student_id);
CREATE INDEX idx_jobs_employer_id ON jobs(employer_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_student_id ON applications(student_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- Insert some sample data for testing
INSERT INTO users (name, email, password, role) VALUES
('John Student', 'john@student.com', '$2b$10$example_hash', 'student'),
('Jane Employer', 'jane@company.com', '$2b$10$example_hash', 'employer');

INSERT INTO student_profiles (user_id, bio, skills, education, location) VALUES
(1, 'Passionate web developer with experience in React and Node.js', '["JavaScript", "React", "Node.js", "MySQL", "CSS"]', 'TVET College - Software Development', 'Nairobi');

INSERT INTO employer_profiles (user_id, company_name, company_description, industry, location) VALUES
(2, 'Tech Solutions Ltd', 'Leading technology company specializing in web development solutions', 'Technology', 'Nairobi');

INSERT INTO projects (student_id, title, description, technologies, project_url) VALUES
(1, 'E-commerce Platform', 'Full-stack e-commerce platform built with React and Node.js', '["React", "Node.js", "MySQL", "Express"]', 'https://example-ecommerce.com');

INSERT INTO jobs (employer_id, title, description, required_skills, experience_level, job_type, location) VALUES
(1, 'Frontend Developer', 'Looking for a skilled frontend developer to join our team', '["React", "JavaScript", "CSS", "HTML"]', 'entry', 'full-time', 'Nairobi');
