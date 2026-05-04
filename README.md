# 💼 Job Portal Web Application

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** web application where companies can post jobs and users can apply for them.  
It allows job seekers to browse available positions, upload resumes, and track their applications — while recruiters can easily manage job postings.

---

## 🚀 Features

### 👨‍💻 For Job Seekers:
- Browse and search available jobs  
- Apply to jobs with resume upload  
- View applied job status  
- Secure authentication & profile management  

### 🏢 For Recruiters:
- Post new job openings  
- View all applications received  
- Manage or delete job posts  

---

## 🛠️ Tech Stack

| Part | Technology |
|------|-------------|
| Frontend | React.js, HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT (JSON Web Token) |
| Environment | dotenv, nodemon |

---

## ⚙️ Folder Structure

```
Job-Portal/
│
├── backend/        # Express + MongoDB backend
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── .env
│
└── frontend/       # React frontend
    ├── src/
    ├── public/
    └── package.json
```

---

## 🧩 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/Job-Portal.git
cd Job-Portal
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` folder:
```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

Run backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🌐 Running the App

- **Frontend:** http://localhost:5173/  
- **Backend:** http://localhost:5000/  
- Make sure both servers are running simultaneously  

---

## 🔒 Environment Variables

| Variable | Description |
|-----------|--------------|
| `MONGO_URI` | MongoDB Atlas Connection String |
| `PORT` | Backend Port Number |
| `JWT_SECRET` | Secret key for token generation |

---

## 🧑‍🎓 Author
**Saurabh Kumar**  
🌐 [GitHub Profile](https://github.com/saurabh0772)

---

## ⭐ Show Your Support
If you liked this project, don’t forget to **star ⭐ the repository!**
