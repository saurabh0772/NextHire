import dotenv from 'dotenv';
dotenv.config();

import express, { application, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
import resumeRoute from './routes/resumeRoute.js';
import interviewRoute from './routes/interviewRoute.js';
import analyticsRoute from './routes/analyticsRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust proxy for secure cookies on Render/Vercel
app.set('trust proxy', 1);

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

//middleware use krna h
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://next-hire-omega-ruby.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];

const corsOptions = {
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};

app.use(cors(corsOptions))

const PORT = process.env.PORT || 8000;

//api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/resume", resumeRoute);
app.use("/api/v1/interview", interviewRoute);
app.use("/api/v1/analytics", analyticsRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running at port ${PORT}`);
});