const { Review } = require('../models/models');
const ApiError = require('../error/ApiError');

class ReviewController {
    async create(req, res, next) {
        try {
            const { review_id, user_id, rating, comment, date_posted} = req.body;
            console.log('Received data:', user_id, rating, comment, date_posted);
            const newReview = await Review.create({ review_id, user_id, rating, comment, date_posted});

            return res.status(201).json(newReview);
        } catch (error) {
            console.error(error);

            if (error.name === 'SequelizeValidationError') {
                // Ошибка валидации, отправляем клиенту 400 Bad Request
                return res.status(400).json({ error: 'Ошибка валидации', details: error.errors });
            } else {
                // Внутренняя ошибка сервера, отправляем клиенту 500 Internal Server Error
                return next(ApiError.internal('Произошла ошибка при создании отзыва'));
            }
        }
    }

    async getAll(req, res) {
        try {
            // Получите все отзывы, например, используя метод findAll модели Review
            const reviews = await Review.findAll();
            // Отправьте список отзывов в ответ клиенту
            return res.json(reviews);
        } catch (error) {
            return next(ApiError.internal('Произошла ошибка при получении отзывов'));
        }
    }
}

module.exports = new ReviewController();
