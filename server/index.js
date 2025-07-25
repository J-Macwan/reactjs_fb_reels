import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// route imports
import authRoutes from './routes/authRoutes.js';
import reelRoutes from './routes/reelRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import userRoutes from './routes/userRoutes.js';

// env config
dotenv.config();

// express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// connect DB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/reels', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Mongo error', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/reels', reelRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

// socket.io
io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('joinReel', (reelId) => {
    socket.join(reelId);
  });

  socket.on('leaveReel', (reelId) => {
    socket.leave(reelId);
  });

  socket.on('sendComment', (comment) => {
    io.to(comment.reelId).emit('newComment', comment);
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });
});

// default route
app.get('/', (_, res) => {
  res.json({ status: 'API running' });
});

// start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));