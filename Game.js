const uuid = require('uuid');

class Game {
  constructor(messages) {
    this.messages = messages;
    this.events = [];
    this.eventsListeners = [];
    this.minTimeout = 10000;
    this.maxTimeout = 120000;
    this.messageCache = 50;
  }

  start(firstMessage) {
    this.pushEvent({ type: this.messages.types[0], message: firstMessage, date: new Date(), id: uuid.v4() });
    this.generateNextEvent();
  }

  generateNextEvent() {
    setTimeout(() => {
      this.pushEvent(this.getRandomEvent());
      if (this.events.length <= this.messageCache) this.generateNextEvent();
    },
      Math.random() * (this.maxTimeout - this.minTimeout) + this.minTimeout,
    );
  }

  pushEvent(event) {
    this.events.push(event);
    this.notifyListeners();
  }

  notifyListeners() {
    const lastEvent = this.getLastEvent();
    console.log(lastEvent.message);
    this.eventsListeners.forEach((c) => c.call(null, lastEvent));
  }

  getRandomEvent() {
    const r = Math.random();
    const type = (r < 0.5) ? this.messages.types[0]
      : (r < 0.9) ? this.messages.types[1]
      : this.messages.types[2];
    const filteredMessages = this.messages.messages.filter(o => o.type === type).map(o => o.message);
    const message = filteredMessages[Math.floor(Math.random() * filteredMessages.length)];

    return { type, message, date: new Date(), id: uuid.v4() };
  }

  getLastEvent() {
    return this.events[this.events.length - 1];
  }

  addEventsListener(callback) {
    this.eventsListeners.push(callback);
  }

  removeEventsListener(callback) {
    this.eventsListeners = this.eventsListeners.filter((c) => c !== callback);
  }

  getEventsFrom(id) {
    const index = this.events.findIndex(o => o.id === id);
    if (index !== -1) return this.events.splice(0, index + 1);
    return this.events;
  }
}

module.exports = Game;
