const Router = require('express')
const router = new Router()
const lostAnimalController = require('../controllers/lostAnimalController')

router.post('/', lostAnimalController.create)
router.get('/', lostAnimalController.getLostAnimals)
router.put('/:animal_id', lostAnimalController.updateLostAnimal)


module.exports = router