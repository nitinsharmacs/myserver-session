const Session = require('./src/session.js');
const Store = require('./src/store.js');
const MemoryStore = require('./src/memoryStore.js');
const { cookieParser } = require('./src/util/cookieParser.js');
const { generateId } = require('./src/util/idGenerator.js');

const session = () => {
  const memoryStore = new MemoryStore();
  memoryStore.addTable('sessions');

  const store = new Store(memoryStore);

  return (req, res, next) => {
    const { cookie: rawCookies } = req.headers;
    const cookies = cookieParser(rawCookies);

    req.session = new Session(store);
    req.session.saveSession = function (cb) {
      req.session.sessionId = generateId();
      this.save((err) => {
        if (!err) {
          res.setHeader('Set-Cookie', `sessionId=${req.session.sessionId}`);
          return cb(null);
        }
        return cb(err);
      });
    };

    if (cookies.sessionId) {
      store.find(cookies.sessionId, (err, sess) => {
        if (err) {
          return next();
        }

        if (sess) {
          req.session.sessionId = sess.sessionId;
          req.session.userId = sess.userId;
        }

        return next();
      });
    }

    next();
  };
};

module.exports = session;
