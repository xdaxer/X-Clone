import express from 'express';
import { checkToken } from '../utils/token.js';
import { data } from '../database/database.js';

const router = express.Router();

router.get('/me', checkToken, (req, res) => {
  res.json(req.user);
});

router.get('/:targetUsername', (req, res) => {
  const targetUsername = req.params.targetUsername;
  const targetUser = data.users.find(
    (user) => user.username === targetUsername
  );
  console.log(targetUsername);

  if (targetUser) {
    console.log(targetUser);
    res.json({
      username: targetUser.username,
      userID: targetUser.ID,
      email: targetUser.email,
      name: targetUser.name,
      profilePicture: targetUser.profilePicture,
      bannerImage: targetUser.bannerImage,
      isAdmin: targetUser.isAdmin
    });
  } else {
    res.status(404).json({
      message: 'Kullanıcı Bulunamadı',
      status: res.statusCode,
    });
  }
});

export default router;
