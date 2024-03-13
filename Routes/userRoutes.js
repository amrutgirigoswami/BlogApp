const express = require('express');
const { getAllUsers, RegisterController, LoginController } = require('../Controllers/UserController');

const router = express.Router()

router.get('/all-users', getAllUsers)

router.post('/register', RegisterController)

router.post('/login', LoginController)

module.exports = router;