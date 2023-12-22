const Router = require('express')
const router = new Router()
const educationController = require('../controllers/educationController')

router.get('/all', educationController.getAll)
router.get('/material/:material_id', educationController.getOneMaterial)

module.exports = router