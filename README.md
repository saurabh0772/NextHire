# NextHire - Modern Job Portal

A comprehensive, full-stack Job Portal web application built with the MERN stack (MongoDB, Express, React, Node.js). The platform connects job seekers (students) with recruiters, allowing users to find and apply for jobs while empowering recruiters to manage companies, post jobs, and track applications.

## 1. Project Overview
**Purpose:** To streamline the hiring process by providing a unified platform for job seekers and recruiters.
**Target Users:** 
- **Job Seekers (Students):** Can browse jobs, search by categories, apply to jobs, and manage their profiles/resumes.
- **Recruiters (Employers):** Can register their companies, post new job openings, view applicants, and update application statuses (pending, accepted, rejected).

---

## 2. Tech Stack

### Frontend
- **Framework:** React 18 (with Vite)
- **Styling:** Tailwind CSS 4, Tailwind Merge, Tailwind Animate
- **UI Components:** Radix UI, Framer Motion, Embla Carousel, Lucide React
- **State Management:** Redux Toolkit, React Redux, Redux Persist
- **Routing:** React Router DOM (v7)
- **HTTP Client:** Axios
- **Toast Notifications:** Sonner

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **File Uploads:** Multer, Cloudinary
- **Environment Management:** dotenv
- **CORS:** cors

---

## 3. Project Structure

```text
Job Portal/
├── Backend/                    # Node.js + Express backend
│   ├── controllers/            # Logic for handling API requests
│   ├── middlewares/            # Auth, multer, and validation middlewares
│   ├── models/                 # Mongoose schemas (User, Job, Company, Application)
│   ├── routes/                 # Express API routes
│   ├── utils/                  # DB connection and helper functions
│   ├── index.js                # Entry point for the backend server
│   ├── package.json            # Backend dependencies
│   └── .env                    # Backend environment variables
│
└── Frontend/                   # React + Vite frontend
    ├── public/                 # Static assets
    ├── src/                    # React source code
    │   ├── assets/             # Images and icons
    │   ├── components/         # Reusable and page-level React components
    │   │   ├── admin/          # Recruiter/Admin specific components
    │   │   ├── auth/           # Login and Signup components
    │   │   ├── recruiter/      # Recruiter dashboard components
    │   │   ├── shared/         # Common UI components (Navbar, Footer)
    │   │   └── ui/             # Shadcn-like reusable UI elements
    │   ├── hooks/              # Custom React hooks (e.g., fetching data)
    │   ├── lib/                # Utility libraries
    │   ├── redux/              # Redux store, slices, and reducers
    │   ├── utils/              # Helper functions and constants
    │   ├── App.jsx             # Main application router setup
    │   └── main.jsx            # React rendering entry point
    ├── package.json            # Frontend dependencies
    └── vite.config.js          # Vite configuration
```

---

## 4. Pages & Components

### Public / Job Seeker Pages
- **Home (`/`)**: Landing page with Hero Section, Category Carousel, and Latest Jobs.
- **Login (`/login`) & Signup (`/signup`)**: Authentication pages with role selection (Student/Recruiter).
- **Jobs (`/jobs`)**: Job listing page with filtering options.
- **Browse (`/browse`)**: Search and browse jobs by categories or keywords.
- **Profile (`/profile`)**: User dashboard displaying personal details, skills, uploaded resume, and applied jobs table.
- **Job Description (`/description/:id`)**: Detailed view of a specific job with an "Apply" button.

### Recruiter / Admin Pages (Protected)
- **Recruiter Dashboard (`/recruiter`)**: Overview of the recruiter's activities.
- **Companies (`/recruiter/companies` & `/admin/companies`)**: List of registered companies for the recruiter.
- **Company Setup (`/recruiter/companies/create` & `/:id`)**: Forms to register or update company details.
- **Admin Jobs (`/recruiter/jobs` & `/admin/jobs`)**: List of jobs posted by the recruiter.
- **Post Job (`/recruiter/jobs/create` & `/admin/jobs/create`)**: Form to create and publish a new job.
- **Applicants (`/recruiter/jobs/:id/applicants` & `/admin/jobs/:id/applicants`)**: View list of applicants for a specific job and update their status.

---

## 5. Routes (Frontend)

Defined via `react-router-dom` in `App.jsx`.

| Path | Component | Requires Auth? | Role |
|------|-----------|----------------|------|
| `/` | `<Home />` | No | Any |
| `/login` | `<Login />` | No | Any |
| `/signup` | `<Signup />` | No | Any |
| `/jobs` | `<Jobs />` | No | Any |
| `/description/:id` | `<JobDescription />` | No | Any |
| `/browse` | `<Browse />` | No | Any |
| `/profile` | `<Profile />` | Yes | Student |
| `/recruiter` | `<RecruiterDashboard />` | Yes | Recruiter |
| `/recruiter/jobs/create` | `<PostJob />` | Yes | Recruiter |
| `/recruiter/companies` | `<Companies />` | Yes | Recruiter |
| `/recruiter/companies/create` | `<CompanyCreate />` | Yes | Recruiter |
| `/recruiter/companies/:id` | `<CompanySetup />` | Yes | Recruiter |
| `/recruiter/jobs` | `<AdminJobs />` | Yes | Recruiter |
| `/recruiter/jobs/:id/applicants` | `<Applicants />` | Yes | Recruiter |

*(Note: The `/admin/*` routes map to the same components as `/recruiter/*` and act as aliases.)*

---

## 6. API Endpoints (Backend)

