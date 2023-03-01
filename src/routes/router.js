const authRoute = require('./Auth')
const adminRoute = require('./Admin')
const cakeRoute = require('./Cake')

// middleware
const authenticateUser = require('../middlewares/authentication')

function route(app) {
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/admin', adminRoute)
    app.use('/api/v1/cake', authenticateUser, cakeRoute)
}

module.exports = route