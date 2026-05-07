// TVET Skill Matcher - Main JavaScript

// ===== GLOBAL VARIABLES =====
let currentUser = null;
let isMenuOpen = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupSmoothScrolling();
    setupAnimations();
});

function initializeApp() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateNavigation();
    }
    
    // Initialize animations
    observeElements();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Form submissions
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    document.getElementById('registerForm')?.addEventListener('submit', handleRegister);
    
    // Mobile menu
    document.addEventListener('click', function(e) {
        if (e.target.closest('.hamburger')) {
            toggleMobileMenu();
        }
    });
    
    // Close modals on outside click
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Scroll effects
    window.addEventListener('scroll', handleScroll);
}

// ===== NAVIGATION FUNCTIONS =====
function updateNavigation() {
    if (currentUser) {
        // Update navigation for logged-in user
        const navButtons = document.querySelector('.nav-buttons');
        if (navButtons) {
            navButtons.innerHTML = `
                <div class="user-menu">
                    <span class="welcome-text">Welcome, ${currentUser.name}</span>
                    <button class="btn btn-outline" onclick="showDashboard()">Dashboard</button>
                    <button class="btn btn-outline" onclick="logout()">Logout</button>
                </div>
            `;
        }
    }
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'white';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '20px';
        navMenu.style.boxShadow = 'var(--shadow-lg)';
        
        hamburger.classList.add('active');
    } else {
        navMenu.style.display = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.background = '';
        navMenu.style.flexDirection = '';
        navMenu.style.padding = '';
        navMenu.style.boxShadow = '';
        
        hamburger.classList.remove('active');
    }
}

// ===== MODAL FUNCTIONS =====
function showLogin() {
    openModal('loginModal');
}

function showRegister() {
    openModal('registerModal');
}

function showEmployerRegister() {
    openModal('registerModal');
    // Pre-select employer role
    setTimeout(() => {
        const roleSelect = document.getElementById('userRole');
        if (roleSelect) {
            roleSelect.value = 'employer';
        }
    }, 100);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function switchToRegister() {
    closeModal('loginModal');
    showRegister();
}

function switchToLogin() {
    closeModal('registerModal');
    showLogin();
}

// ===== AUTHENTICATION FUNCTIONS =====
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Logging in...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        const response = await simulateLogin(email, password);
        
        if (response.success) {
            currentUser = response.user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Show success message
            showToast('Login successful! Redirecting...', 'success');
            
            // Close modal and redirect
            setTimeout(() => {
                closeModal('loginModal');
                showDashboard();
            }, 1500);
        } else {
            showToast(response.message || 'Login failed', 'error');
        }
    } catch (error) {
        showToast('Login failed. Please try again.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('userRole').value;
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Creating Account...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        const response = await simulateRegister(name, email, password, role);
        
        if (response.success) {
            currentUser = response.user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Show success message
            showToast('Account created successfully!', 'success');
            
            // Close modal and redirect
            setTimeout(() => {
                closeModal('registerModal');
                showDashboard();
            }, 1500);
        } else {
            showToast(response.message || 'Registration failed', 'error');
        }
    } catch (error) {
        showToast('Registration failed. Please try again.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showToast('Logged out successfully', 'success');
    location.reload();
}

// ===== DASHBOARD FUNCTIONS =====
function showDashboard() {
    if (!currentUser) return;
    
    if (currentUser.role === 'student') {
        // Redirect to student dashboard
        window.location.href = 'student-dashboard.html';
    } else if (currentUser.role === 'employer') {
        // Redirect to employer dashboard
        window.location.href = 'employer-dashboard.html';
    }
}

function showDemo() {
    // Show demo video or walkthrough
    showToast('Demo coming soon!', 'info');
}

// ===== API SIMULATION =====
async function simulateLogin(email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user database
    const users = [
        {
            id: 1,
            name: 'John Student',
            email: 'student@example.com',
            password: 'password123',
            role: 'student'
        },
        {
            id: 2,
            name: 'Jane Employer',
            email: 'employer@example.com',
            password: 'password123',
            role: 'employer'
        }
    ];
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        return {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    } else {
        return {
            success: false,
            message: 'Invalid email or password'
        };
    }
}

async function simulateRegister(name, email, password, role) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (!name || !email || !password || !role) {
        return {
            success: false,
            message: 'All fields are required'
        };
    }
    
    if (password.length < 6) {
        return {
            success: false,
            message: 'Password must be at least 6 characters'
        };
    }
    
    // Simulate successful registration
    return {
        success: true,
        user: {
            id: Date.now(),
            name: name,
            email: email,
            role: role
        }
    };
}

// ===== UTILITY FUNCTIONS =====
function setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

function setupAnimations() {
    // Add scroll animations to elements
    const animatedElements = document.querySelectorAll('.feature-card, .step, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

function observeElements() {
    // Observe elements for scroll animations
    const elements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .hero-stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    return icons[type] || icons.info;
}

function getToastColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    return colors[type] || colors.info;
}

// ===== FORM VALIDATION =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// ===== LOCAL STORAGE HELPERS =====
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to get from localStorage:', error);
        return null;
    }
}

// ===== ANIMATION STYLES =====
const animationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .toast-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
        transition: background 0.2s;
    }
    
    .toast-close:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;

// Add animation styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// ===== EXPORT FUNCTIONS =====
window.TVETSkillMatcher = {
    showLogin,
    showRegister,
    showEmployerRegister,
    closeModal,
    switchToRegister,
    switchToLogin,
    logout,
    showDashboard,
    showDemo,
    showToast,
    validateEmail,
    validatePassword
};
