const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/route-guard')
const Comment = require('../models/comment.model')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* Get Profile */

router.get('/profile', isLoggedIn, (req, res, next) => {
  console.log(req.session)
  res.render('profile', { user: req.session.user })
});







module.exports = router;


