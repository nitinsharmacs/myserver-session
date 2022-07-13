const session = require('../index.js');
const assert = require('assert');

class HandleArgs {
  constructor(headers = {}) {
    this.nextCalled = 0;
    this.req = {
      headers
    };
    this.res = {
      headers: {},
      setHeader: function (name, value) {
        this.headers[name.toLowerCase()] = value;
      }
    };
  }

  getArgs() {
    return [this.req, this.res, this.next.bind(this)];
  }

  getReq() {
    return this.req;
  }

  getRes() {
    return this.res;
  }

  next() {
    this.nextCalled++;
  }

  nextCalls() {
    return this.nextCalled;
  }
}

describe('session', () => {
  const handlerArgs = new HandleArgs();

  const sessionHandler = session();
  sessionHandler(...handlerArgs.getArgs());

  const req = handlerArgs.getReq();

  let sessionId;

  before(done => {
    req.session.saveSession(() => {
      sessionId = req.session.sessionId;
      done();
    });
  });

  it('should inject session if session present', () => {
    const handlerArgs = new HandleArgs({
      'cookie': 'sessionId=' + sessionId
    });

    sessionHandler(...handlerArgs.getArgs());

    assert.ok(req.session.sessionId);
    assert.ok(handlerArgs.nextCalls() === 1);
  });

  it('should inject empty session in req', () => {
    const handlerArgs = new HandleArgs();

    const sessionHandler = session();
    sessionHandler(...handlerArgs.getArgs());

    assert.ok(handlerArgs.getReq().session);
    assert.ok(handlerArgs.nextCalls() === 1);
  });
});

describe('session save', () => {
  it('should save the session', (done) => {
    const handlerArgs = new HandleArgs();

    const sessionHandler = session();
    sessionHandler(...handlerArgs.getArgs());

    const req = handlerArgs.getReq();
    const res = handlerArgs.getRes();

    req.session.saveSession(() => {
      assert.ok(res.headers['set-cookie']);
      assert.ok(handlerArgs.nextCalls() === 1);
      done();
    });
  });
});

describe('session destroy', () => {
  it('should destroy the session', (done) => {
    const handlerArgs = new HandleArgs();

    const sessionHandler = session();
    sessionHandler(...handlerArgs.getArgs());

    const req = handlerArgs.getReq();
    const res = handlerArgs.getRes();

    req.session.destroySession(() => {
      assert.ok(res.headers['set-cookie']);
      assert.ok(handlerArgs.nextCalls() === 1);
      done();
    });
  });
});
