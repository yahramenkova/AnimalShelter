const Router = require('express')
const router = new Router()
const educationController = require('../controllers/educationController')

router.post('/', educationController.create)
router.get('/all', educationController.getAll)
router.get('/material/:material_id', educationController.getOneMaterial)
router.put('/',)

module.exports = router