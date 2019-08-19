const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
//const GithubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true,
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('google', accessToken, profile.id, keys.mongoURI);
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    done(null, existingUser);
                } else {
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });
        },
    ),
);

/*passport.use(
    new GithubStrategy(
        {
            clientID: keys.githubClientID,
            clientSecret: keys.githubClientSecret,
            callbackURL: 'http://127.0.0.1:5000/auth/github/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ githubId: profile.id }).then(existingUser => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    done(null, existingUser);
                } else {
                    new User({ githubId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });
        },
    ),
);

passport.use(
    new LinkedinStrategy(
        {
            clientID: keys.linkedinClientID,
            clientSecret: keys.linkedinClientSecret,
            callbackURL: 'http://127.0.0.1:5000/auth/linkedin/callback',
            scope: ['r_emailaddress', 'r_liteprofile'],
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ linkedinId: profile.id }).then(existingUser => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    done(null, existingUser);
                } else {
                    new User({ linkedinId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });
        },
    ),
);*/
