// TVET Skill Matcher - Student Dashboard JavaScript

// ===== GLOBAL VARIABLES =====
let studentData = {
    profile: null,
    projects: [],
    applications: [],
    jobs: []
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeStudentDashboard();
    setupEventListeners();
    loadStudentData();
});

function initializeStudentDashboard() {
    // Check if user is logged in and is a student
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (!currentUser || currentUser.role !== 'student') {
        showToast('Please login as a student to access this page', 'error');
        window.location.href = 'index.html';
        return;
    }
    
    // Load student data
    loadStudentProfile();
    loadStudentProjects();
    loadStudentApplications();
    loadRecommendedJobs();
    updateStats();
}

function setupEventListeners() {
    // Profile form
    document.getElementById('profileForm')?.addEventListener('submit', handleProfileUpdate);
    
    // Project form
    document.getElementById('projectForm')?.addEventListener('submit', handleProjectSubmit);
    
    // Mobile menu
    document.addEventListener('click', function(e) {
        if (e.target.closest('.hamburger')) {
            toggleMobileMenu();
        }
    });
}

// ===== DATA LOADING FUNCTIONS =====
function loadStudentData() {
    // Load all student data from localStorage or API
    const savedData = localStorage.getItem('studentData');
    if (savedData) {
        studentData = JSON.parse(savedData);
    } else {
        // Initialize with mock data
        initializeMockData();
    }
}

function loadStudentProfile() {
    const profile = studentData.profile || {
        name: 'John Student',
        bio: 'Passionate TVET student with skills in web development and design.',
        education: 'Technical Institute - Web Development Program',
        location: 'Nairobi, Kenya',
        skills: ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'],
        avatar: null
    };
    
    studentData.profile = profile;
    displayProfileInfo();
}

function loadStudentProjects() {
    const projects = studentData.projects || [
        {
            id: 1,
            title: 'E-commerce Website',
            description: 'Built a full-stack e-commerce platform with React and Node.js',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
            image: 'https://via.placeholder.com/300x200/2563eb/ffffff?text=E-commerce',
            url: 'https://github.com/johnstudent/ecommerce',
            status: 'published',
            createdAt: '2024-01-15'
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'Mobile-responsive task management application with real-time updates',
            technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
            image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Task+App',
            url: 'https://github.com/johnstudent/task-app',
            status: 'published',
            createdAt: '2024-01-10'
        }
    ];
    
    studentData.projects = projects;
    displayRecentProjects();
}

function loadStudentApplications() {
    const applications = studentData.applications || [
        {
            id: 1,
            jobId: 1,
            jobTitle: 'Junior Frontend Developer',
            company: 'TechCorp Solutions',
            status: 'pending',
            appliedAt: '2024-01-20',
            coverLetter: 'I am excited to apply for this position...'
        },
        {
            id: 2,
            jobId: 2,
            jobTitle: 'Web Developer Intern',
            company: 'StartupHub',
            status: 'accepted',
            appliedAt: '2024-01-15',
            coverLetter: 'My skills align perfectly with this role...'
        }
    ];
    
    studentData.applications = applications;
}

function loadRecommendedJobs() {
    const jobs = studentData.jobs || [
        {
            id: 1,
            title: 'Junior Frontend Developer',
            company: 'TechCorp Solutions',
            location: 'Nairobi, Kenya',
            type: 'full-time',
            experience: 'entry',
            requiredSkills: ['JavaScript', 'React', 'CSS', 'HTML'],
            description: 'Looking for a passionate frontend developer to join our team...',
            salary: 'KES 50,000 - 80,000',
            postedAt: '2024-01-18',
            matchScore: 85
        },
        {
            id: 2,
            title: 'Web Developer Intern',
            company: 'StartupHub',
            location: 'Remote',
            type: 'internship',
            experience: 'entry',
            requiredSkills: ['JavaScript', 'React', 'Node.js'],
            description: 'Great opportunity for aspiring web developers...',
            salary: 'KES 30,000 - 40,000',
            postedAt: '2024-01-16',
            matchScore: 92
        },
        {
            id: 3,
            title: 'Full Stack Developer',
            company: 'Digital Agency',
            location: 'Mombasa, Kenya',
            type: 'contract',
            experience: 'junior',
            requiredSkills: ['JavaScript', 'Node.js', 'MongoDB', 'React'],
            description: 'Looking for talented full stack developers...',
            salary: 'KES 70,000 - 100,000',
            postedAt: '2024-01-14',
            matchScore: 78
        }
    ];
    
    studentData.jobs = jobs;
    displayRecommendedJobs();
}

