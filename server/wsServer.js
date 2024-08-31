import { WebSocketServer } from 'ws';  // Correctly import WebSocketServer
import jwt from 'jsonwebtoken';
import { User } from './models/userModel.js';
import Message from './models/messageModel.js';

const createWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (connection, req) => {
    const notifyAboutOnlinePeople = async () => {
      const onlineUsers = await Promise.all(
        Array.from(wss.clients).map(async (client) => {
          const { userId, username } = client;
          const user = await User.findById(userId);
          const avatarLink = user ? user.avatarLink : null;

          return {
            userId,
            username,
            avatarLink,
          };
        })
      );

      Array.from(wss.clients).forEach((client) => {
        client.send(
          JSON.stringify({
            online: onlineUsers,
          })
        );
      });
    };

    connection.isAlive = true;

    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        notifyAboutOnlinePeople();
        console.log('dead');
      }, 1000);
    }, 5000);

    connection.on('pong', () => {
      clearTimeout(connection.deathTimer);
    });

    const cookies = req.headers.cookie;

    if (cookies) {
      const tokenString = cookies
        .split(';')
        .find((str) => str.startsWith('authToken='));

      if (tokenString) {
        const token = tokenString.split('=')[1];
        jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
          if (err) console.log(err);

          const { _id, firstName, lastName } = userData;
          connection.userId = _id;
          connection.username = `${firstName} ${lastName}`;
        });
      }
    }

    connection.on('message', async (message) => {
      const messageData = JSON.parse(message.toString());
      const { recipient, text } = messageData;

      const msgDoc = await Message.create({
        sender: connection.userId,
        recipient,
        text,
      });

      if (recipient && text) {
        Array.from(wss.clients).forEach((client) => {
          if (client.userId === recipient) {
            client.send(
              JSON.stringify({
                sender: connection.username,
                text,
                id: msgDoc._id,
              })
            );
          }
        });
      }
    });

    notifyAboutOnlinePeople();
  });
};

export default createWebSocketServer;
