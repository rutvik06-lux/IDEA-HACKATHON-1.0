// App State
let currentUser = null;
let currentPage = 'dashboard';

// Helper functions for toggling forms
function toggleToRegister() {
    console.log('toggleToRegister called');
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').classList.remove('hidden');
}

function toggleToLogin() {
    console.log('toggleToLogin called');
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}

// Logout function
function logout() {
    currentUser = null;
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('registerPage').classList.add('hidden');
    console.log('User logged out');
}

// Get registered users from localStorage
function getRegisteredUsers() {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
}

// Save registered users to localStorage
function saveRegisteredUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Helper function to get user initials
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

// Dashboard and other data
const dashboardData = {
    totalSubjects: 6,
    attendance: 85,
    feesPending: 12000,
    upcomingDeadlines: 3
};

const attendanceData = [
    { subject: 'Data Structures', attended: 27, total: 30, percentage: 90 },
    { subject: 'Database Management', attended: 24, total: 30, percentage: 80 },
    { subject: 'Computer Networks', attended: 26, total: 30, percentage: 87 },
    { subject: 'Operating Systems', attended: 25, total: 30, percentage: 83 },
    { subject: 'Web Development', attended: 28, total: 30, percentage: 93 },
    { subject: 'Software Engineering', attended: 23, total: 30, percentage: 77 }
];

const curriculumData = [
    {
        semester: 'Semester 3',
        subjects: [
            { code: 'CS301', name: 'Data Structures', credits: 4 },
            { code: 'CS302', name: 'Database Management Systems', credits: 4 },
            { code: 'CS303', name: 'Computer Networks', credits: 3 },
            { code: 'MA301', name: 'Discrete Mathematics', credits: 3 }
        ]
    },
    {
        semester: 'Semester 4',
        subjects: [
            { code: 'CS401', name: 'Operating Systems', credits: 4 },
            { code: 'CS402', name: 'Web Development', credits: 3 },
            { code: 'CS403', name: 'Software Engineering', credits: 4 },
            { code: 'CS404', name: 'Machine Learning', credits: 3 }
        ]
    }
];

const feesData = {
    total: 50000,
    paid: 38000,
    pending: 12000,
    dueDate: '2026-02-28',
    history: [
        { date: '2026-01-15', amount: 20000, method: 'Online', status: 'Completed' },
        { date: '2025-08-10', amount: 18000, method: 'Bank Transfer', status: 'Completed' },
        { date: '2025-01-05', amount: 15000, method: 'Cash', status: 'Completed' }
    ]
};

const formsData = [
    {
        id: 'bonafide',
        title: 'Bonafide Certificate',
        description: 'Request a bonafide certificate for official purposes',
        icon: '📜'
    },
    {
        id: 'leave',
        title: 'Leave Application',
        description: 'Apply for leave from college',
        icon: '📝'
    },
    {
        id: 'exam',
        title: 'Exam Registration',
        description: 'Register for upcoming semester examinations',
        icon: '📋'
    },
    {
        id: 'report',
        title: 'Report Application',
        description: 'Report an incident, grievance, or concern to the administration',
        icon: '🚨'
    },
    {
        id: 'hostel',
        title: 'Hostel Application',
        description: 'Apply for hostel accommodation or room change request',
        icon: '🏠'
    }
];

// Internship Portal Data
const internshipsData = [
    {
        id: 'int001',
        company: 'Google',
        role: 'Software Engineering Intern',
        domain: 'Software Development',
        duration: '3 Months (May – July 2026)',
        stipend: '₹45,000 / month',
        location: 'Bangalore (Hybrid)',
        logo: '🔵',
        color: 'from-blue-500 to-blue-700',
        badge: 'bg-blue-100 text-blue-700',
        contactEmail: 'internships.cs@university.edu',
        requirements: [
            'B.Tech / B.E. in Computer Science or related field',
            'Strong proficiency in at least one language: Python, Java, C++, or Go',
            'Knowledge of Data Structures & Algorithms',
            'CGPA ≥ 8.0',
            'Prior open-source contributions preferred'
        ],
        description: 'Work on large-scale distributed systems and contribute to real Google products. Mentorship from senior engineers included.'
    },
    {
        id: 'int002',
        company: 'Microsoft',
        role: 'Cloud & AI Intern',
        domain: 'Cloud Computing / AI',
        duration: '2 Months (June – July 2026)',
        stipend: '₹40,000 / month',
        location: 'Hyderabad (Hybrid)',
        logo: '🟦',
        color: 'from-cyan-500 to-blue-600',
        badge: 'bg-cyan-100 text-cyan-700',
        contactEmail: 'internships.cloud@university.edu',
        requirements: [
            'Familiarity with Azure or any cloud platform',
            'Basic understanding of Machine Learning concepts',
            'Proficiency in Python or C#',
            'CGPA ≥ 7.5',
            'Completed at least one ML/AI course or project'
        ],
        description: 'Gain hands-on experience with Microsoft Azure services and AI tools. Build and deploy cloud-native applications.'
    },
    {
        id: 'int003',
        company: 'Flipkart',
        role: 'Data Science Intern',
        domain: 'Data Science & Analytics',
        duration: '3 Months (May – July 2026)',
        stipend: '₹35,000 / month',
        location: 'Bangalore (Remote)',
        logo: '🟡',
        color: 'from-yellow-400 to-orange-500',
        badge: 'bg-yellow-100 text-yellow-700',
        contactEmail: 'internships.data@university.edu',
        requirements: [
            'Strong knowledge of Python (Pandas, NumPy, Scikit-learn)',
            'Experience with SQL and data querying',
            'Understanding of statistical analysis and visualization',
            'CGPA ≥ 7.0',
            'Portfolio or Kaggle profile is a plus'
        ],
        description: 'Analyze large e-commerce datasets to derive business insights. Work with the data science team on recommendation systems and demand forecasting.'
    },
    {
        id: 'int004',
        company: 'Infosys',
        role: 'Web Development Intern',
        domain: 'Full Stack Development',
        duration: '2 Months (June – July 2026)',
        stipend: '₹25,000 / month',
        location: 'Pune (Hybrid)',
        logo: '🟢',
        color: 'from-green-500 to-teal-600',
        badge: 'bg-green-100 text-green-700',
        contactEmail: 'internships.web@university.edu',
        requirements: [
            'Knowledge of HTML, CSS, JavaScript',
            'Familiarity with React.js or Angular',
            'Basic understanding of REST APIs and Node.js',
            'CGPA ≥ 6.5',
            'Any personal project or portfolio website preferred'
        ],
        description: 'Develop and maintain web applications for enterprise clients. Collaborate with cross-functional teams in an agile environment.'
    },
    {
        id: 'int005',
        company: 'DRDO',
        role: 'Embedded Systems Intern',
        domain: 'Electronics & Embedded',
        duration: '6 Weeks (May – June 2026)',
        stipend: '₹20,000 / month',
        location: 'Delhi (On-site)',
        logo: '🔴',
        color: 'from-red-500 to-rose-700',
        badge: 'bg-red-100 text-red-700',
        contactEmail: 'internships.embedded@university.edu',
        requirements: [
            'B.Tech in Electronics, ECE, or CS',
            'Knowledge of C/C++ for embedded systems',
            'Familiarity with microcontrollers (Arduino, STM32, etc.)',
            'CGPA ≥ 7.0',
            'No active backlogs'
        ],
        description: 'Work on defense-grade embedded systems and real-time operating systems. Security clearance process will be initiated post-selection.'
    },
    {
        id: 'int006',
        company: 'Razorpay',
        role: 'Cybersecurity Intern',
        domain: 'Cybersecurity & DevSecOps',
        duration: '3 Months (May – July 2026)',
        stipend: '₹50,000 / month',
        location: 'Bangalore (Hybrid)',
        logo: '🟣',
        color: 'from-purple-500 to-indigo-700',
        badge: 'bg-purple-100 text-purple-700',
        contactEmail: 'internships.security@university.edu',
        requirements: [
            'Understanding of network security fundamentals',
            'Knowledge of OWASP Top 10 vulnerabilities',
            'Experience with Linux and scripting (Bash/Python)',
            'CGPA ≥ 7.5',
            'CTF participation or bug bounty experience is a big plus'
        ],
        description: 'Assist the security team in vulnerability assessments, penetration testing, and securing payment infrastructure at scale.'
    }
];

// Document tracking data for performance analyzer
const requiredDocuments = [
    { id: 'bonafide', name: 'Bonafide Certificate', uploaded: true },
    { id: 'leaving', name: 'Leaving Certificate', uploaded: false },
    { id: 'tenth', name: '10th Marksheet', uploaded: true },
    { id: 'twelfth', name: '12th Marksheet', uploaded: true },
    { id: 'aadhar', name: 'Aadhar Card', uploaded: true },
    { id: 'photo', name: 'Passport Photo', uploaded: true },
    { id: 'income', name: 'Income Certificate', uploaded: false },
    { id: 'caste', name: 'Caste Certificate', uploaded: false },
    { id: 'medical', name: 'Medical Certificate', uploaded: true },
    { id: 'transfer', name: 'Transfer Certificate', uploaded: false }
];

