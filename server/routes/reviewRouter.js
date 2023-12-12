const Router = require('express')
const router = new Router()
const reviewConroller = require('../controllers/reviewController')

router.post('/add', reviewConroller.create)
router.get('/all', reviewConroller.getAll)


module.exports = router