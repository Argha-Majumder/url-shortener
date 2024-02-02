const User = require('../models/user');

// get the signup data
module.exports.create = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});
        const {name, email, password } = req.body;
        if (!user) {
            await User.create({name: name, email: email,password: password});
            return res.redirect('/');
        }
        return res.redirect('back');
    } catch (err) {
        console.error('Error ** ',err);
        return res.redirect('back');
    }
}

// sign in and create session for the user
module.exports.createSession = (req, res) => {
    return res.redirect('/');
}

// signing out using passport.js
module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        if (err) {
            return done(err);
        }
    });
    return res.redirect('/');
}