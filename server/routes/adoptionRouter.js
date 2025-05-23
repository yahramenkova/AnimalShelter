const Router = require('express');
const router = new Router();
const adoptionController = require('../controllers/adoptionController');
const checkRole = require('../middleware/checkRoleMiddleware');

// Пользователь подаёт заявку на усыновление
router.post('/', adoptionController.createRequest);
// Админ меняет статус заявки (подтвердить / отклонить)
router.put('/status', checkRole('ADMIN'), adoptionController.updateStatus);
// Получить все заявки (для админки)
router.get('/all', checkRole('ADMIN'), adoptionController.getAllRequests);

module.exports = router;
