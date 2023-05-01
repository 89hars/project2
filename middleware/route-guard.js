//check if user is logged in
const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/login')
    }
    next()
}

// redirecting logged in user to the profile page
const isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/')
    }
    next ()
}

module.exports = {
    isLoggedIn,
    isLoggedOut,
}