// ===== DISPLAY FUNCTIONS =====
function displayProfileInfo() {
    // Update profile information in the UI
    const profile = studentData.profile;
    
    // Update welcome message
    const welcomeElement = document.querySelector('.dashboard-header h1');
    if (welcomeElement && profile) {
        welcomeElement.textContent = `Welcome back, ${profile.name}!`;
    }
}

function displayRecentProjects() {
    const container = document.getElementById('recentProjects');
    if (!container) return;
    
    const recentProjects = studentData.projects.slice(0, 3);
    
    if (recentProjects.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-project-diagram"></i>
                <h3>No projects yet</h3>
                <p>Start by adding your first project to showcase your skills</p>
                <button class="btn btn-primary" onclick="showProjectForm()">Add Project</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recentProjects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <button class="btn btn-outline btn-sm" onclick="viewProject(${project.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="editProject(${project.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function displayRecommendedJobs() {
    const container = document.getElementById('recommendedJobs');
    if (!container) return;
    
    const recommendedJobs = studentData.jobs.slice(0, 3);
    
    if (recommendedJobs.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-briefcase"></i>
                <h3>No jobs available</h3>
                <p>Check back later for new opportunities</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recommendedJobs.map(job => `
        <div class="job-card">
            <div class="job-header">
                <h3>${job.title}</h3>
                <span class="match-score">${job.matchScore}% Match</span>
            </div>
            <div class="job-meta">
                <span><i class="fas fa-building"></i> ${job.company}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span><i class="fas fa-clock"></i> ${job.type}</span>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-skills">
                ${job.requiredSkills.slice(0, 3).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div class="job-footer">
                <span class="salary">${job.salary}</span>
                <button class="btn btn-primary btn-sm" onclick="applyForJob(${job.id})">
                    Apply Now
                </button>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    // Update dashboard statistics
    document.getElementById('projectCount').textContent = studentData.projects.length;
    document.getElementById('applicationCount').textContent = studentData.applications.length;
    document.getElementById('profileViews').textContent = Math.floor(Math.random() * 100) + 50;
    
    // Calculate average match score
    const avgMatch = studentData.jobs.length > 0 
        ? Math.round(studentData.jobs.reduce((sum, job) => sum + job.matchScore, 0) / studentData.jobs.length)
        : 0;
    document.getElementById('skillScore').textContent = avgMatch + '%';
}

// ===== MODAL FUNCTIONS =====
function showProfileForm() {
    // Populate form with current profile data
    const profile = studentData.profile || {};
    
    document.getElementById('profileName').value = profile.name || '';
    document.getElementById('profileBio').value = profile.bio || '';
    document.getElementById('profileEducation').value = profile.education || '';
    document.getElementById('profileLocation').value = profile.location || '';
    document.getElementById('profileSkills').value = profile.skills ? profile.skills.join(', ') : '';
    
    openModal('profileModal');
}

function showProjectForm() {
    // Clear project form
    document.getElementById('projectForm').reset();
    openModal('projectModal');
}

function showJobsList() {
    displayAllJobs();
    openModal('jobsModal');
}

function showApplications() {
    displayApplications();
    openModal('applicationsModal');
}

function showAllProjects() {
    // Navigate to projects page or show all projects modal
    showToast('Projects page coming soon!', 'info');
}

function showAllJobs() {
    showJobsList();
}

// ===== FORM HANDLERS =====
async function handleProfileUpdate(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('profileName').value,
        bio: document.getElementById('profileBio').value,
        education: document.getElementById('profileEducation').value,
        location: document.getElementById('profileLocation').value,
        skills: document.getElementById('profileSkills').value.split(',').map(s => s.trim())
    };
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Saving...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update student data
        studentData.profile = { ...studentData.profile, ...formData };
        saveStudentData();
        
        // Update UI
        displayProfileInfo();
        
        // Show success message
        showToast('Profile updated successfully!', 'success');
        
        // Close modal
        closeModal('profileModal');
    } catch (error) {
        showToast('Failed to update profile', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handleProjectSubmit(e) {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        technologies: document.getElementById('projectTechnologies').value.split(',').map(s => s.trim()),
        url: document.getElementById('projectUrl').value,
        image: `https://via.placeholder.com/300x200/2563eb/ffffff?text=${encodeURIComponent(document.getElementById('projectTitle').value)}`,
        status: 'published',
        createdAt: new Date().toISOString()
    };
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Adding Project...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Add project to student data
        const newProject = {
            id: Date.now(),
            ...formData
        };
        
        studentData.projects.unshift(newProject);
        saveStudentData();
        
        // Update UI
        displayRecentProjects();
        updateStats();
        
        // Show success message
        showToast('Project added successfully!', 'success');
        
        // Close modal
        closeModal('projectModal');
    } catch (error) {
        showToast('Failed to add project', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// ===== JOB APPLICATION FUNCTIONS =====
async function applyForJob(jobId) {
    const job = studentData.jobs.find(j => j.id === jobId);
    if (!job) return;
    
    // Check if already applied
    const alreadyApplied = studentData.applications.some(app => app.jobId === jobId);
    if (alreadyApplied) {
        showToast('You have already applied for this job', 'warning');
        return;
    }
    
    const application = {
        id: Date.now(),
        jobId: jobId,
        jobTitle: job.title,
        company: job.company,
        status: 'pending',
        appliedAt: new Date().toISOString(),
        coverLetter: `I am excited to apply for the ${job.title} position at ${job.company}.`
    };
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Add application
        studentData.applications.push(application);
        saveStudentData();
        
        // Update stats
        updateStats();
        
        // Show success message
        showToast('Application submitted successfully!', 'success');
    } catch (error) {
        showToast('Failed to submit application', 'error');
    }
}

// ===== DISPLAY ALL ITEMS IN MODALS =====
function displayAllJobs() {
    const container = document.getElementById('jobsList');
    if (!container) return;
    
    if (studentData.jobs.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-briefcase"></i>
                <h3>No jobs available</h3>
                <p>Check back later for new opportunities</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = studentData.jobs.map(job => `
        <div class="job-item">
            <div class="job-header">
                <h3>${job.title}</h3>
                <span class="match-score">${job.matchScore}% Match</span>
            </div>
            <div class="job-meta">
                <span><i class="fas fa-building"></i> ${job.company}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span><i class="fas fa-clock"></i> ${job.type}</span>
                <span><i class="fas fa-money-bill"></i> ${job.salary}</span>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-skills">
                ${job.requiredSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div class="job-actions">
                <button class="btn btn-outline" onclick="viewJobDetails(${job.id})">
                    <i class="fas fa-eye"></i> View Details
                </button>
                <button class="btn btn-primary" onclick="applyForJob(${job.id})">
                    Apply Now
                </button>
            </div>
        </div>
    `).join('');
}

function displayApplications() {
    const container = document.getElementById('applicationsList');
    if (!container) return;
    
    if (studentData.applications.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-alt"></i>
                <h3>No applications yet</h3>
                <p>Start applying for jobs to track your applications</p>
                <button class="btn btn-primary" onclick="showJobsList()">Browse Jobs</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = studentData.applications.map(app => `
        <div class="application-item">
            <div class="application-header">
                <h3>${app.jobTitle}</h3>
                <span class="status status-${app.status}">${app.status}</span>
            </div>
            <div class="application-meta">
                <span><i class="fas fa-building"></i> ${app.company}</span>
                <span><i class="fas fa-calendar"></i> Applied: ${new Date(app.appliedAt).toLocaleDateString()}</span>
            </div>
            <p class="application-cover-letter">${app.coverLetter}</p>
            <div class="application-actions">
                <button class="btn btn-outline" onclick="viewApplication(${app.id})">
                    <i class="fas fa-eye"></i> View
                </button>
                ${app.status === 'pending' ? `
                    <button class="btn btn-outline" onclick="withdrawApplication(${app.id})">
                        <i class="fas fa-times"></i> Withdraw
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// ===== UTILITY FUNCTIONS =====
function saveStudentData() {
    localStorage.setItem('studentData', JSON.stringify(studentData));
}

function initializeMockData() {
    // Initialize with mock data if no data exists
    loadStudentProfile();
    loadStudentProjects();
    loadStudentApplications();
    loadRecommendedJobs();
    saveStudentData();
}

function viewProject(projectId) {
    const project = studentData.projects.find(p => p.id === projectId);
    if (project && project.url) {
        window.open(project.url, '_blank');
    } else {
        showToast('Project URL not available', 'info');
    }
}

function editProject(projectId) {
    showToast('Edit project functionality coming soon!', 'info');
}

function viewJobDetails(jobId) {
    showToast('Job details functionality coming soon!', 'info');
}

function viewApplication(applicationId) {
    showToast('Application details coming soon!', 'info');
}

function withdrawApplication(applicationId) {
    if (confirm('Are you sure you want to withdraw this application?')) {
        studentData.applications = studentData.applications.filter(app => app.id !== applicationId);
        saveStudentData();
        updateStats();
        displayApplications();
        showToast('Application withdrawn successfully', 'success');
    }
}

// ===== EXPORT FUNCTIONS =====
window.StudentDashboard = {
    showProfileForm,
    showProjectForm,
    showJobsList,
    showApplications,
    showAllProjects,
    showAllJobs,
    applyForJob,
    viewProject,
    editProject,
    viewJobDetails,
    viewApplication,
    withdrawApplication
};
