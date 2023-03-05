const authRoute = require('./Auth')
const adminRoute = require('./Admin')
const cakeRoute = require('./Cake')
const errorHandlerMiddleware = require('../middlewares/error-handler')
const notFoundRoute = require('../middlewares/not-found')

// middleware
const authenticateUser = require('../middlewares/authentication')

function route(app) {
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/admin', adminRoute)
    app.use('/api/v1/cake', authenticateUser, cakeRoute)
    app.use(errorHandlerMiddleware)
    app.use(notFoundRoute)
}

module.exports = route