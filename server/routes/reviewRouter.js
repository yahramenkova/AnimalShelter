const Router = require('express')
const router = new Router()
const reviewConroller = require('../controllers/reviewController')

router.post('/', reviewConroller.create)
router.get('/all', reviewConroller.getAll)


module.exports = router