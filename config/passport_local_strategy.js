const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
async function (req, email, password, done) {
    try {
        let user = await User.findOne({email: email});

        if (!user || user.password !== password) {
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}
));

passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let userId = await User.findById(id);

    if (!userId) {
        console.log('Error in passport local deserializer');
        return;
    }
    return done(null, userId);
});

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;