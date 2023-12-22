const Router = require('express')
const router = new Router()
const recordController = require('../controllers/recordController')
const chekRole = require('../middleware/checkRoleMiddleware')

router.post('/',chekRole('ADMIN'), recordController.createRecord)

module.exports = router