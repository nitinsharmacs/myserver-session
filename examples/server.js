const { myServer, Router } = require('myserver');
const session = require('../index.js');

const router = new Router();
const server = myServer(router);

router.use(session());

router.get('/login', (req, res) => {
  if (!req.session.sessionId) {
    req.session.userId = 1212;
    req.session.username = 'nitin';
    req.session.saveSession(() => {
      console.log('saved session');
      res.redirect('/');
    });
    return;
  }

  res.send('you are already logined');
});

router.get('/', (req, res) => {
  console.log(req.session.sessionId);
  console.log(req.session.username);
  res.send('ok');
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
