import * as express from 'express';

let router = express.Router();

router.get('/success', (req, res, next) => {
  res.render('success');
});

router.get('/failure', (req, res, next) => {
  res.render('failure');
});

// TODO(@harrydrippin): Will be replaced with static web page.
router.get('/', (req, res, next) => {
  res.render('index');
});

export default router;
