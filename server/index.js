import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import createWebSocketServer from './wsServer.js';
import connection from './db/db.js';
import userRoute from './routes/userRoute.js';
import avatarRoute from './routes/avatarRoute.js';

// Set up environment variables
dotenv.config();

// Database connection
connection();

const app = express();
app.use(morgan("dev"))
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true, // Allow credentials like cookies
};
app.use(cors(corsOptions)); // Use CORS options for development

// API routes
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// Serve static files from frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// Catch-all route to serve the frontend
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'), (err) => {
    if (err) {
      console.error('Error sending file:', err);
    }
  });
});

// Start the server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`Application Running on Port ${port}`));

// Create WebSocket server
createWebSocketServer(server);
