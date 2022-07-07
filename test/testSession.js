const assert = require('assert');
const Session = require('../src/session.js');

describe('Session', () => {

  describe('save', () => {
    it('should save a session into the store', (done) => {
      const sessionId = new Date().getTime();
      const sessionData = { sessionId, userId: 1 };
      let storedSession = {};

      const store = {
        insert: function (session, cb) {
          storedSession = session;
          cb(null);
        }
      };

      const session = new Session(store);

      session.sessionId = sessionId;
      session.userId = 1;
      session.save((err) => {
        if (!err) {
          assert.deepStrictEqual(storedSession, sessionData);
          done();
        }
      });

    });
  });

  describe('destroy', () => {
    it('should destroy session from the store', (done) => {
      const sessionId = new Date().getTime();
      let deletedSessionId = null;

      const store = {
        delete: function (sessionId, cb) {
          deletedSessionId = sessionId;
          cb(null);
        }
      };

      const session = new Session(store);

      session.sessionId = sessionId;
      session.destroy((err) => {
        if (!err) {
          assert.strictEqual(deletedSessionId, sessionId);
          done();
        }
      });
    });
  });
});
