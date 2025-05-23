const uuid = require('uuid')
const path = require('path');
const { AnimalCatalog, Record } = require('../models/models');
const ApiError = require('../error/ApiError');

class AnimalCatalogController {
    async create(req, res, next) {
        try {
            const { name, species, age, breed, colour, notes, price, img } = req.body;

            const animal = await AnimalCatalog.create({
                name,
                species,
                img,
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
              species: 'Кошка',
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
              species: 'Собака',
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
            return res.status(404).json({ error: 'The animal was not found' });
          }
      
          animal.status = 'приютили';
          await animal.save();
      
          return res.json({ message: 'The status of the animal has been successfully changed to "adopted"' });
        } catch (error) {
          console.error(error);
          return next(ApiError.internal('An error occurred when changing the status of the animal'));
        }
      }

    async updateAnimal(req, res, next) {
        try {
            const { animal_id } = req.params;
            const { name, species, img, age, breed, colour, notes, price, status } = req.body;

            const animal = await AnimalCatalog.findByPk(animal_id);

            if (!animal) {
                return next(ApiError.notFound('The animal was not found'));
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
            return next(ApiError.internal('An error occurred when updating information about an animal'));
        }
    }
}

module.exports = new AnimalCatalogController();
