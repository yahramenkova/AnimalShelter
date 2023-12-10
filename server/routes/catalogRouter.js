const Router = require('express')
const router = new Router()
const catalogController = require('../controllers/catalogController')

router.post('/', catalogController.updateAnimal)
router.get('/all', catalogController.getAllAnimals)
router.get('/:animal_id',  catalogController.getAnimalById)


module.exports = router