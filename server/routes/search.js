import express from 'express';
import { data } from '../database/database.js';
import { checkToken } from '../utils/token.js';

const router = express.Router();

router.get('/user/', checkToken, (req, res) => {
  const search = req.query.search?.toLowerCase() || 'daxer';

  const filteredUsers = data.users.filter(
    (user) =>
      user.username?.toLowerCase().includes(search) ||
      user.name?.toLowerCase().includes(search)
  );

  console.log(data.users[0]);

  const usersInfo = filteredUsers.map((user) => ({
    id: user.ID,
    username: user.username,
    name: user.name,
    profilePicture: user.profilePicture,
    premiumStatus: user.premiumStatus == 1 ? true : false,
    isAdmin: user.isAdmin == 1 ? true : false,
  }));

  res.json(usersInfo);
});

export default router;
