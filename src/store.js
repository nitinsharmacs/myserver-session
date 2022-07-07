class Store {
  #store;
  constructor(store) {
    this.#store = store;
  }

  insert(session, cb) {
    this.#store.sessions.insert(session, (err) => {
      if (err) {
        return cb(err);
      }
      return cb(null);
    });
  }

  find(sessionId, cb) {
    this.#store.sessions.find(sessionId, (err, session) => {
      if (err) {
        return cb(err, null);
      }
      return cb(null, session);
    });
  }

  delete(sessionId, cb) {
    this.#store.sessions.delete(sessionId, (err) => {
      if (err) {
        return cb(err);
      }
      return cb(null);
    });
  }
}

module.exports = Store;
