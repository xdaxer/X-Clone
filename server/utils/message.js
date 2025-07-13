import { db, insertData } from '../database/database.js';

const sendMessage = (senderID, receiverID, Message, io, data) => {
  const dataInserted = insertData('Messages', {
    SenderID: senderID,
    ReceiverID: receiverID,
    Message: Message,
    Timestamp: new Date().toISOString(),
  });

  const messages = getMessages(senderID);

  if (!data?.users) {
    console.warn('data.users tanımsız!');
    return dataInserted;
  }

  const sender = data.users.find((u) => u.ID === senderID);
  const receiver = data.users.find((u) => u.ID === receiverID);

  if (sender?.socketID) {
    io.to(sender.socketID).emit('NEW_MESSAGE', messages);
  }

  if (receiver?.socketID) {
    io.to(receiver.socketID).emit('NEW_MESSAGE', messages);
  }

  return dataInserted;
};

const getMessages = (UserID) => {
  const query = `
 SELECT
  M.*,
  S.id AS SenderID,
  S.username AS SenderUsername,
  S.name AS SenderName,
  S.profilePicture AS SenderProfileImage,
  S.premiumStatus AS SenderPremiumStatus,
  S.isAdmin AS SenderIsAdmin,
  R.id AS ReceiverID,
  R.username AS ReceiverUsername,
  R.name AS ReceiverName,
  R.profilePicture AS ReceiverProfileImage,
  R.premiumStatus AS ReceiverPremiumStatus,
  R.isAdmin AS ReceiverIsAdmin
FROM Messages M
JOIN users S ON M.SenderID = S.id
JOIN users R ON M.ReceiverID = R.id
WHERE M.SenderID = ? OR M.ReceiverID = ?
ORDER BY M.Timestamp ASC

  `;

  const stmt = db.prepare(query);
  const messages = stmt.all(UserID, UserID);

  return messages;
};

export { sendMessage, getMessages };
