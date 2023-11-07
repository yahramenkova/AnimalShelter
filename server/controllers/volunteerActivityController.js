const { VolunteerActivity } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class VolunteerActivityController {
    async create(req, res, next) {
        try {
            const { activity_type, date, duration, description, completed } = req.body;
            const { img } = req.files;
            const fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', 'volunteerActivity_img', fileName));

            const activity = await VolunteerActivity.create({
                activity_type,
                date,
                duration,
                description,
                img: fileName,
                completed
            });

            return res.json(activity);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const activities = await VolunteerActivity.findAll();
            return res.json(activities);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при получении активностей волонтеров'));
        }
    }
}

module.exports = new VolunteerActivityController();
