const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    firstName: { type: DataTypes.STRING }, // Поле с именем пользователя
    lastName: { type: DataTypes.STRING },  // Поле с фамилией пользователя
    photo: { type: DataTypes.STRING },       // Поле с фото пользователя
})

// Модель для таблицы "LostAnimal"
const LostAnimal = sequelize.define('lost_animal', {
    animal_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    species: { type: DataTypes.STRING, allowNull: false },
    breed: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING, allowNull: false },
    date_lost: { type: DataTypes.DATE, allowNull: false },
    img: { type: DataTypes.STRING },
});

// Модель для таблицы "Volunteer"
const Volunteer = sequelize.define('volunteer', {
    volunteer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false }, // Связь с пользователем
    date_joined: { type: DataTypes.DATE, allowNull: false },
    skills: { type: DataTypes.STRING }, // Навыки волонтера
    assigned_events: { type: DataTypes.STRING }, // Мероприятия, на которые назначен волонтер
    activity_id: { type: DataTypes.INTEGER }, // Связь с волонтерской активностью
});

// Модель для таблицы "AnimalCatalog"
const AnimalCatalog = sequelize.define('animal_catalog', {
    animal_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    species: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    breed: { type: DataTypes.STRING },
    colour: { type: DataTypes.STRING },
    notes: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER, allowNull: false },
});

// Модель для таблицы "Event"
const Event = sequelize.define('event', {
    event_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    event_date: { type: DataTypes.DATE, allowNull: false },
    event_time: { type: DataTypes.TIME, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

// Модель для таблицы "Review"
const Review = sequelize.define('review', {
    review_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.STRING, allowNull: false },
    date_posted: { type: DataTypes.DATE, allowNull: false },
});

// Модель для таблицы "Record"
const Record = sequelize.define('record', {
    record_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    animal_id: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.FLOAT },
    surgical_interventions: { type: DataTypes.STRING },
    vaccinations: { type: DataTypes.STRING },
    chronic_diseases: { type: DataTypes.STRING },
    allergies: { type: DataTypes.STRING },
});

// Модель для таблицы "EducationMaterials"
const EducationMaterials = sequelize.define('education_materials', {
    material_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    file_url: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING },
    upload_date: { type: DataTypes.DATE },
});

// Модель для таблицы "VolunteerActivity"
const VolunteerActivity = sequelize.define('volunteer_activity', {
    activity_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    activity_type: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    duration: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// Промежуточная таблица для связи "многие ко многим" между Event и EducationMaterials
const EventEducationMaterials = sequelize.define('event_education_materials', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
// Промежуточная таблица для связи "многие ко многим" между User и Event
const UserEvent = sequelize.define('user_event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// Промежуточная таблица для связи "многие ко многим" между Event и AnimalCatalog
const EventAnimal = sequelize.define('event_animal', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
// Определение связей
Event.belongsToMany(EducationMaterials, { through: EventEducationMaterials });
EducationMaterials.belongsToMany(Event, { through: EventEducationMaterials });
// Связь между таблицей User и Volunteer: Один пользователь может быть волонтером.
User.hasOne(Volunteer);
Volunteer.belongsTo(User);
// Связь между таблицей Volunteer и VolunteerActivity: Волонтеры могут участвовать во многих волонтерских активностях.
Volunteer.hasMany(VolunteerActivity);
VolunteerActivity.belongsTo(Volunteer);
// Связь между таблицей User и Review: Пользователи могут оставлять отзывы.
User.hasMany(Review);
Review.belongsTo(User);
// Связь между таблицей Event и VolunteerActivity: Волонтерская активность связана с мероприятиями.
Event.hasMany(VolunteerActivity);
VolunteerActivity.belongsTo(Event);
// Связь между таблицей AnimalCatalog и Record: Каждое животное в каталоге может иметь только 1 медицинскую карту.
AnimalCatalog.hasOne(Record);
Record.belongsTo(AnimalCatalog);

// Связь между таблицей User и Event: Пользователи могут быть связаны с мероприятиями
User.belongsToMany(Event, { through: UserEvent });
Event.belongsToMany(User, { through: UserEvent });

// Связь между таблицей Event и AnimalCatalog: Мероприятия могут быть связаны с животным каталогом
Event.belongsToMany(AnimalCatalog, { through: EventAnimal });
AnimalCatalog.belongsToMany(Event, { through: EventAnimal });

module.exports = {
   User,
   UserEvent, 
   AnimalCatalog,
   Event,
   EventAnimal,
   Record,
   Review,
   LostAnimal,
   EducationMaterials,
   Volunteer,
   VolunteerActivity,
   EventEducationMaterials
}






