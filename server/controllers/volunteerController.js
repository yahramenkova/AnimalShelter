const { Volunteer, VolunteerActivity, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class VolunteerController {
    
    async createVolunteer(req, res, next) {
        try {
          const { user_id, phone_number, experience, selectedActivityIds } = req.body;
          const date_joined = new Date(); // Текущая дата и время
      
          const newVolunteer = await Volunteer.create({ user_id, date_joined, phone_number, experience });
      
          if (selectedActivityIds && selectedActivityIds.length > 0) {
            const volunteerActivities = await VolunteerActivity.findAll({
              where: { activity_id: selectedActivityIds }
            });
      
            // Извлекаем идентификаторы активностей
            const activityIds = volunteerActivities.map((activity) => activity.activity_id);
      
            // Добавляем активности волонтеру
            await newVolunteer.addVolunteerActivities(activityIds);
          }
          return res.status(201).json(newVolunteer);
        } catch (error) {
          console.error(error);
          return next(ApiError.internal('Произошла ошибка при создании волонтера'));
        }
      }

    async getAllVolunteers(req, res, next) {
        try {
            const volunteers = await Volunteer.findAll({
              include: [{
                model: User,
                attributes: ['firstName', 'lastName']
             }]
            }
            );
            return res.json(volunteers);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при получении списка волонтеров'));
        }
    }
}

module.exports = new VolunteerController();
