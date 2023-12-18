const Router = require('express')
const router = new Router()
const volunteerController = require('../controllers/volunteerController')
const chekRole = require('../middleware/checkRoleMiddleware')

router.post('/add', volunteerController.createVolunteer)
router.get('/', chekRole('ADMIN'), volunteerController.getAllVolunteers)
router.put('/volunteer_id', volunteerController.updateVolunteer)

module.exports = router