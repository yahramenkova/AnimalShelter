const uuid = require('uuid')
const path = require('path');
const { LostAnimal } = require('../models/models');
const ApiError = require('../error/ApiError');

class LostAnimalController {
    async create(req, res, next) {
        try {
            const { species, breed, location, date_lost } = req.body;
            const { img } = req.files;
            const fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', 'lostAnimal_img', fileName));
            
            const lostAnimal = await LostAnimal.create({
                species,
                breed,
                location,
                date_lost,
                img: fileName
            });

            return res.json(lostAnimal);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getLostAnimals(req, res, next) {
        try {
            const lostAnimals = await LostAnimal.findAll({
                where: {
                    status: 'животное потеряно'
                },
                attributes: { exclude: ['status'] } // Исключаем статус из результатов
            });

            return res.json(lostAnimals);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async updateLostAnimal(req, res, next) {
        try {
            const { animal_id } = req.params;
            const { status } = req.body;
    
            const lostAnimal = await LostAnimal.findByPk(animal_id);
    
            if (!lostAnimal) {
                return next(ApiError.notFound('Животное не найдено'));
            }
    
            lostAnimal.status = status;
    
            await lostAnimal.save();
    
            return res.json(lostAnimal);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при обновлении данных животного'));
        }
    }
    
}
module.exports = new LostAnimalController()