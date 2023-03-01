const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const rfs = require("rotating-file-stream")
const dotenv = require('dotenv')
const path = require('path')
const connectDB = require('./src/configs/connectDB')

dotenv.config()

const port = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'
const app = express()

app.use(helmet())

const accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: path.join(__dirname, "log")
})

app.use(isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev"))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ msg: 'Hello' })
})

const router = require('./src/routes/router')
app.use('/api/v1/', router)

app.listen(port, () => {
    try {
        connectDB(process.env.MONGO_URI)
        console.log(`Connect database successfully!!!`)
        console.log(`App is listening on port ${port}`)
    } catch (error) {
        console.log(error)
    }
})