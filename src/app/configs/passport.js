const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async(email, password, done) => {
        // login 
        // check if email exists
        const user = await User.findOne({ email: email })
        if (!user) {
            return done(null, false, { msg: 'No user with this email' })
        }

        User.comparePassword(password).then(match => {
            if (match) {
                return (done, null, { msg: 'Logged in successfully' })
            }
            return done(null, false, { msg: 'Wrong username or password' })
        }).catch(err => {
            return done(null, false, { msg: 'Something went wrong' })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })

}

module.exports = init