const Router = require('express')
const router = new Router()
const catalogController = require('../controllers/catalogController')

router.post('/', catalogController.updateAnimal)
router.get('/all', catalogController.getAllAnimals)
router.get('/:animal_id',  catalogController.getAnimalById)
router.put('/buy', catalogController.markAnimalAsSold)
router.get('/animal/cat', catalogController.getAllCats)
router.get('/animal/dog', catalogController.getAllDogs)

module.exports = router