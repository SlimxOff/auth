const Router = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const userController = require('../controllers/user-controller')
const router = new Router()
const {body} = require('express-validator')


router.post('/registration',
    body('password').isLength({min:3,max:32}),
    body('email').isEmail(),
    userController.registration)
router.post('/login',userController.login)
router.post('/logout',userController.logout)
router.get('/activate/:link',userController.activate)
router.get('/refresh',userController.refresh)
router.get('/users',authMiddleware,userController.getUsers)


module.exports = router