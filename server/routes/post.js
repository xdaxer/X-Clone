import express from 'express';
import { checkToken } from '../utils/token.js';
import { data } from '../database/database.js';
import { insertData, updateData } from '../database/database.js';
import { likePost } from '../utils/post.js';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesFolder = path.join(__dirname, '../database/uploads/images/posts');

if (!fs.existsSync(imagesFolder)) {
  fs.mkdirSync(imagesFolder, { recursive: true });
}

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', checkToken, (req, res) => {
  const userID = req.user.id;

  const posts = [...data.Posts]
    .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))
    .map((post) => {
      const user = data.users.find((u) => u.ID === post.UserID);
      const isLiked = data.Likes.some(
        (like) => like.PostID === post.PostID && like.UserID === userID
      );

      return {
        ...post,
        username: user.username,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        isLiked: isLiked,
      };
    });

  res.json({ Posts: posts });
});
router.post('/users/:username', checkToken, (req, res) => {
  const userID = req.user.id;
  const targetUsername = req.params.username;

  const user = data.users.find((u) => u.username === targetUsername);
  if (!user) {
    return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
  }

  const userPosts = data.Posts.filter((post) => post.UserID === user.ID)
    .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))
    .map((post) => {
      const isLiked = data.Likes.some(
        (like) => like.PostID === post.PostID && like.UserID === userID
      );

      return {
        ...post,
        username: user.username,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        isLiked: isLiked,
      };
    });

  res.json({ Posts: userPosts });
});

router.post(
  '/share',
  checkToken,
  upload.single('PostImage'),
  async (req, res) => {
    const { PostContent } = req.body;
    const { id } = req.user;

    const result = insertData('Posts', {
      UserID: id,
      PostContent,
    });

    const postID = result.lastInsertRowid;

    if (req.file) {
      const filePath = path.join(imagesFolder, `${postID}.jpg`);

      await sharp(req.file.buffer).jpeg({ quality: 80 }).toFile(filePath);

      updateData('Posts', postID, {
        PostImagePath: `/uploads/images/posts/${postID}.jpg`,
      });
    }

    res.json({ message: 'Post atıldı', postID });
  }
);

router.post('/like', checkToken, (req, res) => {
  const { postID } = req.body;
  const userID = req.user.id;

  const result = likePost(userID, postID);

  if (result.success) {
    res.json({
      message: 'Post beğenildi.',
      LikeCount: result.postLikeCount,
    });
  } else {
    res.status(400).json({ message: result.message });
  }
});

export default router;
