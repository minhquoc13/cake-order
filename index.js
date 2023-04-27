require('express-async-errors');
require('dotenv').config()

const express = require('express')
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('express-flash')
const mongoose = require('mongoose')
const MongoDbStore = require('connect-mongo')
const passport = require('passport')

//sercurity & log
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const rfs = require("rotating-file-stream")
const connectDB = require('./src/app/configs/connectDB')

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

// Passport config
app.use(passport.initialize())
app.use(passport.session())
    //
require('./src/app/configs/passport')

app.use(flash())

// middlewares
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: path.join(__dirname, "log")
})
app.use(isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev"))
app.use(cors())

// assets
app.use(express.static('./src/public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, 'src/resources/views'))
app.set('view engine', 'ejs')

// global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// route init
route(app)

app.listen(port, async() => {
    try {
        await connectDB(process.env.MONGO_URI_LOCAL)
        console.log(`Connect database successfully!!!`)
        console.log(`App is listening on port ${port}`)
    } catch (error) {
        console.log(error)
    }
})