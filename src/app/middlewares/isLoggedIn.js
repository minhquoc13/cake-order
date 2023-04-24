function isLoggedIn(req, res, next) {
    if (req.user) {
        next(); // User is logged in, so proceed to the next middleware function
    } else {
        res.redirect('/login'); // User is not logged in, so redirect to the login page
    }
}

module.exports = isLoggedIn