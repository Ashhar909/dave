const express = require('express')
const router = express.Router();
const {fetchUser} = require('../Middleware/FetchUser')
const UserController = require('../Controllers/UserController')

router.post('/login', UserController.login);
router.post('/register', UserController.regUser);
router.post('/verify', fetchUser, UserController.verifyUser);

module.exports = router;