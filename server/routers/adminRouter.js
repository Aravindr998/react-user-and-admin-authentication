const express = require('express')
const adminController = require('../controllers/adminController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const { authenticateUser } = require('../middlewares/userAuthMiddleware')
const { upload } = require('../middlewares/userMiddleware')

const router = express.Router()

router.post('/login', adminController.loginAdmin)
router.get('/users', authenticateUser, adminController.getUserDetails)
router.patch('/users/delete', authenticateUser, adminController.deleteUser)
router.get('/user/:id', authenticateUser, adminController.getUser)
router.put('/user/:id', authenticateUser, upload.single('image'), adminController.updateUser)
router.post('/search', authenticateUser, adminController.searchUser)

module.exports = router