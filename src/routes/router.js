const authRoute = require('./Auth')
const adminRoute = require('./Admin')

function route(app) {
    app.use('/auth', authRoute)
    app.use('/admin', adminRoute)
}

module.exports = route