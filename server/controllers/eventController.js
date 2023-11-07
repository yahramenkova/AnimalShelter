const { Event } = require('../models/models');
const ApiError = require('../error/ApiError');

class EventController {
    async createEvent(req, res, next) {
        try {
            const { name, event_date, event_time, description } = req.body;

            const newEvent = await Event.create({
                name,
                event_date,
                event_time,
                description
            });

            return res.status(201).json(newEvent);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при создании события'));
        }
    }

    async getEvent(req, res, next) {
        try {
            const { event_id } = req.params;
            const event = await Event.findByPk(event_id);

            if (!event) {
                return next(ApiError.badRequest('Событие не найдено'));
            }

            return res.json(event);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при получении события'));
        }
    }

    async updateEvent(req, res, next) {
        try {
            const { event_id } = req.params;
            const { name, event_date, event_time, description } = req.body;

            const event = await Event.findByPk(event_id);

            if (!event) {
                return next(ApiError.badRequest('Событие не найдено'));
            }

            event.name = name;
            event.event_date = event_date;
            event.event_time = event_time;
            event.description = description;

            await event.save();

            return res.json(event);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при обновлении события'));
        }
    }

    
}

module.exports = new EventController();
