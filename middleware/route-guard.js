// Middleware function to check for login

const isLoggedIn = (req, res, next) => {
    if (req.session && req.session.user) {
      next(); 
    } else {
      res.redirect('/'); 
    }
  };
  
  // Middleware function to check for logut

  const isLoggedOut = (req, res, next) => {
    if (!req.session || !req.session.user) {
      next(); 
    } else {
      res.redirect('/'); 
    }
  };
  
// Export the middleware functions to other parts of the project
module.exports = {
    isLoggedIn,
    isLoggedOut,
}