Base URL: `/api/v1`

### User Routes (`/user`)
- `POST /register`: Register a new user (handles profile photo/resume upload).
- `POST /login`: Authenticate user and issue JWT cookie.
- `PUT /update-profile`: Update user details (Auth required).
- `GET /logout`: Clear JWT cookie and logout.

### Company Routes (`/company`)
- `POST /register`: Register a new company (Auth required).
- `GET /get`: Get companies created by the logged-in recruiter (Auth required).
- `GET /get/:id`: Get details of a specific company (Auth required).
- `PUT /update/:id`: Update company details, including logo upload (Auth required).
- `GET /past-recruiters`: Fetch list of past top recruiters.

### Job Routes (`/job`)
- `POST /post`: Create a new job posting (Auth required, Recruiter).
- `GET /get`: Get all active jobs (supports query filtering).
- `GET /getadminjobs`: Get all jobs posted by the logged-in recruiter (Auth required).
- `GET /get/:id`: Get detailed info for a specific job.

### Application Routes (`/application`)
- `GET /apply/:id`: Apply for a job (Auth required, Student).
- `GET /get`: Get all jobs applied by the logged-in user (Auth required).
- `GET /:id/applicants`: Get all applicants for a specific job (Auth required, Recruiter).
- `POST /status/:id/update`: Update application status (Pending, Accepted, Rejected) (Auth required, Recruiter).
- `GET /recruiter/all`: Get all applications for the recruiter's jobs (Auth required).

---

## 7. Authentication & Authorization
- **Mechanism:** JWT (JSON Web Tokens) stored in HTTP-only cookies.
- **Roles:**
  - `student`: Can view jobs, apply to jobs, manage profile and resume.
  - `recruiter`: Can manage companies, post jobs, view applicants, and update applicant statuses.
- **Protection:** 
  - Backend uses an `isAuthenticated` middleware that verifies the token.
  - Frontend uses a `<ProtectedRoute />` wrapper for `/recruiter` and `/admin` routes to ensure only authenticated users with the correct role can access them.

---

## 8. Database Models / Schema (MongoDB)

### User Model
- `fullname` (String)
- `email` (String, Unique)
- `phoneNumber` (Number)
- `password` (String, Hashed)
- `role` (String: `student`, `recruiter`)
- `profile`: Includes `bio`, `skills`, `resume` (URL), `resumeOriginalName`, `company` (Ref), `profilePhoto` (URL).

### Company Model
- `name` (String, Unique)
- `description` (String)
- `website` (String)
- `location` (String)
- `logo` (String, URL)
- `userId` (Ref: User) - The recruiter who created the company.

### Job Model
- `title` (String)
- `description` (String)
- `requirements` ([String])
- `salary` (Number)
- `experienceLevel` (Number)
- `location` (String)
- `jobType` (String)
- `position` (Number)
- `company` (Ref: Company)
- `created_by` (Ref: User)
- `applications` ([Ref: Application])

### Application Model
- `job` (Ref: Job)
- `applicant` (Ref: User)
- `status` (String: `pending`, `accepted`, `rejected` - Default: `pending`)

---

## 9. Key Features
- **Role-based Access:** Dedicated workflows for Job Seekers and Recruiters.
- **Job Discovery:** Comprehensive job listings with search, filter (by location, role, salary), and categorization.
- **One-Click Apply:** Students can easily apply to jobs with their saved profiles/resumes.
- **Cloud Storage Integration:** Profile pictures and Resumes are securely uploaded and served via Cloudinary.
- **Recruiter Dashboard:** Centralized hub for recruiters to manage their companies, active job postings, and review candidates.
- **Application Tracking:** Real-time status updates (Pending, Accepted, Rejected) visible to the applicant.
- **State Persistence:** User session and preferences are maintained using Redux Persist.

---

## 10. Environment Variables

Create a `.env` file in the root of both the `Backend` and `Frontend` directories.

**Backend (`Backend/.env`)**
```env
# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string

# JWT Secret Key for Authentication
SECRET_KEY=your_random_secret_key

# Cloudinary Configuration for Image/PDF Uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
PORT=8000
```

**Frontend (`Frontend/.env`)**
```env
# Backend API Base URL
VITE_API_URL=http://localhost:8000/api/v1
```

---

## 11. Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB account/cluster
- Cloudinary account for media storage

### Step-by-step Guide

**1. Clone the repository and navigate to the project directory:**
```bash
# Assuming you have the code downloaded
cd "Job Portal"
```

**2. Backend Setup:**
```bash
cd Backend
npm install
# Set up your .env file here based on the variables above
npm run dev
```
The backend server will start on `http://localhost:8000`.

**3. Frontend Setup:**
```bash
# Open a new terminal
cd Frontend
npm install
# Set up your .env file here based on the variables above
npm run dev
```
The frontend application will start on `http://localhost:5173`.

---

## 12. Deployment

- **Backend:** Designed to be easily deployed on services like Render, Heroku, or Railway. Ensure to set the environment variables in the host dashboard.
- **Frontend:** Can be deployed seamlessly on Vercel or Netlify. The `vite build` command generates the production-ready static files. The current `.env` configuration suggests the backend API might be hosted on Render (`https://job-portal-app-8pst.onrender.com`).

---

## 13. Known Issues / TODOs
- Currently, there are no explicit `TODO` or `FIXME` comments in the main codebase.
- *Potential enhancement:* Implement email notifications for application status updates.
- *Potential enhancement:* Add pagination for job listings and applications to improve performance with large datasets.
