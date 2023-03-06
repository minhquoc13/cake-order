const authRoute = require('./Auth')
const adminRoute = require('./Admin')
const cakeRoute = require('./Cake')
const cartRoute = require('./Cart')
const orderRoute = require('./Order')
const errorHandlerMiddleware = require('../app/middlewares/error-handler')
const notFoundRoute = require('../app/middlewares/not-found')

// middleware
const authenticateUser = require('../app/middlewares/authentication')

function route(app) {
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/admin', adminRoute)
    app.use('/api/v1/cake', authenticateUser, cakeRoute)
    app.use('/api/v1/cart', cartRoute)
    app.use('/api/v1/order', orderRoute)

    // middleware
    app.use(errorHandlerMiddleware)
    app.use(notFoundRoute)
}

module.exports = route