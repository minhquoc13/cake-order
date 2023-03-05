require('express-async-errors');
require('dotenv').config()

const express = require('express')

const path = require('path')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoDbStore = require('connect-mongo')
const passpport = require('passport')

const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const rfs = require("rotating-file-stream")
const connectDB = require('./src/app/configs/connectDB')

// import middlewares
const notFoundMiddleware = require('./src/app/middlewares/not-found')
const errorHandlerMiddleware = require('./src/app/middlewares/error-handler')

// import route
const route = require('./src/routes/router')

const port = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'
const app = express()

// Session store
let mongoStore = MongoDbStore.create({
    mongooseConnection: mongoose.connection,
    mongoUrl: process.env.MONGO_URI_LOCAL,
    collection: 'sessions'
})

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

// middlewares
app.use(helmet())
const accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: path.join(__dirname, "log")
})
app.use(isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev"))
app.use(cors())
app.use(express.json())

// global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

// route init
route(app)

app.get('/', (req, res) => {
    res.json({ msg: 'Hello' })
})


app.listen(port, async() => {
    try {
        await connectDB(process.env.MONGO_URI_LOCAL)
        console.log(`Connect database successfully!!!`)
        console.log(`App is listening on port ${port}`)
    } catch (error) {
        console.log(error)
    }
})