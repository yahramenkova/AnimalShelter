const Router = require('express')
const router = new Router()
const volunteerActivityController = require('../controllers/volunteerActivityController')

router.post('/', volunteerActivityController.create)
router.get('/', volunteerActivityController.getAll)

module.exports = router