class Store {
  #store;
  constructor(store) {
    this.#store = store;
  }

  insert(session, cb) {
    this.#store.sessions.insert(session);
    cb(null);
  }

  find(sessionId, cb) {
    const session = this.#store.sessions.find(
      { $eq: { sessionId: sessionId } }
    );
    cb(null, session);
  }

  delete(sessionId, cb) {
    this.#store.sessions.delete({ $eq: { sessionId: sessionId } });
    cb(null);
  }
}

module.exports = Store;
