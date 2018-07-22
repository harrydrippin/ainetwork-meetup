import * as express from 'express';

let router = express.Router();

/**
 * When user succeed to authorize
 */
router.get('/signup', (req, res, next) => {
  const user = req.user;

  if (user) {
    res.render('signup', {
      username: user.username,
      email: user.email,
      profile_pic: user.avatar_url,
    });
  } else {
    res.render('no_user');
  }
});

/**
 * When user submits the ethereum wallet code
 */
router.post('/signup', (req, res, next) => {

});

/**
 * When user fails to authorize
 */
router.get('/failure', (req, res, next) => {
  res.render('failure');
});

/**
 * Index page
 */
router.get('/', (req, res, next) => {
  // TODO(@harrydrippin): Will be replaced with static web page.
  res.render('index');
});

export default router;
