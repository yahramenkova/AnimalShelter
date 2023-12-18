const uuid = require('uuid')
const path = require('path');
const { AnimalCatalog, Record } = require('../models/models');
const ApiError = require('../error/ApiError');

class AnimalCatalogController {
    async create(req, res, next) {
        try {
            const { name, species, age, breed, colour, notes, price } = req.body;
            const { img } = req.files;
            const fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', 'catalog_img', fileName));

            const animal = await AnimalCatalog.create({
                name,
                species,
                img: fileName,
                age,
                breed,
                colour,
                notes,
                price,
                status: 'продается' 
            });

            return res.json(animal);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAnimalById(req, res) {
        try {
          const { animal_id } = req.params;
          const animal = await AnimalCatalog.findOne({
            where: {animal_id: animal_id },
            include: [{
                model: Record,
                attributes: ['weight', 'surgical_interventions', 'vaccinations', 'chronic_diseases', 'allergies']
             }]
          });
      
          if (!animal) {
            return res.status(400).json({ error: 'Животное не найдено' });
          }
      
          return res.json(animal);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Произошла ошибка при получении информации о животном' });
        }
      }

      async getAllAnimals(req, res, next) {
        try {
          const animals = await AnimalCatalog.findAll({
            where: {
              status: 'продается'
            }
          });
          return res.json(animals);
        } catch (error) {
          console.error(error);
          return next(ApiError.internal('Произошла ошибка при получении списка животных'));
        }
      }

      async  getAllCats(req, res, next) {
        try {
          const animals = await AnimalCatalog.findAll({
            where: {
              species: 'Cat',
              status: 'продается'
            }
          });
          return res.json(animals);
        } catch (error) {
          console.error(error);
          return next(ApiError.internal('Произошла ошибка при получении списка животных'));
        }
      }

      async  getAllDogs(req, res, next) {
        try {
          const animals = await AnimalCatalog.findAll({
            where: {
              species: 'Dog',
              status: 'продается'
            }
          });
          return res.json(animals);
        } catch (error) {
          console.error(error);
          return next(ApiError.internal('Произошла ошибка при получении списка животных'));
        }
      }

      async markAnimalAsSold(req, res, next) {
        const { animal_id } = req.body;
      
        try {
          const animal = await AnimalCatalog.findByPk(animal_id);
      
          if (!animal) {
            return res.status(404).json({ error: 'Животное не найдено' });
          }
      
          animal.status = 'продано';
          await animal.save();
      
          return res.json({ message: 'Статус животного успешно изменен на "продано"' });
        } catch (error) {
          console.error(error);
          return next(ApiError.internal('Произошла ошибка при изменении статуса животного'));
        }
      }

    async updateAnimal(req, res, next) {
        try {
            const { animal_id } = req.params;
            const { name, species, img, age, breed, colour, notes, price, status } = req.body;

            const animal = await AnimalCatalog.findByPk(animal_id);

            if (!animal) {
                return next(ApiError.notFound('Животное не найдено'));
            }

            animal.name = name;
            animal.species = species;
            animal.img = img;
            animal.age = age;
            animal.breed = breed;
            animal.colour = colour;
            animal.notes = notes;
            animal.price = price;
            animal.status = status;

            await animal.save();

            return res.json(animal);
        } catch (error) {
            console.error(error);
            return next(ApiError.internal('Произошла ошибка при обновлении информации о животном'));
        }
    }
}

module.exports = new AnimalCatalogController();
