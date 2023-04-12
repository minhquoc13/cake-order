const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')

function init(passport) {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.googleClientID,
            clientSecret: process.env.googleClientSecret,
            callbackURL: 'http://localhost:3000/google/callback'
        }, function(accessToken, refreshToken, profile, cb) {
            return cb(null, profile)
        }));

    passport.serializeUser(function(user, done) {
        done(null, user)
    })

    passport.deserializeUser(function(user, done) {
        done(null, user)
    })

}

module.exports = init