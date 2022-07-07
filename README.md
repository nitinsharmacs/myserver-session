## myserver-session

Session management system for myserver.

``` js
const { myserver, Router } = require('myserver');
const session = require('myserver-session');

const router = new Router();
const server = myServer(router);

router.use(session({cookie: {'maxAge': 2343}}));

router.use((req, res) => {
  console.log(req.session);
});

router.use((req, res, next) => {
  if (req.session.logined) {
    return next();
  }
  res.redirect('/login');
});

router.post('/login', (req, res) => {
  const {username} = req.body;
  if (userDb.exists(username)) {
    req.session.logined = true;
    req.session.saveSession((err) => {
      if (err) {
        return res.redirect('/login');
      }
    });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroySession((err)  => {
    if (err) {
      console.log('some error occured');
    }

    res.send('you are logged out');
  });
});
```

## Installation

This node module can be installed using npm

```console
$ npm install https://github.com/nitinsharmacs/myserver-session
```

## Example

  To view the example, clone the myserver repo and install the dependencies:

```console
$ git clone git://github.com/nitinsharmacs/myserver-session
$ cd myserver-session
$ npm install
```

```console
$ node examples/server.js
```

### Running Tests

To run tests, install the mocha dependancy and run the tests:

```console
$ npm install mocha
$ npm test
```
