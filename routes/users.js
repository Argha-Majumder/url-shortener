const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');
const linkController = require('../controllers/link_controller');

router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/'}
), userController.createSession);

router.get('/sign-out', userController.destroySession);
router.post('/shorten', linkController.shorten);
router.get('/:shorten', linkController.accessLink);
router.get('/delete/:id', linkController.delete);

module.exports = router;