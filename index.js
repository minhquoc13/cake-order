const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const rfs = require("rotating-file-stream")
const dotenv = require('dotenv')
const path = require('path')
const connectDB = require('./src/configs/connectDB')

// import middlewares
const notFound = require('./src/middlewares/not-found')
const errorHandlerMiddleware = require('./src/middlewares/error-handler')

// import route
const route = require('./src/routes/router')

dotenv.config()

const port = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'
const app = express()

//
app.use(helmet())

const accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: path.join(__dirname, "log")
})

app.use(isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev"))
app.use(cors())
app.use(express.json())

// route init
route(app)

app.get('/', (req, res) => {
    res.json({ msg: 'Hello' })
})

// middlewares
app.use(errorHandlerMiddleware)
app.use(notFound)

app.listen(port, async() => {
    try {
        await connectDB(process.env.MONGO_URI_LOCAL)
        console.log(`Connect database successfully!!!`)
        console.log(`App is listening on port ${port}`)
    } catch (error) {
        console.log(error)
    }
})