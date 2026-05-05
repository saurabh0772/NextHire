# NextHire - AI-Powered Job Portal

A modern, full-stack Job Portal web application built with the MERN stack (MongoDB, Express, React, Node.js). NextHire connects job seekers with top recruiters and features a premium Enterprise Glassmorphism UI, light/dark mode support, and cutting-edge Gemini AI integrations to help candidates prepare for their dream jobs.

---

## 🚀 Key Features

### 🎨 Premium Enterprise UI/UX
- **Glassmorphism Aesthetic:** A stunning, highly-polished user interface built with Tailwind CSS, featuring subtle blur effects, gradients, and modern card layouts.
- **Light & Dark Mode:** Full support for system-preference or manual toggling between a crisp light mode and a deep, rich indigo/slate dark mode.
- **Responsive Design:** Completely optimized for mobile, tablet, and desktop viewing.

### 🤖 AI-Powered Suite (Google Gemini)
- **AI Interview Preparation Chatbot:** An integrated, context-aware AI interviewer that reads a candidate's resume and the job description to conduct a mock interview. It evaluates responses, provides actionable feedback, and gives a final performance score.
- **AI Resume Parser:** Automatically extracts key skills, experience, and details from uploaded PDFs to streamline the profile creation process.

### 👨‍🎓 For Job Seekers (Candidates)
- **Job Discovery:** Browse, search, and filter job listings by location, role, and salary.
- **One-Click Apply:** Apply to jobs instantly using saved profiles and uploaded resumes.
- **Profile Management:** Manage personal details, track applied jobs, and store resumes securely in the cloud.

### 🏢 For Employers (Recruiters)
- **Modern Dashboard:** A centralized, SaaS-style hub to manage companies and job postings.
- **Company Management:** Register new companies with logos and detailed descriptions.
- **Job Posting:** Create detailed job listings with requirements, salary ranges, and experience levels.
- **Applicant Tracking System (ATS):** Review candidates in clean data tables, view their resumes, and seamlessly update their shortlisting status (Accepted/Rejected).

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 (with Vite)
- **Styling:** Tailwind CSS (Custom Indigo/Violet Theme)
- **UI Components:** Radix UI, Framer Motion, Lucide React
- **State Management:** Redux Toolkit, React Redux, Redux Persist
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Notifications:** Sonner

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **File Uploads:** Multer, Cloudinary (PDFs & Images)
- **AI Integration:** `@google/genai` (Gemini 2.0 Flash)

---

## 📂 Project Structure

```text
NextHire/
├── Backend/                    # Node.js + Express backend
│   ├── controllers/            # API logic (auth, jobs, AI parsing)
│   ├── middlewares/            # Auth, multer, and validation
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # Express API routes
│   ├── utils/                  # DB connection, AI logic (resumeParser.js, interviewAI.js)
│   ├── index.js                # Entry point
│   └── package.json            # Backend dependencies
│
└── Frontend/                   # React + Vite frontend
    ├── public/                 # Static assets (favicon.svg)
    ├── src/                    # React source code
    │   ├── components/         # Reusable React components
    │   │   ├── admin/          # Recruiter/Admin dashboard views
    │   │   ├── auth/           # Login and Signup
    │   │   ├── recruiter/      # Recruiter entry points
    │   │   ├── shared/         # Navbar, Footer, AI Chatbot, Resume Parser
    │   │   └── ui/             # Shadcn-like reusable UI elements
    │   ├── redux/              # Redux store and slices
    │   ├── App.jsx             # Main application router setup
    │   └── index.css           # Global Tailwind and custom CSS variables
    └── package.json            # Frontend dependencies
```

---

## ⚙️ Environment Variables

Create a `.env` file in both the `Backend` and `Frontend` directories.

**Backend (`Backend/.env`)**
```env
# Server
PORT=8000
FRONTEND_URL=http://localhost:5173

# Database & Auth
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key

# Cloudinary (Resumes & Logos)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI Features
GEMINI_API_KEY=your_google_gemini_api_key
```

**Frontend (`Frontend/.env`)**
```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## 🚀 Setup & Installation

**1. Clone the repository:**
```bash
git clone https://github.com/saurabh0772/NextHire.git
cd NextHire
```

**2. Backend Setup:**
```bash
cd Backend
npm install
# Ensure .env is configured
npm run dev
```
*Server runs on `http://localhost:8000`*

**3. Frontend Setup:**
```bash
# Open a new terminal
cd Frontend
npm install
# Ensure .env is configured
npm run dev
```
*App runs on `http://localhost:5173`*

---

## 🔐 Authentication & Roles
- **Candidates (`student`):** Access job boards, profile settings, AI mock interviews, and application tracking.
- **Employers (`recruiter`):** Access the secure recruiter dashboard to manage companies, post jobs, and process applicants.
- **Protection:** JWT tokens are securely stored in HTTP-only cookies.

---

*Built with ❤️ for the modern job market.*
