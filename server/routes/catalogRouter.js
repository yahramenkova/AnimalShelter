const Router = require('express')
const router = new Router()
const catalogController = require('../controllers/catalogController')
const chekRole = require('../middleware/checkRoleMiddleware')

router.post('/',chekRole('ADMIN'), catalogController.create)
router.get('/all', catalogController.getAllAnimals)
router.get('/:animal_id',  catalogController.getAnimalById)
router.put('/buy', catalogController.markAnimalAsSold)
router.get('/animal/cat', catalogController.getAllCats)
router.get('/animal/dog', catalogController.getAllDogs)

module.exports = router