// Previous semester results data
const semesterResults = [
    {
        semester: 'Semester 1',
        sgpa: 8.5,
        status: 'Passed',
        subjects: [
            { code: 'CS101', name: 'Programming Fundamentals', credits: 4, grade: 'A', points: 9 },
            { code: 'MA101', name: 'Engineering Mathematics I', credits: 4, grade: 'A', points: 9 },
            { code: 'PH101', name: 'Engineering Physics', credits: 3, grade: 'B+', points: 8 },
            { code: 'CH101', name: 'Engineering Chemistry', credits: 3, grade: 'A', points: 9 },
            { code: 'EE101', name: 'Basic Electrical Engineering', credits: 3, grade: 'B', points: 7 }
        ]
    },
    {
        semester: 'Semester 2',
        sgpa: 8.8,
        status: 'Passed',
        subjects: [
            { code: 'CS201', name: 'Data Structures', credits: 4, grade: 'A+', points: 10 },
            { code: 'MA201', name: 'Engineering Mathematics II', credits: 4, grade: 'A', points: 9 },
            { code: 'CS202', name: 'Digital Logic Design', credits: 3, grade: 'A', points: 9 },
            { code: 'ME201', name: 'Engineering Mechanics', credits: 3, grade: 'B+', points: 8 },
            { code: 'CS203', name: 'Computer Organization', credits: 3, grade: 'A', points: 9 }
        ]
    },
    {
        semester: 'Semester 3',
        sgpa: 9.0,
        status: 'Passed',
        subjects: [
            { code: 'CS301', name: 'Database Management Systems', credits: 4, grade: 'A+', points: 10 },
            { code: 'CS302', name: 'Computer Networks', credits: 4, grade: 'A+', points: 10 },
            { code: 'CS303', name: 'Operating Systems', credits: 3, grade: 'A', points: 9 },
            { code: 'MA301', name: 'Discrete Mathematics', credits: 3, grade: 'A', points: 9 },
            { code: 'CS304', name: 'Software Engineering', credits: 3, grade: 'A', points: 9 }
        ]
    }
];

// ── Credential URL Verification ─────────────────────────────────────────────
// The credential URL embeds all student data as a base64 payload so it works
// in ANY browser tab — no localStorage needed (self-contained shareable link).

function getCredentialURL() {
    if (!currentUser) return '';
    const cgpa = (semesterResults.reduce((sum, sem) => sum + sem.sgpa, 0) / semesterResults.length).toFixed(2);
    const avgAttendance = Math.round(attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length);

    const payload = {
        name: currentUser.name,
        email: currentUser.email,
        rollNumber: currentUser.rollNumber,
        course: currentUser.course,
        year: currentUser.year,
        cgpa,
        attendance: avgAttendance,
        semesters: semesterResults.length,
        issued: new Date().toISOString().split('T')[0]
    };

    // Encode payload into URL-safe base64
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    // Simple integrity check: hash of roll + secret
    const sig = btoa(`TU-${currentUser.rollNumber}-2026`).replace(/=/g, '');
    return `${window.location.origin}${window.location.pathname}?cred=${encodeURIComponent(encoded)}&sig=${sig}`;
}

function checkCredentialVerifyURL() {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('cred');
    const sig = params.get('sig');
    if (!encoded) return false;

    // Show the verification page immediately
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('credentialVerifyPage').classList.remove('hidden');
    document.getElementById('credVerifyTime').textContent = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    let student;
    try {
        student = JSON.parse(decodeURIComponent(escape(atob(encoded))));
    } catch (e) {
        document.getElementById('credVerifyCard').classList.add('hidden');
        document.getElementById('credNotFound').classList.remove('hidden');
        return true;
    }

    // Validate signature
    const expectedSig = btoa(`TU-${student.rollNumber}-2026`).replace(/=/g, '');
    if (sig !== expectedSig) {
        document.getElementById('credVerifyCard').classList.add('hidden');
        document.getElementById('credNotFound').classList.remove('hidden');
        return true;
    }

    // ✅ Valid — render the verified card
    document.getElementById('credStudentInfo').innerHTML = `
        <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-500 mb-1">Full Name</p>
                <p class="font-bold text-gray-800">${student.name}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-500 mb-1">Roll Number</p>
                <p class="font-bold text-gray-800">${student.rollNumber}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-500 mb-1">Course</p>
                <p class="font-bold text-gray-800">${student.course}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-500 mb-1">Year</p>
                <p class="font-bold text-gray-800">${student.year}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 col-span-2">
                <p class="text-xs text-gray-500 mb-1">University Email</p>
                <p class="font-bold text-gray-800">${student.email}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-4 col-span-2">
                <p class="text-xs text-gray-500 mb-1">Credential Issued On</p>
                <p class="font-bold text-gray-800">${student.issued}</p>
            </div>
        </div>
    `;

    document.getElementById('credAcademicInfo').innerHTML = `
        <h3 class="text-sm font-semibold text-gray-700 mb-3">📊 Academic Summary</h3>
        <div class="grid grid-cols-3 gap-3">
            <div class="text-center bg-indigo-50 rounded-xl p-3">
                <p class="text-2xl font-bold text-indigo-600">${student.cgpa}</p>
                <p class="text-xs text-gray-500 mt-1">CGPA</p>
            </div>
            <div class="text-center bg-green-50 rounded-xl p-3">
                <p class="text-2xl font-bold text-green-600">${student.attendance}%</p>
                <p class="text-xs text-gray-500 mt-1">Attendance</p>
            </div>
            <div class="text-center bg-purple-50 rounded-xl p-3">
                <p class="text-2xl font-bold text-purple-600">${student.semesters}</p>
                <p class="text-xs text-gray-500 mt-1">Semesters</p>
            </div>
        </div>
        <div class="mt-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center space-x-2">
            <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-sm text-green-700 font-medium">All semesters passed — No active backlogs</p>
        </div>
    `;

    return true;
}

function copyCredentialURL() {
    const url = getCredentialURL();
    navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('copyCredBtn');
        if (btn) {
            btn.textContent = '✅ Copied!';
            btn.classList.replace('bg-indigo-600', 'bg-green-600');
            setTimeout(() => {
                btn.textContent = '📋 Copy URL';
                btn.classList.replace('bg-green-600', 'bg-indigo-600');
            }, 2000);
        }
    }).catch(() => {
        prompt('Copy this credential URL:', url);
    });
}

// ── Google Sign-In ────────────────────────────────────────────────────────────
function handleGoogleSignIn(response) {
    // Decode the JWT credential from Google
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    const { name, email, picture } = payload;

    // Check if user already registered
    const users = getRegisteredUsers();
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
        // Auto-register with Google info
        user = {
            name,
            email,
            password: '',          // no password for Google users
            rollNumber: 'GOOGLE-' + Date.now().toString().slice(-6),
            course: 'B.Tech Computer Science',
            year: '1st Year',
            initials: getInitials(name),
            photo: picture || null,
            googleAuth: true
        };
        users.push(user);
        saveRegisteredUsers(users);
    }

    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showApp();
}

// Initialize App
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Content Loaded');

    // ── Check for credential verification URL ──
    if (checkCredentialVerifyURL()) return;

    // ── Google Sign-In initialization ──
    if (window.google && window.google.accounts) {
        google.accounts.id.initialize({
            client_id: '458337858551-demo.apps.googleusercontent.com', // Replace with your real Client ID
            callback: handleGoogleSignIn,
            auto_select: false
        });
        google.accounts.id.renderButton(
            document.getElementById('googleSignInBtn'),
            { theme: 'outline', size: 'large', width: 320, text: 'signin_with', shape: 'rectangular' }
        );
    }

    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showApp();
    }

    // Login Form
    const loginFormEl = document.getElementById('loginForm');
    if (!loginFormEl) {
        console.warn('Login form element not found; skipping login setup.');
    } else {
        loginFormEl.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('emailInput').value.trim();
            const password = document.getElementById('passwordInput').value;

            // Get registered users
            const users = getRegisteredUsers();
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

            if (!user) {
                alert('No account found with this email. Please register first.');
                return;
            }

            if (user.password !== password) {
                alert('Incorrect password. Please try again.');
                return;
            }

            // Login successful
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showApp();
        });
    }

    // Registration Form
    const registerFormEl = document.getElementById('registerForm');
    if (!registerFormEl) {
        console.error('Register form element not found!');
    } else {
        registerFormEl.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Register form submitted');

            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            const rollNumber = document.getElementById('regRollNumber').value.trim();
            const course = document.getElementById('regCourse').value;
            const year = document.getElementById('regYear').value;

            // Validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            if (password.length < 6) {
                alert('Password must be at least 6 characters long!');
                return;
            }

            // Check if email already exists
            const users = getRegisteredUsers();
            if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
                alert('An account with this email already exists!');
                return;
            }

            // Create new user
            const newUser = {
                name,
                email,
                password,
                rollNumber,
                course,
                year,
                initials: getInitials(name)
            };

            // Save user
            users.push(newUser);
            saveRegisteredUsers(users);

            alert('Registration successful! Please login with your credentials.');
            showLoginPage();
        });
    }

    // Show Register Page
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    if (!showRegisterBtn) {
        console.error('showRegisterBtn not found!');
    } else {
        console.log('showRegisterBtn found, attaching click handler');
        showRegisterBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Register button clicked');
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('registerPage').classList.remove('hidden');
        });
    }

    // Show Login Page
    const showLoginBtn = document.getElementById('showLoginBtn');
    if (!showLoginBtn) {
        console.error('showLoginBtn not found!');
    } else {
        console.log('showLoginBtn found, attaching click handler');
        showLoginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Login button clicked');
            document.getElementById('registerPage').classList.add('hidden');
            document.getElementById('loginPage').classList.remove('hidden');
        });
    }

    // Forgot Password
    document.getElementById('forgotPasswordBtn').addEventListener('click', function () {
        const email = prompt('Enter your registered email address:');
        if (!email) return;

        const users = getRegisteredUsers();
        const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

        if (!user) {
            alert('No account found with this email address.');
            return;
        }

        alert(`Password reset link has been sent to ${email}.\n\nFor this demo, your password is: ${user.password}`);
    });

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateTo(page);
        });
    });

    // Mobile menu toggle
    document.getElementById('menuToggle').addEventListener('click', function () {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('-translate-x-full');
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        currentUser = null;
        document.getElementById('mainApp').classList.add('hidden');
        showLoginPage();
    });

    // Modal Close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalBackdrop').addEventListener('click', closeModal);
});

