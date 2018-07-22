import * as express from 'express';
import getDatabase, { SequelizeCustomResult } from '../database';
import { Attendant } from '../models/attendant.model';

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
      profile_pic: user.profile_pic,
    });
  } else {
    res.render('no_user');
  }
});

/**
 * When user submits the ethereum wallet code
 */
router.get('/api/signup', (req, res, next) => {
  const user = req.user;
  const eth = req.query.eth;

  if (user && eth) {
    // updateOrCreate will be safe for race condition with crawler db transaction
    getDatabase().updateOrCreate(Attendant, {
        username: user.username
    }, {
        ethWallet: eth
    }).then((result: SequelizeCustomResult) => {
      const { item, created } = result;

      if (created) {
        console.log("[Signup: %s] Successfully created on DB", item.username);
      } else {
        console.log("[Signup: %s] Already existing user, just updated", user.username);
      }

      res.redirect("/?signup=1");
    }).catch((err) => {
      console.error("[Signup: %s] Error occurred", user.username);
      res.redirect("/?error=1");
    });
  } else {
    // Force to re-submit ethWallet if not available
    res.redirect("/signup");
  }
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
