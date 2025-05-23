const { Adoption, AnimalCatalog, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class AdoptionController {
  // 1. Создание заявки
  async createRequest(req, res, next) {
    try {
      const { animal_id, user_id, phone, comment } = req.body;

      // Проверка: животное существует?
      const animal = await AnimalCatalog.findByPk(animal_id);
      if (!animal || animal.status === 'adopted') {
        return next(ApiError.badRequest('Animal is not available for adoption'));
      }

      // Создание заявки
      const adoptionRequest = await Adoption.create({
        user_id,
        animal_id,
        phone,
        comment,
        status: 'pending'
      });

      return res.json(adoptionRequest);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal('Error while creating the adoption request'));
    }
  }

  // 2. Обновление статуса заявки (например, админ подтверждает или отклоняет)
  async updateStatus(req, res, next) {
    try {
      const { adoption_id, status } = req.body;

      const adoption = await Adoption.findByPk(adoption_id);
      if (!adoption) {
        return next(ApiError.notFound('Adoption request not found'));
      }

      if (!['pending', 'approved', 'rejected'].includes(status)) {
        return next(ApiError.badRequest('Недопустимый статус'));
      }

      adoption.status = status;
      await adoption.save();

      // если подтверждено — обновляем статус животного
      if (status === 'approved') {
        const animal = await AnimalCatalog.findByPk(adoption.animal_id);
        if (animal) {
          animal.status = 'adopted';
          await animal.save();
        }
      }

      return res.json({ message: 'Adoption request status updated', adoption });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal('Error while updating the adoption request status'));
    }
  }

  // (опционально) Получить все заявки
  async getAllRequests(req, res, next) {
    try {
      const requests = await Adoption.findAll({
        include: [
          { model: User, attributes: ['email', 'firstName', 'lastName'] },
          { model: AnimalCatalog, attributes: ['name', 'species'] }
        ]
      });
      return res.json(requests);
    } catch (error) {
      return next(ApiError.internal('Error when receiving the list of applications'));
    }
  }
}

module.exports = new AdoptionController();
