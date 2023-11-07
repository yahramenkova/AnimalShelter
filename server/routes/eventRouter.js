const Router = require('express')
const router = new Router()
const eventController = require('../controllers/eventController')

router.post('/', eventController.createEvent)
router.get('/', eventController.getEvent)
router.put('/:event_id', eventController.updateEvent)

module.exports = router