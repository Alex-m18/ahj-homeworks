const uuid = require('uuid');

class ChatServer {
  constructor() {
    this.users = [];
    this.messages = [];
  }

  getConnectedUsers() {
    return this.users.map((o) => o.name);
  }

  getPreviousMessages(count) {
    if (this.messages.length <= count) return this.messages;
    return this.messages.slice(this.messages.length - count);
  }

  addUser(name) {
    const newLength = this.users.push({
      name,
      id: uuid.v4(),
    });
    return this.users[newLength -1];
  }

  removeUser(id) {
    this.users.splice(this.users.findIndex((o) => o.id === id), 1);
  }

  pushMessage(userID, content) {
    const userName = this.users.find((o) => o.id === userID).name;
    if (!userName) return;
    const length = this.messages.push({
      userName,
      content,
      date: new Date(),
    });
    return this.messages[length - 1];
  }
}

module.exports = ChatServer;
