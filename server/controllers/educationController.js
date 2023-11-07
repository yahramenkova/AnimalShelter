const { EducationMaterials } = require('../models/models');
const ApiError = require('../error/ApiError');

class EducationController {
    async create(req, res) {
        try {
            const { title, description, file_url, category, upload_date } = req.body;
            
            // Логгирование данных, чтобы убедиться, что они передаются правильно
            console.log('Received data:', title, description, file_url, category, upload_date);

            const newMaterial = await EducationMaterials.create({
                title: title,
                description: description,
                file_url: file_url,
                category: category,
                upload_date: upload_date
            });

            return res.status(201).json(newMaterial);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error while creating a new material' });
        }
    }
    async getAll(req, res) {
        try {
            const materials = await EducationMaterials.findAll();
            return res.json(materials);
        } catch (error) {
            return next(ApiError.internal('Произошла ошибка при получении материалов'));
        }
    }

    async getOneMaterial(req, res, next) {
        try {
            const { material_id } = req.params;
            const material = await EducationMaterials.findByPk(material_id);

            if (!material) {
                return next(ApiError.notFound('Учебный материал не найден'));
            }

            return res.json(material);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при получении учебного материала'));
        }
    }
}

module.exports = new EducationController();
