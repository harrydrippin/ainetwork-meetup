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
    console.log("OVERLIMIT", user.overLimit);
    if (user.overLimit) {
      res.render('limitation');
      return;
    }

    Attendant.findOne({
      where: {
        username: user.username
      }
    }).then((attendant) => {
      if (!attendant || attendant.ethWallet == "N/A" || attendant.email == null) {
        res.render('signup', {
          profile_pic: user.profile_pic,
          username: user.username,
          email: user.email,
          name: user.name
        });
      } else {
        res.redirect('/?return=1');
      }
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
  const name = req.query.name;
  const email = req.query.email;
  const phone = req.query.phone;

  if (user && eth && name && email && phone) {
    if (user.overLimit) {
      res.redirect("/signup");
      return;
    }

    // updateOrCreate will be safe for race condition with crawler db transaction
    getDatabase().updateOrCreate(Attendant, {
        username: user.username
    }, {
        ethWallet: eth,
        name: name,
        email: email,
        phone: phone
    }).then((result: SequelizeCustomResult) => {
      const { item, created } = result;

      if (created) {
        console.log("[Signup: %s] Successfully created on DB", item.username);
      } else {
        console.log("[Signup: %s] Already existing user, just updated", user.username);
      }

      // TODO(@harrydrippin): send email and mark to database

      res.redirect("/?signup=1");
    }).catch((err) => {
      console.error("[Signup: %s] Error occurred", user.username);
      console.error(err);
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
