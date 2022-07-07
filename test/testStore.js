const assert = require('assert');
const Store = require('../src/store.js');

describe('Store', () => {
  describe('insert', () => {
    it('should insert a new session into the store', (done) => {
      const sessionId = new Date().getTime();
      const session = { sessionId, userId: 1 };
      let storedSession = {};

      const memoryStore = {
        sessions: {
          insert: function (session) {
            storedSession = session;
          }
        }
      };

      const store = new Store(memoryStore);
      store.insert(session, () => {
        assert.deepStrictEqual(storedSession, session);
        done();
      });
    });
  });

  describe('find', () => {
    it('should find a session from the store by session id', (done) => {
      const sessionId = new Date().getTime();
      const sessions = [{ sessionId, userId: 1 }];
      let querySessionId = null;
      const memoryStore = {
        sessions: {
          find: function (query) {
            querySessionId = query['$eq']['sessionId'];
            return sessions[querySessionId];
          }
        }
      };

      const store = new Store(memoryStore);
      store.find(sessionId, (err, session) => {
        assert.deepStrictEqual(session, session);
        assert.strictEqual(querySessionId, sessionId);
        done();
      });
    });

    it('should return nothing if no session found', (done) => {
      const sessionId = new Date().getTime();
      const sessions = [];

      let querySessionId = null;
      const memoryStore = {
        sessions: {
          find: function (query) {
            querySessionId = query['$eq']['sessionId'];
            return sessions[0];
          }
        }
      };

      const store = new Store(memoryStore);
      store.find(sessionId, (err, session) => {
        assert.deepStrictEqual(session, session);
        assert.strictEqual(querySessionId, sessionId);
        done();
      });
    });
  });

  describe('delete', () => {
    it('should delete session of given id from the store', (done) => {
      const sessionId = new Date().getTime();
      let sessions = [
        { sessionId, userId: 1 },
        { sessionId: 1212, userId: 2 }
      ];
      const updatedSessions = [{ sessionId: 1212, userId: 2 }];

      let querySessionId = null;
      const memoryStore = {
        sessions: {
          delete: function (query) {
            querySessionId = query['$eq']['sessionId'];
            sessions = sessions.filter(sess => sess.sessionId !== sessionId);
          }
        }
      };

      const store = new Store(memoryStore);
      store.delete(sessionId, () => {
        assert.deepStrictEqual(sessions, updatedSessions);
        assert.strictEqual(querySessionId, sessionId);
        done();
      });
    });
  });
});
