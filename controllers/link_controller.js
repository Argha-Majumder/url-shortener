const Link = require('../models/link');
const User = require('../models/user');

// shortening the link and saving it to db
module.exports.shorten = async (req, res) => {
    try {
        let link = await Link.findOne({full: req.body.full});
        if (!link) {
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours()+48); // adding 48 hours validity
            let newLink = await Link.create({full: req.body.full, expiryDate: expiryDate});
            let user = await User.findById(req.user._id);
            user.links.push(newLink);
            await user.save();
            return res.redirect('/');
        }
        return res.redirect('/');
    } catch (err) {
        console.error('Error ** ',err);
        return res.redirect('/');
    }
}

// accessing the link using short url and redirecting to original full url
module.exports.accessLink = async (req, res) => {
    try {
        let link = await Link.findOne({short: req.params.shorten});
        //console.log(link);
        if (link && new Date() <= link.expiryDate) {
            link.clicks++;
            await link.save();
            return res.redirect(link.full);
        } else {
            return res.redirect('/');
        }
    } catch (err) {
        console.error("Error **",err);
        return res.redirect('/');
    }
}

// deleting the link from the db
module.exports.delete = async (req, res) => {
    try {
        let link = await Link.findById(req.params.id);
        if (!link) {
            return res.redirect('/');
        }
        await Link.deleteOne(link);
        return res.redirect('/');
    } catch (err) {
        console.error("Error ** ",err);
        return res.redirect('/');   
    }
}