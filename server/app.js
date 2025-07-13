import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { insertData, loadData } from './database/database.js';
import { data } from './database/database.js';
import { Server } from 'socket.io';
import RegisterPage from './routes/register.js';
import LoginPage from './routes/login.js';
import ProfilePage from './routes/profile.js';
import Post from './routes/post.js';
import CheckToken from './routes/checkToken.js';
import socket from './socket.js';
import { getMessages, sendMessage } from './utils/message.js';
import Search from './routes/search.js';
import cdn from './routes/cdn.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {},
});

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10000,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

app.use(express.json());
app.use(cors());
app.use(limiter);

//? Routes
app.use('/register', RegisterPage);
app.use('/login', LoginPage);
app.use('/profile', ProfilePage);
app.use('/post', Post);
app.use('/check', CheckToken);
app.use('/search', Search);
app.use('/cdn', cdn);

app.get('/', (req, res) => {
  loadData();
  res.json({
    message: data.users,
  });
});

app.get('/test', (req, res) => {
  sendMessage(351148, 482383, 'test mesajı');
  const messages = getMessages(351148, 482383);
  res.json({ Messages: messages });
});

app.get('/deneme', (req, res) => {
  insertData('Users', {
    username: 'Username',
    name: 'Name',
    password: 'Password',
    email: 'Email',
    profilePicture: `https://randomuser.me/api/portraits/men/31.jpg`,
  });
  loadData();
  res.json({
    message: data.users,
  });
});

//? Socket
socket(io);

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
