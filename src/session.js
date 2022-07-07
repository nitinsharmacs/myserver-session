class Session {
  #store;
  constructor(store) {
    this.#store = store;
  }

  save(cb) {
    this.#store.insert({ ...this }, (err) => {
      if (err) {
        return cb(err);
      }
      return cb(null);
    });
  }

  destroy(cb) {
    if (!this.sessionId) {
      return cb(null);
    }

    this.#store.delete(this.sessionId, (err) => {
      if (err) {
        return cb(err);
      }
      return cb(null);
    });
  }
}

module.exports = Session;
