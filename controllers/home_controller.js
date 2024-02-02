const User = require('../models/user');

// rendering the home page
module.exports.home = async (req, res) => {
    try {
        if (req.user) {
            let user = await User.findById(req.user._id).populate('links');
            //console.log(user.links);
            return res.render('home', {
                title: "Home | URL Shortener",
                user: user
            });
        } else {
            return res.render('home', {
                title: "Home | URL Shortener"
            });
        }
    } catch (err) {
        res.send({message: err.message});
    }
}