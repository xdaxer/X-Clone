import { db } from '../database/database.js';function likePost(userId, postId) {
  try {
    db.prepare(`INSERT INTO Likes (UserID, PostID) VALUES (?, ?)`).run(
      userId,
      postId
    );

    db.prepare(
      `UPDATE Posts SET LikeCount = LikeCount + 1 WHERE PostID = ?`
    ).run(postId);

     const post = db
      .prepare('SELECT LikeCount FROM Posts WHERE PostID = ?')
      .get(postId);

    return { success: true, postLikeCount: post.LikeCount };
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, message: 'Zaten like atmışsınız.' };
    }
    return { success: false, message: err.message };
  }
}





export { likePost };
