// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)
require('./config/session.config')(app)

// default value for title local
const capitalize = require('./utils/capitalize')
const projectName = 'project2'

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`

// 👇 Start handling routes here

//home
const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)


// log in & sign up
const authRoutes = require("./routes/auth.routes")
const { isLoggedOut, isLoggedIn } = require('./middleware/route-guard')
app.use("/auth", authRoutes)

// Comments
const commentsRoutes = require("./routes/comments.routes")
app.use("/comments", commentsRoutes)
//get allComments

// Checkin & Checkout
const checkRoutes = require("./routes/check.routes")
app.use("/checks", checkRoutes)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app