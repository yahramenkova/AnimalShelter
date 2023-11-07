const { Record } = require('../models/models');
const ApiError = require('../error/ApiError');

class RecordController {
    async createRecord(req, res, next) {
        try {
            const { weight, surgical_interventions, vaccinations, chronic_diseases, allergies, animal_id } = req.body;
            const newRecord = await Record.create({ weight, surgical_interventions, vaccinations, chronic_diseases, allergies, animal_id });
            return res.status(201).json(newRecord);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при создании записи'));
        }
    }

    async getRecord(req, res, next) {
        try {
            const { record_id } = req.params;
            const record = await Record.findByPk(record_id);

            if (!record) {
                return next(ApiError.notFound('Запись не найдена'));
            }

            return res.json(record);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при получении записи'));
        }
    }

    async updateRecord(req, res, next) {
        try {
            const { record_id } = req.params;
            const { weight, surgical_interventions, vaccinations, chronic_diseases, allergies, animal_id } = req.body;

            const record = await Record.findByPk(record_id);

            if (!record) {
                return next(ApiError.notFound('Запись не найдена'));
            }

            record.weight = weight;
            record.surgical_interventions = surgical_interventions;
            record.vaccinations = vaccinations;
            record.chronic_diseases = chronic_diseases;
            record.allergies = allergies;
            record.animal_id = animal_id;

            await record.save();

            return res.json(record);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при обновлении записи'));
        }
    }
}

module.exports = new RecordController();
