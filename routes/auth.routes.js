const express = require('express')
const Employee = require('../models/employee.model')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const { isLoggedOut, isLoggedIn } = require('../middleware/route-guard')
const saltRounds = 10

const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/

/* Here are the routes for the SignUp and the LogIn being handle, all of this routes are pass trough the MiddleWare
checking if the conditions on the value of the log */


// Get the signup form for the client

router.get('/signup', isLoggedOut, (req, res, next) => {
    res.render('Auth/signup')
  })

/* Post values given by client in the signup form. Here the password will recive a predeterminated number of random
strings and will be hashed, also the quality of the password is determinated by the regex, and the username is check
in the DB*/

router.post('/signup', isLoggedOut, async (req, res, next) => {
   
  try {
 const newSignup = await Employee.findOne({username: req.body.username})
 console.log(newSignup)

  if(!newSignup) {
    if(pwdRegex.test(req.body.password)) {
      const salt = bcryptjs.genSaltSync(saltRounds)
      const passwordHash = bcryptjs.hashSync(req.body.password, salt)
      
      await Employee.create({username: req.body.username, passwordHash: passwordHash})
      console.log("New employee", newSignup)
      res.redirect('/login')

    } else {
      res.render('Auth/signup', {errorMessage: "Password should be stronger! Must contain at least 8 characters, one upper case letter and a symbol.", data: {username: req.body.username}})
    }
  } else {
    res.render('Auth/signup', {errorMessage: "User name already exists"})
  }

  } catch (error) {
    console.log(error)
  }
})

// Get the login form for the User

router.get('/login', isLoggedOut, (req, res, next) => {
  console.log(__dirname);
    res.render('Auth/login')
})

/* Post for working with the values inside the DB for login. Here the encypted password is matched with the hashed
 password that are existing in the DB, this way we can't give a false value. */


router.post('/login', isLoggedOut, async (req, res, next) => {
  try {
    const user = await Employee.findOne({ username: req.body.username })
    console.log(user)
    if (!!user) {
 
      if (bcryptjs.compareSync(req.body.password, user.passwordHash)) {
       
        req.session.user = { username: user.username, _id:user._id  }
        res.redirect('/profile')
      } else {
        
        res.render('Auth/login', { errorMessage: 'Wrong password' })
      }
    } else {
      
      res.render('Auth/login', { errorMessage: 'User does not exists' })
    }
  } catch (error) {
    console.log(error)
  }
});


module.exports = router