function showLoginPage() {
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    // Clear form fields
    document.getElementById('emailInput').value = '';
    document.getElementById('passwordInput').value = '';
}

function showApp() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    document.getElementById('headerUserName').textContent = currentUser.name;

    // Update user avatar initials
    const avatarElements = document.querySelectorAll('.w-10.h-10.bg-gradient-to-br');
    avatarElements.forEach(el => {
        if (el.textContent.trim().length <= 2) {
            el.textContent = currentUser.initials;
        }
    });

    navigateTo('dashboard');
}

function navigateTo(page) {
    currentPage = page;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        }
    });

    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        profile: 'My Profile',
        attendance: 'Attendance',
        curriculum: 'Curriculum',
        fees: 'Fees & Payments',
        forms: 'Forms & Applications',
        results: 'Semester Results',
        performance: 'Document Performance',
        risk: 'Risk Analyzer',
        timetable: 'Weekly Timetable',
        studentid: 'Student ID Card',
        internship: 'Internship Portal'
    };
    document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';

    // Close mobile menu
    document.getElementById('sidebar').classList.add('-translate-x-full');
    document.getElementById('sidebar').classList.remove('lg:-translate-x-full');
    setTimeout(() => {
        document.getElementById('sidebar').classList.add('lg:translate-x-0');
    }, 10);

    // Load page content
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = getPageContent(page);
    contentArea.classList.add('fade-in');

    // Attach event listeners for the current page
    attachPageEventListeners(page);
}

function getPageContent(page) {
    switch (page) {
        case 'dashboard':
            return getDashboardContent();
        case 'profile':
            return getProfileContent();
        case 'attendance':
            return getAttendanceContent();
        case 'curriculum':
            return getCurriculumContent();
        case 'fees':
            return getFeesContent();
        case 'forms':
            return getFormsContent();
        case 'results':
            return getResultsContent();
        case 'performance':
            return getPerformanceContent();
        case 'risk':
            return getRiskAnalyzerContent();
        case 'timetable':
            return getTimetableContent();
        case 'studentid':
            return getStudentIdContent();
        case 'internship':
            return getInternshipContent();
        default:
            return getDashboardContent();
    }
}

function getDashboardContent() {
    return `
        <div class="max-w-7xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome back, ${currentUser.name}! 👋</h1>
                <p class="text-gray-600">Here's what's happening with your academics today.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-2xl font-bold text-gray-800 mb-1">${dashboardData.totalSubjects}</p>
                    <p class="text-sm text-gray-600">Total Subjects</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-2xl font-bold text-gray-800 mb-1">${dashboardData.attendance}%</p>
                    <p class="text-sm text-gray-600">Overall Attendance</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-2xl font-bold text-red-600 mb-1">₹${dashboardData.feesPending.toLocaleString()}</p>
                    <p class="text-sm text-gray-600">Fees Pending</p>
                    <p class="text-xs text-red-500 font-medium mt-2">Due: ${feesData.dueDate}</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-2xl font-bold text-gray-800 mb-1">${dashboardData.upcomingDeadlines}</p>
                    <p class="text-sm text-gray-600">Upcoming Deadlines</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-xl shadow-md p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div class="space-y-4">
                        <div class="flex items-start space-x-3">
                            <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                                <p class="text-sm font-medium text-gray-800">Attendance marked for Web Development</p>
                                <p class="text-xs text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                                <p class="text-sm font-medium text-gray-800">Assignment submitted for Data Structures</p>
                                <p class="text-xs text-gray-500">1 day ago</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <div>
                                <p class="text-sm font-medium text-gray-800">Exam schedule released</p>
                                <p class="text-xs text-gray-500">3 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <button onclick="navigateTo('attendance')" class="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all text-left">
                            <div class="text-2xl mb-2">📊</div>
                            <p class="text-sm font-medium text-gray-800">View Attendance</p>
                        </button>
                        <button onclick="navigateTo('fees')" class="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all text-left">
                            <div class="text-2xl mb-2">💳</div>
                            <p class="text-sm font-medium text-gray-800">Pay Fees</p>
                        </button>
                        <button onclick="navigateTo('forms')" class="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all text-left">
                            <div class="text-2xl mb-2">📝</div>
                            <p class="text-sm font-medium text-gray-800">Apply Forms</p>
                        </button>
                        <button onclick="navigateTo('curriculum')" class="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all text-left">
                            <div class="text-2xl mb-2">📚</div>
                            <p class="text-sm font-medium text-gray-800">View Curriculum</p>
                        </button>
                        <button onclick="navigateTo('studentid')" class="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all text-left col-span-2">
                            <div class="text-2xl mb-2">🪪</div>
                            <p class="text-sm font-medium text-gray-800">Student ID & Credential URL</p>
                            <p class="text-xs text-gray-400 mt-0.5">View your ID card, download PDF & share credential link</p>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Department Mentors Section -->
            <div class="mt-6 bg-white rounded-xl shadow-md p-6">
                <div class="flex items-center space-x-3 mb-5">
                    <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">Department Mentors</h3>
                        <p class="text-xs text-gray-500">Your HOD is your academic guide — reach out anytime</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${[
            { dept: 'Computer Science', short: 'CS', name: 'Prof. Parth Naik', email: 'hod.cs@university.edu', color: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500', avail: 'Mon–Fri, 10am–1pm' },
            { dept: 'Digital Electronics', short: 'DE', name: 'Prof. Sandesh Patil', email: 'hod.de@university.edu', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', avail: 'Mon–Thu, 11am–2pm' },
            { dept: 'Information Technology', short: 'IT', name: 'Prof. Gayatri Rao', email: 'hod.it@university.edu', color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500', avail: 'Tue–Fri, 9am–12pm' },
            { dept: 'Mechanical Engineering', short: 'ME', name: 'Prof. Ayush Mhatre', email: 'hod.me@university.edu', color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500', avail: 'Mon–Wed, 2pm–5pm' },
            { dept: 'Civil Engineering', short: 'CE', name: 'Dr. Sunita Rao', email: 'hod.civil@university.edu', color: 'bg-green-100 text-green-700', dot: 'bg-green-500', avail: 'Wed–Fri, 10am–1pm' },
            { dept: 'Electronics & Comm.', short: 'ECE', name: 'Prof. Vikram Joshi', email: 'hod.ece@university.edu', color: 'bg-red-100 text-red-700', dot: 'bg-red-500', avail: 'Mon, Wed, Fri, 11am–1pm' }
        ].map(m => `
                        <div class="flex items-start space-x-3 p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                            <div class="w-11 h-11 rounded-xl ${m.color} flex items-center justify-center font-bold text-sm flex-shrink-0">
                                ${m.short}
                            </div>
                            <div class="min-w-0">
                                <p class="text-sm font-semibold text-gray-800">${m.name}</p>
                                <p class="text-xs text-gray-500">${m.dept}</p>
                                <a href="mailto:${m.email}" class="text-xs text-indigo-600 hover:underline block">${m.email}</a>
                                <div class="flex items-center space-x-1 mt-1">
                                    <span class="w-1.5 h-1.5 rounded-full ${m.dot} inline-block"></span>
                                    <span class="text-xs text-gray-400">${m.avail}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}


