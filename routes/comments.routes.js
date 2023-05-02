const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/route-guard')
const Comment = require('../models/comment.model')
const Employee = require('../models/employee.model')

// Get all comments with author
router.get('/', async(req, res) => {
  try{
    const allComments = await Comment.find().populate('author')
    console.log(req.session)
    res.render("comments", {allComments, user: req.session.user.username})
  } catch (error) {
    console.log(error)
  }

  })

// Create the post in the DB with id from user

  router.post('/', async(req, res, next) => {
    try{
    console.log(req.body, "u are here")
    await Comment.create({content: req.body.content, author: req.session.user._id})
    res.redirect('/comments')
    }catch (error) {
    console.log(error)
    }
  })




module.exports = router;