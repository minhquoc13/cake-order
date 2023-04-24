const User = require('../models/User')
const passport = require('passport')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors')
require('../configs/passport')

const _getRedirectUrl = (req) => {
    return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders'
}

const register = (req, res) => {
    res.render('register')
}

const login = (req, res) => {
        res.render('login')
    }
    // const postRegister = async(req, res) => {
    //     const user = await User.create({...req.body })
    //     const token = user.createJWT()
    //     res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
    // }

// const login = async(req, res) => {
//     const { email, password } = req.body
//     if (!email || !password) {
//         throw new BadRequestError('Please provide email and password')
//     }

//     const user = await User.findOne({ email })
//     if (!user) {
//         throw new UnauthenticatedError('Invalid credentials')
//     }
//     // compare password
//     const isPasswordCorrect = await user.comparePassword(password)
//     if (!isPasswordCorrect) {
//         throw new UnauthenticatedError('Invalid password')
//     }
//     const token = user.createJWT()
//     res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
// }



// const postLogin = async(req, res, next) => {
//     const { email, password } = req.body
//         // validate req
//     if (!email || !password) {
//         req.flash('err', 'All fields are required')
//         return res.redirect('/login')
//     }
//     console.log('1')
//     passport.authenticate('local', (err, user, info) => {
//         console.log('here')
//         if (err) {
//             req.flash('error', info.message)
//             return next(err)
//         }
//         if (!user) {
//             req.flash('error', info.message)
//             return res.redirect('/login')
//         }
//         req.logIn(user, (err) => {
//             if (err) {
//                 req.flash('error', info.message)
//                 return next(err)
//             }
//             return res.redirect(_getRedirectUrl(req))
//         })
//     })
// }

// const getAllUser = async(req, res) => {
//     const users = await User.find({})
//     res.status(StatusCodes.OK).json({ users })
// }

// const getUser = async(req, res) => {
//     const userId = req.params.id
//     const user = await User.findOne({ _id: userId })
//     if (!user) {
//         throw new NotFoundError(`Cant find user with id: ${userId}`)
//     }
//     res.status(StatusCodes.OK).json({ user })
// }

// const updateUser = async(req, res) => {
//     const {
//         body: { name, numberphone },
//         params: { id: userId }
//     } = req
//     if (!name || !numberphone) {
//         throw new BadRequestError('Infomation cannot be empty')
//     }
//     const user = await User.findOneAndUpdate({
//             _id: userId,
//         },
//         req.body, {
//             new: true,
//             runValidators: true
//         }
//     )
//     if (!user) {
//         throw new NotFoundError(`No user with id: ${userId}`)
//     }
//     res.status(StatusCodes.OK).json({ user })
// }

// const deleteUser = async(req, res) => {
//     const {
//         params: { id: userId }
//     } = req
//     const user = await User.findOneAndRemove({ _id: userId })
//     if (!user) {
//         throw new NotFoundError(`No user with id ${userId}`)
//     }
//     res.status(StatusCodes.OK).json({ msg: `Delete successfully user with id: ${userId}` })
// }


const googleAuthCallback = (req, res) => {
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/failure'
    })
    next()
}

const authFailedCallback = (req, res) => {
    res.send('auth with google failure')
}

const logout = (req, res) => {
    req.logout()
    return res.redirect('/')
}

module.exports = { register, login, googleAuthCallback, authFailedCallback, logout }