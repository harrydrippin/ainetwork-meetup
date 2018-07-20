import * as express from 'express';

let router = express.Router();

// TODO(@harrydrippin): Will be replaced with static web page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AI Network Meetup' });
});

export default router;
