const express = require('express')
const User = require('../models/Employee.model')
const { response } = require('../app')

// Get to client sigup form

router.get('/signup', (req, res, next) => {
    res.render('./auth/signup')
  })

// Post values given by client in the signup form 



// Get to client login form

router.get("./login", (req, res, next) => {
res.render("auth/login")

})

// Post for working with the values inside the DB for login















module.exports = router