function getProfileContent() {
    return `
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                <div class="px-8 pb-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
                        <div class="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white mb-4 sm:mb-0">
                            ${currentUser.photo
            ? `<img src="${currentUser.photo}" class="w-28 h-28 rounded-xl object-cover" alt="Profile Photo">`
            : `<div class="w-28 h-28 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">${currentUser.initials}</div>`
        }
                        </div>
                        <div class="sm:ml-6 text-center sm:text-left">
                            <h2 class="text-2xl font-bold text-gray-800">${currentUser.name}</h2>
                            <p class="text-gray-600">${currentUser.course}</p>
                        </div>
                        <button onclick="openEditProfileModal()" class="sm:ml-auto mt-4 sm:mt-0 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
                            ✏️ Edit Profile
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                            
                            <div class="flex items-center space-x-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                                <div>
                                    <p class="text-xs text-gray-500">Full Name</p>
                                    <p class="font-medium text-gray-800">${currentUser.name}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <div>
                                    <p class="text-xs text-gray-500">Email Address</p>
                                    <p class="font-medium text-gray-800">${currentUser.email}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                                </svg>
                                <div>
                                    <p class="text-xs text-gray-500">Roll Number</p>
                                    <p class="font-medium text-gray-800">${currentUser.rollNumber}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4">Academic Details</h3>
                            
                            <div class="flex items-center space-x-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                </svg>
                                <div>
                                    <p class="text-xs text-gray-500">Course</p>
                                    <p class="font-medium text-gray-800">${currentUser.course}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <div>
                                    <p class="text-xs text-gray-500">Current Year</p>
                                    <p class="font-medium text-gray-800">${currentUser.year}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <div>
                                    <p class="text-xs text-gray-500">Overall Attendance</p>
                                    <p class="font-medium text-gray-800">${dashboardData.attendance}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-8 pt-8 border-t border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium flex items-center justify-center space-x-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <span>Change Password</span>
                        </button>
                        
                        <button onclick="logout()" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium flex items-center justify-center space-x-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getAttendanceContent() {
    const avgAttendance = Math.round(attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length);

    return `
        <div class="max-w-6xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Attendance Overview</h1>
                <p class="text-gray-600">Track your attendance across all subjects</p>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Overall Attendance</h3>
                    <span class="text-2xl font-bold ${avgAttendance >= 75 ? 'text-green-600' : 'text-red-600'}">${avgAttendance}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-4">
                    <div class="h-4 rounded-full ${avgAttendance >= 75 ? 'bg-green-500' : 'bg-red-500'}" style="width: ${avgAttendance}%"></div>
                </div>
                <p class="text-sm text-gray-500 mt-2">${avgAttendance >= 75 ? 'Great! You meet the minimum attendance requirement.' : 'Warning: Below 75% attendance requirement.'}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${attendanceData.map(subject => `
                    <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                        <h4 class="font-semibold text-gray-800 mb-3">${subject.subject}</h4>
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm text-gray-600">Classes Attended</span>
                            <span class="text-sm font-medium">${subject.attended}/${subject.total}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div class="h-3 rounded-full ${subject.percentage >= 75 ? 'bg-green-500' : 'bg-red-500'}" style="width: ${subject.percentage}%"></div>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-gray-500">Percentage</span>
                            <span class="text-lg font-bold ${subject.percentage >= 75 ? 'text-green-600' : 'text-red-600'}">${subject.percentage}%</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getCurriculumContent() {
    return `
        <div class="max-w-5xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Curriculum</h1>
                <p class="text-gray-600">View your semester-wise subjects and credits</p>
            </div>
            
            <div class="space-y-4">
                ${curriculumData.map((sem, index) => `
                    <div class="bg-white rounded-xl shadow-md overflow-hidden">
                        <button onclick="toggleAccordion('sem${index}')" class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-all">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                    </svg>
                                </div>
                                <div class="text-left">
                                    <h3 class="font-semibold text-gray-800">${sem.semester}</h3>
                                    <p class="text-sm text-gray-500">${sem.subjects.length} subjects</p>
                                </div>
                            </div>
                            <svg id="sem${index}-icon" class="w-6 h-6 text-gray-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                        <div id="sem${index}" class="hidden px-6 pb-6">
                            <div class="space-y-3">
                                ${sem.subjects.map(subject => `
                                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                                        <div>
                                            <p class="font-medium text-gray-800">${subject.name}</p>
                                            <p class="text-sm text-gray-500">Code: ${subject.code}</p>
                                        </div>
                                        <div class="text-right">
                                            <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">${subject.credits} Credits</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getFeesContent() {
    return `
        <div class="max-w-5xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Fees & Payments</h1>
                <p class="text-gray-600">Manage your fee payments and view history</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-md p-6">
                    <p class="text-sm text-gray-600 mb-2">Total Fees</p>
                    <p class="text-3xl font-bold text-gray-800">₹${feesData.total.toLocaleString()}</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6">
                    <p class="text-sm text-gray-600 mb-2">Paid Amount</p>
                    <p class="text-3xl font-bold text-green-600">₹${feesData.paid.toLocaleString()}</p>
                </div>
                
                <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-md p-6 border-2 border-red-200">
                    <p class="text-sm text-red-700 mb-2 font-medium">Pending Amount</p>
                    <p class="text-3xl font-bold text-red-600">₹${feesData.pending.toLocaleString()}</p>
                    <p class="text-sm text-red-600 font-semibold mt-2">Due Date: ${feesData.dueDate}</p>
                    <button class="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all font-medium">
                        Pay Now
                    </button>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Payment History</h3>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Method</th>
                                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${feesData.history.map(payment => `
                                <tr class="border-b border-gray-100 hover:bg-gray-50">
                                    <td class="py-3 px-4 text-sm text-gray-800">${payment.date}</td>
                                    <td class="py-3 px-4 text-sm font-medium text-gray-800">₹${payment.amount.toLocaleString()}</td>
                                    <td class="py-3 px-4 text-sm text-gray-600">${payment.method}</td>
                                    <td class="py-3 px-4">
                                        <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">${payment.status}</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getFormsContent() {
    return `
        <div class="max-w-5xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Forms & Applications</h1>
                <p class="text-gray-600">Apply for various certificates and requests</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${formsData.map(form => `
                    <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer" onclick="openFormModal('${form.id}', '${form.title}')">
                        <div class="text-4xl mb-4">${form.icon}</div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">${form.title}</h3>
                        <p class="text-sm text-gray-600 mb-4">${form.description}</p>
                        <button class="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium">
                            Apply Now
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getInternshipContent() {
    return `
        <div class="max-w-6xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Internship Portal 💼</h1>
                <p class="text-gray-600">Explore internship opportunities and apply directly through the college placement cell</p>
            </div>

            <!-- Info Banner -->
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 mb-8 text-white flex items-start space-x-4">
                <div class="text-3xl">📧</div>
                <div>
                    <p class="font-semibold text-lg mb-1">How to Apply</p>
                    <p class="text-indigo-100 text-sm">Click <strong>Apply Now</strong> on any internship to get the college email ID. Send your CV to that email with the subject line as specified. Make sure your CV includes all mandatory details.</p>
                </div>
            </div>

            <!-- CV Checklist Banner -->
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
                <div class="flex items-center space-x-2 mb-3">
                    <span class="text-xl">⚠️</span>
                    <h3 class="font-semibold text-amber-800">Mandatory CV Requirements</h3>
                </div>
                <p class="text-sm text-amber-700 mb-3">Your CV <strong>must</strong> include the following — applications missing these will be rejected:</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div class="flex items-center space-x-2 bg-white rounded-lg px-4 py-3 border border-amber-100">
                        <span class="text-blue-600 text-xl">🔗</span>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Required</p>
                            <p class="text-sm font-semibold text-gray-800">LinkedIn Profile URL</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 bg-white rounded-lg px-4 py-3 border border-amber-100">
                        <span class="text-gray-800 text-xl">🐙</span>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Required</p>
                            <p class="text-sm font-semibold text-gray-800">GitHub Profile URL</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 bg-white rounded-lg px-4 py-3 border border-amber-100">
                        <span class="text-red-500 text-xl">📩</span>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Required</p>
                            <p class="text-sm font-semibold text-gray-800">Personal Email ID</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Internship Cards -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                ${internshipsData.map(intern => `
                    <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100">
                        <!-- Card Header -->
                        <div class="bg-gradient-to-r ${intern.color} p-5 text-white">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-3xl mb-1">${intern.logo}</div>
                                    <h3 class="text-xl font-bold">${intern.company}</h3>
                                    <p class="text-white/80 text-sm">${intern.role}</p>
                                </div>
                                <span class="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">${intern.domain}</span>
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="p-5">
                            <!-- Meta Info -->
                            <div class="grid grid-cols-3 gap-3 mb-4">
                                <div class="text-center bg-gray-50 rounded-lg p-2">
                                    <p class="text-xs text-gray-500 mb-1">⏱ Duration</p>
                                    <p class="text-xs font-semibold text-gray-700">${intern.duration}</p>
                                </div>
                                <div class="text-center bg-gray-50 rounded-lg p-2">
                                    <p class="text-xs text-gray-500 mb-1">💰 Stipend</p>
                                    <p class="text-xs font-semibold text-green-600">${intern.stipend}</p>
                                </div>
                                <div class="text-center bg-gray-50 rounded-lg p-2">
                                    <p class="text-xs text-gray-500 mb-1">📍 Location</p>
                                    <p class="text-xs font-semibold text-gray-700">${intern.location}</p>
                                </div>
                            </div>

                            <!-- Description -->
                            <p class="text-sm text-gray-600 mb-4">${intern.description}</p>

                            <!-- Requirements -->
                            <div class="mb-4">
                                <p class="text-sm font-semibold text-gray-700 mb-2">📋 Requirements:</p>
                                <ul class="space-y-1">
                                    ${intern.requirements.map(req => `
                                        <li class="flex items-start space-x-2 text-sm text-gray-600">
                                            <span class="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                                            <span>${req}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>

                            <!-- Apply Button -->
                            <button onclick="openInternshipModal('${intern.id}')"
                                class="w-full py-2.5 bg-gradient-to-r ${intern.color} text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-md">
                                Apply Now →
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openInternshipModal(internId) {
    const intern = internshipsData.find(i => i.id === internId);
    if (!intern) return;

    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = `Apply — ${intern.company}`;

    const mailSubject = encodeURIComponent(`Internship Application: ${intern.role} | ${currentUser.name} | ${currentUser.rollNumber}`);
    const mailBody = encodeURIComponent(
        `Dear Placement Cell,\n\nI, ${currentUser.name} (Roll No: ${currentUser.rollNumber}, ${currentUser.course} - ${currentUser.year}), would like to apply for the ${intern.role} internship at ${intern.company}.\n\nPlease find my CV attached.\n\nLinkedIn: [Your LinkedIn URL]\nGitHub: [Your GitHub URL]\nPersonal Email: [Your Personal Email]\n\nRegards,\n${currentUser.name}`
    );

    modalContent.innerHTML = `
        <div class="space-y-5">
            <!-- Role Summary -->
            <div class="bg-gradient-to-r ${intern.color} rounded-xl p-4 text-white">
                <p class="text-white/80 text-sm">${intern.company}</p>
                <p class="text-lg font-bold">${intern.role}</p>
                <p class="text-white/80 text-sm mt-1">${intern.duration} &nbsp;|&nbsp; ${intern.stipend} &nbsp;|&nbsp; ${intern.location}</p>
            </div>

            <!-- Email Instruction -->
            <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <p class="text-sm font-semibold text-indigo-800 mb-1">📧 Send your CV to this college email:</p>
                <p class="text-indigo-700 font-bold text-base break-all">${intern.contactEmail}</p>
                <p class="text-xs text-indigo-500 mt-1">Use your college email ID to send the application.</p>
            </div>

            <!-- Subject Line -->
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p class="text-sm font-semibold text-gray-700 mb-1">📌 Use this Email Subject Line:</p>
                <p class="text-sm text-gray-600 font-mono bg-white border border-gray-200 rounded-lg px-3 py-2">
                    Internship Application: ${intern.role} | ${currentUser.name} | ${currentUser.rollNumber}
                </p>
            </div>

            <!-- Mandatory CV Checklist -->
            <div class="border border-red-200 bg-red-50 rounded-xl p-4">
                <p class="text-sm font-semibold text-red-700 mb-3">⚠️ Your CV must include these — mandatory:</p>
                <div class="space-y-2">
                    <label class="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" id="chk_linkedin" class="w-4 h-4 accent-indigo-600">
                        <span class="text-sm text-gray-700">🔗 <strong>LinkedIn Profile URL</strong> — e.g. linkedin.com/in/yourname</span>
                    </label>
                    <label class="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" id="chk_github" class="w-4 h-4 accent-indigo-600">
                        <span class="text-sm text-gray-700">🐙 <strong>GitHub Profile URL</strong> — e.g. github.com/yourname</span>
                    </label>
                    <label class="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" id="chk_email" class="w-4 h-4 accent-indigo-600">
                        <span class="text-sm text-gray-700">📩 <strong>Personal Email ID</strong> — your personal contact email</span>
                    </label>
                </div>
            </div>

            <!-- Credential URL Box -->
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4">
                <p class="text-sm font-semibold text-indigo-800 mb-2">🔗 Include Your Credential URL in the CV:</p>
                <p class="text-xs text-gray-500 mb-2">Companies can open this link to instantly verify your student info, CGPA &amp; attendance.</p>
                <div class="flex items-center space-x-2">
                    <p class="text-xs font-mono text-indigo-700 bg-white border border-indigo-100 rounded-lg px-3 py-2 flex-1 break-all" id="modalCredUrl">Generating...</p>
                    <button onclick="copyCredentialURL()" class="px-3 py-2 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition-all flex-shrink-0">📋</button>
                </div>
            </div>

            <!-- Open Mail Client Button -->
            <a href="mailto:${intern.contactEmail}?subject=${mailSubject}&body=${mailBody}"
                onclick="return checkInternshipChecklist()"
                class="block w-full text-center py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md">
                📤 Open Email Client to Apply
            </a>

            <p class="text-xs text-center text-gray-400">Clicking the button will open your default email app pre-filled with the subject and a draft body. Attach your CV before sending.</p>
        </div>
    `;

    modal.classList.remove('hidden');
    // Populate credential URL
    setTimeout(() => {
        const el = document.getElementById('modalCredUrl');
        if (el) el.textContent = getCredentialURL();
    }, 0);
}

function checkInternshipChecklist() {
    const linkedin = document.getElementById('chk_linkedin')?.checked;
    const github = document.getElementById('chk_github')?.checked;
    const email = document.getElementById('chk_email')?.checked;
    if (!linkedin || !github || !email) {
        alert('Please confirm all 3 mandatory CV items are included before applying!');
        return false;
    }
    return true;
}


function attachPageEventListeners(page) {
    // This function can be used to attach specific event listeners for each page
}

function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

function openFormModal(formId, formTitle) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = formTitle;

    let formFields = '';

    if (formId === 'report') {
        formFields = `
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" value="${currentUser.name}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                <input type="text" value="${currentUser.rollNumber}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
                    <option value="">Select Report Type</option>
                    <option value="grievance">Grievance / Complaint</option>
                    <option value="ragging">Anti-Ragging Report</option>
                    <option value="harassment">Harassment Report</option>
                    <option value="infrastructure">Infrastructure Issue</option>
                    <option value="academic">Academic Concern</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date of Incident</label>
                <input type="date" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description of Incident</label>
                <textarea class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" rows="4" placeholder="Describe the incident in detail..." required></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Confidentiality</label>
                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="anonymous">Keep Anonymous</option>
                    <option value="disclosed">Disclose My Identity</option>
                </select>
            </div>
        `;
    } else if (formId === 'hostel') {
        formFields = `
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" value="${currentUser.name}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                <input type="text" value="${currentUser.rollNumber}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Application Type</label>
                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
                    <option value="">Select Type</option>
                    <option value="new">New Hostel Admission</option>
                    <option value="room_change">Room Change Request</option>
                    <option value="renewal">Hostel Renewal</option>
                    <option value="vacate">Vacate Hostel</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Room Type Preference</label>
                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
                    <option value="">Select Room Type</option>
                    <option value="single">Single Occupancy</option>
                    <option value="double">Double Sharing</option>
                    <option value="triple">Triple Sharing</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
                    <option value="">Select Duration</option>
                    <option value="1_sem">1 Semester</option>
                    <option value="1_year">1 Academic Year</option>
                    <option value="full_course">Full Course Duration</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input type="tel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="+91 XXXXX XXXXX" required>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Additional Remarks</label>
                <textarea class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" rows="3" placeholder="Any special requirements or remarks..."></textarea>
            </div>
        `;
    } else {
        formFields = `
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" value="${currentUser.name}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                <input type="text" value="${currentUser.rollNumber}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <textarea class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" rows="3" required></textarea>
            </div>
        `;
    }

    modalContent.innerHTML = `
        <form class="space-y-4" onsubmit="submitForm(event, '${formTitle}')">
            ${formFields}
            <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all font-medium">
                Submit Application
            </button>
        </form>
    `;

    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

function submitForm(e, formTitle) {
    e.preventDefault();
    alert(`${formTitle} submitted successfully! You will receive a confirmation email shortly.`);
    closeModal();
}

// Results Page Content
function getResultsContent() {
    const cgpa = (semesterResults.reduce((sum, sem) => sum + sem.sgpa, 0) / semesterResults.length).toFixed(2);

    return `
        <div class="max-w-6xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Previous Semester Results</h1>
                <p class="text-gray-600">View your academic performance across all semesters</p>
            </div>
            
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-indigo-100 mb-1">Cumulative Grade Point Average</p>
                        <p class="text-5xl font-bold">${cgpa}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-indigo-100 mb-1">Total Semesters Completed</p>
                        <p class="text-3xl font-bold">${semesterResults.length}</p>
                    </div>
                </div>
            </div>
            
            <div class="space-y-6">
                ${semesterResults.map((sem, index) => `
                    <div class="bg-white rounded-xl shadow-md overflow-hidden">
                        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-xl font-semibold text-gray-800">${sem.semester}</h3>
                                    <p class="text-sm text-gray-600">Status: <span class="text-green-600 font-medium">${sem.status}</span></p>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm text-gray-600">SGPA</p>
                                    <p class="text-3xl font-bold text-indigo-600">${sem.sgpa}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-6">
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="border-b border-gray-200">
                                            <th class="text-left py-3 px-2 text-sm font-semibold text-gray-700">Code</th>
                                            <th class="text-left py-3 px-2 text-sm font-semibold text-gray-700">Subject</th>
                                            <th class="text-center py-3 px-2 text-sm font-semibold text-gray-700">Credits</th>
                                            <th class="text-center py-3 px-2 text-sm font-semibold text-gray-700">Grade</th>
                                            <th class="text-center py-3 px-2 text-sm font-semibold text-gray-700">Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${sem.subjects.map(subject => `
                                            <tr class="border-b border-gray-100 hover:bg-gray-50">
                                                <td class="py-3 px-2 text-sm font-medium text-gray-700">${subject.code}</td>
                                                <td class="py-3 px-2 text-sm text-gray-800">${subject.name}</td>
                                                <td class="py-3 px-2 text-sm text-center text-gray-600">${subject.credits}</td>
                                                <td class="py-3 px-2 text-center">
                                                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">${subject.grade}</span>
                                                </td>
                                                <td class="py-3 px-2 text-sm text-center font-semibold text-indigo-600">${subject.points}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Performance Analyzer Content
function getPerformanceContent() {
    const uploadedCount = requiredDocuments.filter(doc => doc.uploaded).length;
    const totalCount = requiredDocuments.length;
    const percentage = Math.round((uploadedCount / totalCount) * 100);

    return `
        <div class="max-w-5xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Document Performance Analyzer</h1>
                <p class="text-gray-600">Track your document upload progress</p>
            </div>
            
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 mb-8 text-white">
                <div class="text-center mb-6">
                    <p class="text-indigo-100 text-lg mb-2">Documents Uploaded</p>
                    <p class="text-6xl font-bold mb-2">${uploadedCount}/${totalCount}</p>
                    <p class="text-2xl font-semibold">${percentage}% Complete</p>
                </div>
                
                <div class="w-full bg-indigo-400 rounded-full h-6">
                    <div class="bg-white rounded-full h-6 transition-all duration-500" style="width: ${percentage}%"></div>
                </div>
                
                <div class="mt-6 text-center">
                    ${percentage === 100
            ? '<p class="text-xl">🎉 Excellent! All documents uploaded!</p>'
            : `<p class="text-lg">⚠️ ${totalCount - uploadedCount} documents pending upload</p>`
        }
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">Document Checklist</h3>
                
                <div class="space-y-3">
                    ${requiredDocuments.map(doc => `
                        <div class="flex items-center justify-between p-4 rounded-lg border-2 ${doc.uploaded
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            } hover:shadow-md transition-all">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 rounded-full flex items-center justify-center ${doc.uploaded
                ? 'bg-green-500'
                : 'bg-red-500'
            } text-white text-xl">
                                    ${doc.uploaded ? '✓' : '✗'}
                                </div>
                                <div>
                                    <p class="font-medium text-gray-800">${doc.name}</p>
                                    <p class="text-sm ${doc.uploaded
                ? 'text-green-600'
                : 'text-red-600'
            }">
                                        ${doc.uploaded ? 'Uploaded' : 'Not Uploaded'}
                                    </p>
                                </div>
                            </div>
                            
                            ${!doc.uploaded
                ? `<button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
                                    Upload Now
                                </button>`
                : '<span class="text-green-600 font-medium">Complete</span>'
            }
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Risk Analyzer Content
function getRiskAnalyzerContent() {
    const avgAttendance = Math.round(attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length);
    const lowAttendanceSubjects = attendanceData.filter(s => s.percentage < 75);
    const criticalSubjects = attendanceData.filter(s => s.percentage < 65);

    let riskLevel = 'Low';
    let riskColor = 'green';
    let riskMessage = 'Great job! Your attendance is well above the required threshold.';

    if (avgAttendance < 75) {
        riskLevel = 'High';
        riskColor = 'red';
        riskMessage = 'Critical! Your attendance is below the 75% requirement. Immediate action needed.';
    } else if (avgAttendance < 80) {
        riskLevel = 'Medium';
        riskColor = 'yellow';
        riskMessage = 'Warning! Your attendance is close to the minimum threshold. Please improve.';
    }

    return `
        <div class="max-w-6xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Attendance Risk Analyzer</h1>
                <p class="text-gray-600">Monitor your attendance risk based on 75% requirement</p>
            </div>
            
            <div class="bg-gradient-to-r from-${riskColor}-600 to-${riskColor}-700 rounded-xl shadow-lg p-8 mb-8 text-white">
                <div class="text-center">
                    <div class="text-6xl mb-4">
                        ${riskLevel === 'Low' ? '✅' : riskLevel === 'Medium' ? '⚠️' : '🚨'}
                    </div>
                    <p class="text-xl mb-2 opacity-90">Risk Level</p>
                    <p class="text-5xl font-bold mb-4">${riskLevel}</p>
                    <p class="text-lg mb-6">${riskMessage}</p>
                    
                    <div class="bg-white bg-opacity-20 rounded-lg p-4 inline-block">
                        <p class="text-sm opacity-90">Current Overall Attendance</p>
                        <p class="text-4xl font-bold">${avgAttendance}%</p>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm text-gray-600">Total Subjects</p>
                        <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-3xl font-bold text-gray-800">${attendanceData.length}</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm text-gray-600">Low Attendance</p>
                        <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-3xl font-bold text-yellow-600">${lowAttendanceSubjects.length}</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm text-gray-600">Critical Status</p>
                        <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-3xl font-bold text-red-600">${criticalSubjects.length}</p>
                </div>
            </div>
            
            ${lowAttendanceSubjects.length > 0 ? `
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg class="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        Subjects Requiring Attention
                    </h3>
                    
                    <div class="space-y-4">
                        ${lowAttendanceSubjects.map(subject => {
        const classesNeeded = Math.ceil((75 * subject.total - 100 * subject.attended) / 25);
        return `
                                <div class="p-4 rounded-lg ${subject.percentage < 65
                ? 'bg-red-50 border-2 border-red-200'
                : 'bg-yellow-50 border-2 border-yellow-200'
            }">
                                    <div class="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 class="font-semibold text-gray-800">${subject.subject}</h4>
                                            <p class="text-sm text-gray-600">Current: ${subject.attended}/${subject.total} classes</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-2xl font-bold ${subject.percentage < 65 ? 'text-red-600' : 'text-yellow-600'
            }">${subject.percentage}%</p>
                                        </div>
                                    </div>
                                    
                                    <div class="w-full bg-gray-200 rounded-full h-3 mb-3">
                                        <div class="h-3 rounded-full ${subject.percentage < 65 ? 'bg-red-500' : 'bg-yellow-500'
            }" style="width: ${subject.percentage}%"></div>
                                    </div>
                                    
                                    <div class="flex items-center space-x-2 text-sm">
                                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <span class="text-gray-700">
                                            ${classesNeeded > 0
                ? `Attend next <strong>${classesNeeded}</strong> consecutive classes to reach 75%`
                : 'You are above 75%'
            }
                                        </span>
                                    </div>
                                </div>
                            `;
    }).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="bg-white rounded-xl shadow-md p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
                
                <div class="space-y-3">
                    ${avgAttendance >= 75
            ? `
                            <div class="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                                <div class="text-2xl">✅</div>
                                <div>
                                    <p class="font-medium text-gray-800">Excellent Attendance</p>
                                    <p class="text-sm text-gray-600">Keep up the good work! Your attendance is well above the requirement.</p>
                                </div>
                            </div>
                        `
            : `
                            <div class="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                                <div class="text-2xl">🚨</div>
                                <div>
                                    <p class="font-medium text-gray-800">Immediate Action Required</p>
                                    <p class="text-sm text-gray-600">Your attendance is below 75%. You may not be eligible for exams.</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                                <div class="text-2xl">📝</div>
                                <div>
                                    <p class="font-medium text-gray-800">Contact Your Advisor</p>
                                    <p class="text-sm text-gray-600">Schedule a meeting with your academic advisor to discuss your attendance.</p>
                                </div>
                            </div>
                        `
        }
                    
                    <div class="flex items-start space-x-3 p-4 bg-indigo-50 rounded-lg">
                        <div class="text-2xl">📊</div>
                        <div>
                            <p class="font-medium text-gray-800">Monitor Regularly</p>
                            <p class="text-sm text-gray-600">Check your attendance status weekly to stay on track.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Timetable data
const timetableData = [
    {
        day: 'Monday',
        classes: [
            { time: '09:00 - 10:00', subject: 'Data Structures', room: 'Lab 301', type: 'Lab' },
            { time: '10:00 - 11:00', subject: 'Data Structures', room: 'Lab 301', type: 'Lab' },
            { time: '11:15 - 12:15', subject: 'Database Management', room: 'Room 205', type: 'Lecture' },
            { time: '12:15 - 01:15', subject: 'Computer Networks', room: 'Room 303', type: 'Lecture' },
            { time: '02:00 - 03:00', subject: 'Operating Systems', room: 'Room 401', type: 'Lecture' }
        ]
    },
    {
        day: 'Tuesday',
        classes: [
            { time: '09:00 - 10:00', subject: 'Web Development', room: 'Lab 302', type: 'Lab' },
            { time: '10:00 - 11:00', subject: 'Web Development', room: 'Lab 302', type: 'Lab' },
            { time: '11:15 - 12:15', subject: 'Software Engineering', room: 'Room 204', type: 'Lecture' },
            { time: '12:15 - 01:15', subject: 'Database Management', room: 'Lab 305', type: 'Lab' },
            { time: '02:00 - 03:00', subject: 'Computer Networks', room: 'Room 303', type: 'Tutorial' }
        ]
    },
    {
        day: 'Wednesday',
        classes: [
            { time: '09:00 - 10:00', subject: 'Operating Systems', room: 'Room 401', type: 'Lecture' },
            { time: '10:00 - 11:00', subject: 'Data Structures', room: 'Room 205', type: 'Lecture' },
            { time: '11:15 - 12:15', subject: 'Software Engineering', room: 'Lab 301', type: 'Lab' },
            { time: '12:15 - 01:15', subject: 'Software Engineering', room: 'Lab 301', type: 'Lab' }
        ]
    },
    {
        day: 'Thursday',
        classes: [
            { time: '09:00 - 10:00', subject: 'Computer Networks', room: 'Room 303', type: 'Lecture' },
            { time: '10:00 - 11:00', subject: 'Database Management', room: 'Room 205', type: 'Lecture' },
            { time: '11:15 - 12:15', subject: 'Web Development', room: 'Room 304', type: 'Lecture' },
            { time: '12:15 - 01:15', subject: 'Data Structures', room: 'Room 205', type: 'Tutorial' },
            { time: '02:00 - 03:00', subject: 'Operating Systems', room: 'Lab 303', type: 'Lab' }
        ]
    },
    {
        day: 'Friday',
        classes: [
            { time: '09:00 - 10:00', subject: 'Software Engineering', room: 'Room 204', type: 'Lecture' },
            { time: '10:00 - 11:00', subject: 'Web Development', room: 'Room 304', type: 'Lecture' },
            { time: '11:15 - 12:15', subject: 'Database Management', room: 'Room 205', type: 'Tutorial' },
            { time: '12:15 - 01:15', subject: 'Computer Networks', room: 'Lab 304', type: 'Lab' }
        ]
    }
];

// Timetable Page Content
function getTimetableContent() {
    const dayColors = {
        'Monday': 'indigo',
        'Tuesday': 'purple',
        'Wednesday': 'blue',
        'Thursday': 'green',
        'Friday': 'orange'
    };

    const typeColors = {
        'Lecture': 'bg-blue-100 text-blue-800',
        'Lab': 'bg-green-100 text-green-800',
        'Tutorial': 'bg-purple-100 text-purple-800'
    };

    return `
        <div class="max-w-7xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Weekly Timetable</h1>
                <p class="text-gray-600">Your class schedule for the current semester</p>
            </div>
            
            <div class="space-y-6">
                ${timetableData.map(day => {
        const color = dayColors[day.day];
        return `
                        <div class="bg-white rounded-xl shadow-md overflow-hidden">
                            <div class="bg-gradient-to-r from-${color}-600 to-${color}-700 px-6 py-4">
                                <h3 class="text-xl font-bold text-white">${day.day}</h3>
                                <p class="text-${color}-100 text-sm">${day.classes.length} classes scheduled</p>
                            </div>
                            
                            <div class="p-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    ${day.classes.map(cls => `
                                        <div class="border-l-4 border-${color}-500 bg-gray-50 p-4 rounded-lg hover:shadow-md transition-all">
                                            <div class="flex items-start justify-between mb-2">
                                                <div>
                                                    <p class="font-semibold text-gray-800">${cls.subject}</p>
                                                    <p class="text-sm text-gray-600">${cls.time}</p>
                                                </div>
                                                <span class="px-2 py-1 ${typeColors[cls.type]} rounded-full text-xs font-medium">
                                                    ${cls.type}
                                                </span>
                                            </div>
                                            <div class="flex items-center space-x-2 text-sm text-gray-600">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                </svg>
                                                <span>${cls.room}</span>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
            
            <div class="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Legend</h3>
                <div class="flex flex-wrap gap-4">
                    <div class="flex items-center space-x-2">
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Lecture</span>
                        <span class="text-sm text-gray-600">Theory Classes</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Lab</span>
                        <span class="text-sm text-gray-600">Practical Sessions</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Tutorial</span>
                        <span class="text-sm text-gray-600">Problem Solving</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Student ID Card Content
function getStudentIdContent() {
    const courseCode = currentUser.course.substring(0, 2).toUpperCase();
    const yearCode = currentUser.year.charAt(0);
    const rollHash = currentUser.rollNumber.substring(currentUser.rollNumber.length - 4);
    const studentCode = `${courseCode}${yearCode}-${rollHash}-2026`;
    const barcodeLines = studentCode.split('').filter(c => c !== '-').map((char, i) => {
        const x = i * 20 + 10;
        const width = !isNaN(char) ? 12 : 6;
        return `<rect x="${x}" y="5" width="${width}" height="50" fill="black"/>`;
    }).join('');

    return `
        <div class="max-w-4xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Student ID Card</h1>
                <p class="text-gray-600">Your official student identification</p>
            </div>
            
            <div class="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="flex flex-col items-center">
                        <div class="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white mb-4">
                            <div class="w-28 h-28 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">
                                ${currentUser.initials}
                            </div>
                        </div>
                        <div class="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                            <p class="text-xs text-center">VALID UNTIL 2027</p>
                        </div>
                    </div>
                    
                    <div class="md:col-span-2">
                        <div class="mb-6">
                            <p class="text-indigo-200 text-sm mb-1">University Name</p>
                            <p class="text-2xl font-bold">Tech University</p>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-indigo-200 text-xs mb-1">Student Name</p>
                                <p class="font-semibold">${currentUser.name}</p>
                            </div>
                            <div>
                                <p class="text-indigo-200 text-xs mb-1">Roll Number</p>
                                <p class="font-semibold">${currentUser.rollNumber}</p>
                            </div>
                            <div>
                                <p class="text-indigo-200 text-xs mb-1">Course</p>
                                <p class="font-semibold text-sm">${currentUser.course}</p>
                            </div>
                            <div>
                                <p class="text-indigo-200 text-xs mb-1">Year</p>
                                <p class="font-semibold">${currentUser.year}</p>
                            </div>
                            <div>
                                <p class="text-indigo-200 text-xs mb-1">Email</p>
                                <p class="font-semibold text-sm">${currentUser.email}</p>
                            </div>
                            <div>
                                <p class="text-indigo-200 text-xs mb-1">Student ID Code</p>
                                <p class="font-bold text-lg tracking-wider">${studentCode}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 pt-6 border-t border-indigo-400">
                    <div class="bg-white rounded-lg p-4">
                        <div class="text-center">
                            <p class="text-sm text-gray-600 font-semibold mb-3">Student Identification Barcode</p>
                            <svg class="mx-auto" width="300" height="60" viewBox="0 0 300 60">
                                ${barcodeLines}
                            </svg>
                            <p class="text-center text-sm text-gray-600 font-mono mt-2">${studentCode}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-center space-x-3 mb-3">
                        <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Security Level</p>
                            <p class="font-bold text-gray-800">Verified</p>
                        </div>
                    </div>
                    <p class="text-xs text-gray-500">This ID is digitally verified and secure</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-center space-x-3 mb-3">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Valid Until</p>
                            <p class="font-bold text-gray-800">Dec 2027</p>
                        </div>
                    </div>
                    <p class="text-xs text-gray-500">Please renew before expiry date</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-center space-x-3 mb-3">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Actions</p>
                            <p class="font-bold text-gray-800">Download</p>
                        </div>
                    </div>
                    <button onclick="downloadStudentIdPDF()" class="w-full mt-1 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-all">⬇️ Download PDF</button>
                </div>
            </div>
            
            <!-- Credential URL Section -->
            <div class="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                        </svg>
                    </div>
                    <div class="flex-1">
                        <h3 class="font-bold text-lg mb-1">🔗 Your Credential Verification URL</h3>
                        <p class="text-indigo-100 text-sm mb-4">Share this link in your CV or internship application. Companies can open it to instantly verify your student info, CGPA, and attendance — no login needed.</p>
                        <div class="bg-white/10 rounded-lg px-4 py-3 mb-3 break-all">
                            <p class="text-xs text-indigo-200 mb-1 font-medium">Your Credential URL:</p>
                            <p class="text-sm font-mono text-white" id="credUrlDisplay">Generating...</p>
                        </div>
                        <div class="flex space-x-3">
                            <button id="copyCredBtn" onclick="copyCredentialURL()" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all border border-white/30">📋 Copy URL</button>
                            <button onclick="window.open(getCredentialURL(), '_blank')" class="px-5 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-lg transition-all">👁 Preview</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <div class="flex items-start space-x-3">
                    <svg class="w-6 h-6 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-1">Important Notice</h4>
                        <p class="text-sm text-gray-600">Keep your student ID code confidential. This ID is required for library access, exam entry, and campus facilities. Report any loss or theft immediately to the administration office.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    // Populate the credential URL display after render
    setTimeout(() => {
        const el = document.getElementById('credUrlDisplay');
        if (el) el.textContent = getCredentialURL();
    }, 0);
}

function getStudentIdContent() {
    const courseCode = currentUser.course.substring(0, 2).toUpperCase();
    const yearCode = currentUser.year.charAt(0);
    const rollHash = currentUser.rollNumber.substring(currentUser.rollNumber.length - 4);
    const studentCode = `${courseCode}${yearCode}-${rollHash}-2026`;
    const barcodeLines = studentCode.split('').filter(c => c !== '-').map((char, i) => { const x = i * 20 + 10; const width = !isNaN(char) ? 12 : 6; return `<rect x="${x}" y="5" width="${width}" height="50" fill="black"/>`; }).join('');
    return `<div class="max-w-4xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold text-gray-800 mb-2">Student ID Card</h1><p class="text-gray-600">Your official student identification</p></div><div class="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-2xl shadow-2xl p-8 mb-8 text-white"><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="flex flex-col items-center"><div class="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white mb-4"><div class="w-28 h-28 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">${currentUser.initials}</div></div><div class="bg-white bg-opacity-20 px-4 py-2 rounded-lg"><p class="text-xs text-center">VALID UNTIL 2027</p></div></div><div class="md:col-span-2"><div class="mb-6"><p class="text-indigo-200 text-sm mb-1">University Name</p><p class="text-2xl font-bold">Tech University</p></div><div class="grid grid-cols-2 gap-4"><div><p class="text-indigo-200 text-xs mb-1">Student Name</p><p class="font-semibold">${currentUser.name}</p></div><div><p class="text-indigo-200 text-xs mb-1">Roll Number</p><p class="font-semibold">${currentUser.rollNumber}</p></div><div><p class="text-indigo-200 text-xs mb-1">Course</p><p class="font-semibold text-sm">${currentUser.course}</p></div><div><p class="text-indigo-200 text-xs mb-1">Year</p><p class="font-semibold">${currentUser.year}</p></div><div><p class="text-indigo-200 text-xs mb-1">Email</p><p class="font-semibold text-sm">${currentUser.email}</p></div><div><p class="text-indigo-200 text-xs mb-1">Student ID Code</p><p class="font-bold text-lg tracking-wider">${studentCode}</p></div></div></div></div><div class="mt-6 pt-6 border-t border-indigo-400"><div class="bg-white rounded-lg p-4"><div class="text-center"><p class="text-sm text-gray-600 font-semibold mb-3">Student Identification Barcode</p><svg class="mx-auto" width="300" height="60" viewBox="0 0 300 60">${barcodeLines}</svg><p class="text-center text-sm text-gray-600 font-mono mt-2">${studentCode}</p></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white rounded-xl shadow-md p-6"><div class="flex items-center space-x-3 mb-3"><div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg></div><div><p class="text-sm text-gray-600">Security Level</p><p class="font-bold text-gray-800">Verified</p></div></div><p class="text-xs text-gray-500">This ID is digitally verified and secure</p></div><div class="bg-white rounded-xl shadow-md p-6"><div class="flex items-center space-x-3 mb-3"><div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div><p class="text-sm text-gray-600">Valid Until</p><p class="font-bold text-gray-800">Dec 2027</p></div></div><p class="text-xs text-gray-500">Please renew before expiry date</p></div><div class="bg-white rounded-xl shadow-md p-6"><div class="flex items-center space-x-3 mb-3"><div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg></div><div><p class="text-sm text-gray-600">Actions</p><p class="font-bold text-gray-800">Download</p></div></div><button class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Download ID Card</button></div></div><div class="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg"><div class="flex items-start space-x-3"><svg class="w-6 h-6 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><h4 class="font-semibold text-gray-800 mb-1">Important Notice</h4><p class="text-sm text-gray-600">Keep your student ID code confidential. This ID is required for library access, exam entry, and campus facilities. Report any loss or theft immediately to the administration office.</p></div></div></div></div>`;
}

// ── Notification Functions ──────────────────────────────────────────────────

function toggleNotifications() {
    const panel = document.getElementById('notifPanel');
    panel.classList.toggle('hidden');
    // Hide the red badge once opened
    document.getElementById('notifBadge').classList.add('hidden');

    // Close when clicking outside
    if (!panel.classList.contains('hidden')) {
        setTimeout(() => {
            document.addEventListener('click', closeNotifOnOutside);
        }, 0);
    }
}

function closeNotifOnOutside(e) {
    const panel = document.getElementById('notifPanel');
    const btn = document.getElementById('notifBtn');
    if (panel && !panel.contains(e.target) && !btn.contains(e.target)) {
        panel.classList.add('hidden');
        document.removeEventListener('click', closeNotifOnOutside);
    }
}

function dismissNotif(id) {
    const el = document.getElementById(id);
    if (el) {
        el.style.transition = 'opacity 0.3s';
        el.style.opacity = '0';
        setTimeout(() => {
            el.remove();
            checkNotifEmpty();
        }, 300);
    }
}

function clearAllNotifications() {
    const list = document.getElementById('notifList');
    if (list) {
        list.style.transition = 'opacity 0.3s';
        list.style.opacity = '0';
        setTimeout(() => {
            list.innerHTML = '';
            checkNotifEmpty();
        }, 300);
    }
}

function checkNotifEmpty() {
    const list = document.getElementById('notifList');
    const empty = document.getElementById('notifEmpty');
    if (list && empty) {
        if (list.children.length === 0) {
            empty.classList.remove('hidden');
        }
    }
}

// ── Edit Profile / Photo Upload Functions ──────────────────────────────────

function openEditProfileModal() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = '✏️ Edit Profile';

    const currentPhoto = currentUser.photo
        ? `<img src="${currentUser.photo}" id="photoPreview" class="w-28 h-28 rounded-xl object-cover mx-auto" alt="Current Photo">`
        : `<div id="photoPreview" class="w-28 h-28 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold mx-auto">${currentUser.initials}</div>`;

    modalContent.innerHTML = `
        <div class="space-y-5">
            <!-- Photo Upload -->
            <div class="text-center">
                <div class="mb-3">${currentPhoto}</div>
                <label for="photoInput" class="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all text-sm font-medium">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>Choose Photo from Gallery</span>
                </label>
                <input type="file" id="photoInput" accept="image/*" class="hidden" onchange="previewPhoto(event)">
                <p class="text-xs text-gray-400 mt-2">JPG, PNG or GIF · Max 5MB</p>
            </div>

            <!-- Name -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="editName" value="${currentUser.name}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
            </div>

            <!-- Email (read-only) -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email <span class="text-gray-400 text-xs">(cannot change)</span></label>
                <input type="email" value="${currentUser.email}" disabled class="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm cursor-not-allowed">
            </div>

            <!-- Save Button -->
            <button onclick="saveProfileChanges()" class="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all">
                💾 Save Changes
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
}

function previewPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Please choose an image under 5MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const preview = document.getElementById('photoPreview');
        if (preview) {
            preview.outerHTML = `<img src="${e.target.result}" id="photoPreview" class="w-28 h-28 rounded-xl object-cover mx-auto" alt="Preview">`;
        }
    };
    reader.readAsDataURL(file);
}

function saveProfileChanges() {
    const nameInput = document.getElementById('editName');
    const photoPreview = document.getElementById('photoPreview');

    const newName = nameInput ? nameInput.value.trim() : currentUser.name;
    if (!newName) { alert('Name cannot be empty.'); return; }

    // Get photo if it's an <img> (uploaded)
    let newPhoto = currentUser.photo || null;
    if (photoPreview && photoPreview.tagName === 'IMG') {
        newPhoto = photoPreview.src;
    }

    // Update currentUser
    currentUser.name = newName;
    currentUser.initials = getInitials(newName);
    currentUser.photo = newPhoto;

    // Persist to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Also update in registeredUsers
    const users = getRegisteredUsers();
    const idx = users.findIndex(u => u.email === currentUser.email);
    if (idx !== -1) {
        users[idx] = { ...users[idx], name: newName, initials: currentUser.initials, photo: newPhoto };
        saveRegisteredUsers(users);
    }

    // Update header name
    document.getElementById('headerUserName').textContent = currentUser.name;

    closeModal();
    navigateTo('profile');
}

// ── Download Student ID as PDF ────────────────────────────────────────────────
function downloadStudentIdPDF() {
    const cgpa = (semesterResults.reduce((sum, sem) => sum + sem.sgpa, 0) / semesterResults.length).toFixed(2);
    const avgAttendance = Math.round(attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length);
    const courseCode = currentUser.course.substring(0, 2).toUpperCase();
    const yearCode = currentUser.year.charAt(0);
    const rollHash = currentUser.rollNumber.substring(currentUser.rollNumber.length - 4);
    const studentCode = `${courseCode}${yearCode}-${rollHash}-2026`;
    const credURL = getCredentialURL();
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    const initials = currentUser.initials || currentUser.name.substring(0, 2).toUpperCase();

    const barcodeRects = currentUser.rollNumber.split('').filter(c => c !== '-').map((char, i) => {
        const x = i * 20 + 10;
        const w = !isNaN(char) ? 12 : 6;
        return `<rect x="${x}" y="0" width="${w}" height="50" fill="#1e293b"/>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Student ID Card - ${currentUser.name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; padding: 30px; color: #1e293b; }
        .card { background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 20px; padding: 32px; color: white; margin-bottom: 24px; box-shadow: 0 20px 60px rgba(79,70,229,0.3); }
        .univ { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
        .univ-sub { font-size: 12px; opacity: 0.75; margin-bottom: 24px; }
        .avatar { width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 800; border: 3px solid rgba(255,255,255,0.5); }
        .top-row { display: flex; align-items: center; gap: 24px; margin-bottom: 24px; }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field label { font-size: 10px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.05em; }
        .field p { font-size: 14px; font-weight: 600; margin-top: 2px; }
        .barcode-section { background: white; border-radius: 12px; padding: 16px; margin-top: 24px; text-align: center; }
        .barcode-label { font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 8px; }
        .barcode-code { font-size: 13px; color: #334155; font-family: monospace; margin-top: 6px; }
        .stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .stat-box { background: white; border-radius: 14px; padding: 18px; text-align: center; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
        .stat-val { font-size: 28px; font-weight: 800; }
        .indigo { color: #4f46e5; } .green { color: #16a34a; } .purple { color: #7c3aed; }
        .stat-lbl { font-size: 11px; color: #94a3b8; margin-top: 4px; }
        .cred-box { background: white; border-radius: 14px; padding: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); margin-bottom: 24px; }
        .cred-title { font-size: 13px; font-weight: 700; color: #4f46e5; margin-bottom: 6px; }
        .cred-url { font-size: 10px; color: #334155; font-family: monospace; word-break: break-all; background: #f1f5f9; padding: 10px 12px; border-radius: 8px; }
        .footer { text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px; }
        .badge { display: inline-block; background: #dcfce7; color: #16a34a; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 16px; }
        .print-btn { display: block; margin: 0 auto 24px; padding: 12px 32px; background: #4f46e5; color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 700; cursor: pointer; }
        @media print { .print-btn { display: none; } body { padding: 0; background: white; } @page { margin: 15mm; size: A4; } }
    </style>
</head>
<body>
    <button class="print-btn" onclick="window.print()">🖨️ Save as PDF / Print</button>
    <div class="card">
        <div class="top-row">
            <div class="avatar">${initials}</div>
            <div>
                <div class="univ">Tech University</div>
                <div class="univ-sub">Official Student Identity Card</div>
                <span class="badge">✅ Verified Student</span>
            </div>
        </div>
        <div class="grid2">
            <div class="field"><label>Student Name</label><p>${currentUser.name}</p></div>
            <div class="field"><label>Roll Number</label><p>${currentUser.rollNumber}</p></div>
            <div class="field"><label>Course</label><p>${currentUser.course}</p></div>
            <div class="field"><label>Year</label><p>${currentUser.year}</p></div>
            <div class="field"><label>Email</label><p>${currentUser.email}</p></div>
            <div class="field"><label>Student ID Code</label><p>${studentCode}</p></div>
            <div class="field"><label>Valid Until</label><p>December 2027</p></div>
            <div class="field"><label>Issued On</label><p>${today}</p></div>
        </div>
        <div class="barcode-section">
            <div class="barcode-label">Student Identification Barcode</div>
            <svg width="300" height="50" viewBox="0 0 300 50">${barcodeRects}</svg>
            <div class="barcode-code">${studentCode}</div>
        </div>
    </div>
    <div class="stats">
        <div class="stat-box"><div class="stat-val indigo">${cgpa}</div><div class="stat-lbl">CGPA</div></div>
        <div class="stat-box"><div class="stat-val green">${avgAttendance}%</div><div class="stat-lbl">Attendance</div></div>
        <div class="stat-box"><div class="stat-val purple">${semesterResults.length}</div><div class="stat-lbl">Semesters Passed</div></div>
    </div>
    <div class="cred-box">
        <div class="cred-title">🔗 Credential Verification URL (for Employers)</div>
        <p style="font-size:11px;color:#64748b;margin-bottom:8px;">Companies can open this link to instantly verify this student's authenticity — no login required.</p>
        <div class="cred-url">${credURL}</div>
    </div>
    <div class="footer">
        This is an official document issued by Tech University Student Portal &nbsp;•&nbsp; Generated on ${today}<br>
        For verification, visit the Credential URL above or contact registrar@techuniversity.edu
    </div>
</body>
</html>`;

    // Use Blob URL — avoids popup blocker entirely
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
}


