import * as express from 'express';
import * as config from '../config';
import AuthManager from '../auth';

let router = express.Router();

// TODO(@harrydrippin): Will be replaced with static web page.
router.get('/', (req, res, next) => {
  res.render('index', { title: 'AI Network Meetup' });
});

router.get(config.GITHUB_AUTH!, AuthManager.getAuthenticateLogic());

router.get(config.GITHUB_CALLBACK!, AuthManager.getCallbackLogic(), (req, res) => {
  // After onAuthSuccess: do some user flow logic
  // TODO(@harrydrippin): Should discuss the user flow, just redirect to home for now
  res.redirect("/");
});

export default router;
