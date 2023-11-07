const Router = require('express')
const router = new Router()
const recordController = require('../controllers/recordController')

router.post('/', recordController.createRecord)
router.get('/:record_id', recordController.getRecord)
router.put('/:record_id', recordController.updateRecord)

module.exports = router