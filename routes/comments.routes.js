const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/route-guard')
const Comment = require('../models/comment.model')
const Employee = require('../models/employee.model')
const Event = require('../models/event.model');



router.get('/', async(req, res) => {
    const allComments = await Comment.find().populate('author')
    console.log(req.session)
    res.render("comments", {allComments, user: req.session.user.username})
  })

// Create the post in the DB with id from user

  router.post('/', isLoggedIn, async(req, res, next) => {
    try{
    console.log(req.body, "its working my friend")
    await Comment.create({content: req.body.content, author: req.session.user._id})
    res.redirect('/comments')
    }catch (error) {
    console.log(error)
    }
  })

  /*
  //Delete a comment
  router.post('/delete', isLoggedIn, async(req, res, next) => {
    try{
    console.log(req.body, "its updating")
    await Comment.findByIdAndDelete({content: req.body.content, author: req.session.user._id})
    res.redirect('/delete')
    }catch (error) {
    console.log(error)
    }
  })*/


module.exports = router;