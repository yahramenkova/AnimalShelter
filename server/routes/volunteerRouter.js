const Router = require('express')
const router = new Router()
const volunteerController = require('../controllers/volunteerController')

router.post('/', volunteerController.createVolunteer)
router.get('/', volunteerController.getAllVolunteers)
router.put('/volunteer_id', volunteerController.updateVolunteer)

module.exports = router