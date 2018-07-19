var express = require('express');
var router = express.Router();

// TODO(@harrydrippin): Will be replaced with static web page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AI Network Meetup' });
});

module.exports = router;
