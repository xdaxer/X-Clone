import { verifyToken } from './utils/token.js';
import { data, loadData } from './database/database.js';
import { sendMessage, getMessages } from './utils/message.js';

function socket(io) {
  io.on('connection', (socket) => {
    console.log('Birisi bağlandı:', socket.id);
    loadData(); 

    socket.on('data', (data) => {
      console.log('Alınan veri:', data);
    });

    socket.on('GETsocketID', (user) => {
      const userInfo = verifyToken(user.token);

      if (userInfo.verify) {
        const userID = userInfo.user.id;
        const targetUser = data.users.find((u) => u.ID === userID);

        if (targetUser) {
          targetUser.socketID = socket.id;
          console.log(
            `${targetUser.username} bağlandı. Socket ID: ${socket.id}`
          );
          socket.userID = userID;
        }
      }
    });

    socket.on('PRIVATE_MESSAGE', ({ toUserID, message }) => {
      if (socket.userID) {
        const receiver = data.users.find((u) => u.ID === toUserID);

        const savedMessage = sendMessage(
          socket.userID,
          toUserID,
          message,
          io,
          data
        );

        if (savedMessage && receiver) {
          io.to(receiver.socketID).emit('PRIVATE_MESSAGE', {
            from: socket.userID,
            message,
          });

          console.log('Gönderildi:', {
            from: socket.userID,
            message,
          });
        }
      }
    });

    socket.on('GET_CHAT_HISTORY', (callback) => {
      loadData();
      if (!socket.userID) return callback([]);
      const history = getMessages(socket.userID);
      callback(history);
    });

    socket.on('disconnect', () => {
      console.log(`Birisi çıktı: ${socket.id}`);
    });
  });
}

export default socket;
