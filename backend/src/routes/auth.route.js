const { register, login,getProfile,authenticateToken } = require('../controller/auth.controller');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.post('/register',register)

router.post('/login',login)


router.get('/home', authenticateToken, getProfile);


module.exports = router;
