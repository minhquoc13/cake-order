const express = require('express')
const router = express.Router()
const passport = require('passport')

const { login, register, authFailedCallback, googleAuthCallback, logout } = require('../app/controllers/Auth')

router.get('/register', register)
router.get('/login', login)
router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/failure'
    })
)

router.get('/auth/failure', (req, res) => {
    res.send('Auth with google failure')
})

router.get('/logout', (req, res) => {
    req.logout()
    return res.redirect('/')
})


module.exports = router