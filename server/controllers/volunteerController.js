const { Volunteer, VolunteerActivity, VolunteerVolunteerActivity } = require('../models/models');
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
            const volunteers = await Volunteer.findAll();
            return res.json(volunteers);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при получении списка волонтеров'));
        }
    }
    

    async updateVolunteer(req, res, next) {
        try {
            const { volunteer_id } = req.params;
            const { user_id, date_joined, skills, assigned_events, activity_id } = req.body;

            const volunteer = await Volunteer.findByPk(volunteer_id);

            if (!volunteer) {
                return next(ApiError.notFound('Волонтер не найден'));
            }

            volunteer.user_id = user_id;
            volunteer.date_joined = date_joined;
            volunteer.skills = skills;
            volunteer.assigned_events = assigned_events;
            volunteer.activity_id = activity_id;

            await volunteer.save();

            return res.json(volunteer);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при обновлении информации о волонтере'));
        }
    }
}

module.exports = new VolunteerController();
