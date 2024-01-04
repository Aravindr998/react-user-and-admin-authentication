const express = require('express')
const userController = require('../controllers/userController')
const userMiddleware = require('../middlewares/userMiddleware')
const { authenticateUser } = require('../middlewares/userAuthMiddleware')

const router = express.Router()

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/userdetails', authenticateUser, userController.getUserDetails)
router.patch('/update', authenticateUser, userMiddleware.upload.single('image'), userController.saveImage)
router.get("/test", (req, res) => res.json({key: "value"}))

module.exports = router