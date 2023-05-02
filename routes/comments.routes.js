const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/route-guard')
const Comment = require('../models/comment.model')
const Employee = require('../models/employee.model')


router.get('/', async(req, res) => {
    const allComments = await Comment.find().populate('author')
    console.log(req.session)
    res.render("comments", {allComments, user: req.session.user.username})

  })


  router.post('/', async(req, res, next) => {
    console.log(req.body, "u are here")
    await Comment.create({content: req.body.content, author: req.session.user._id})
    res.redirect('/comments')
  })


module.exports = router;