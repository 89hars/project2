const express = require('express');
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard')
const Comment = require('../models/comment.model')

// Handling of other routes.


// GET home page 
router.get('/', (req, res, next) => {
  res.render('index');
});

// Get to send profile to user only if login is true.

router.get('/profile', isLoggedIn, (req, res, next) => {
  console.log(req.session)
  res.render('profile', { user: req.session.user })
});


 // Log Out linked to a button in differents views.
 router.get('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.clearCookie('connect.sid'); 
    res.redirect('/'); 
  });
});



module.exports = router;


