const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    photo: { type: DataTypes.STRING },
}, {
    timestamps: false
});

const LostAnimal = sequelize.define('lost_animal', {
    animal_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    species: { type: DataTypes.STRING, allowNull: false },
    breed: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING, allowNull: false },
    date_lost: { type: DataTypes.DATE, allowNull: false },
    img: { type: DataTypes.STRING },
    status: {
        type: DataTypes.ENUM('животное нашло хозяина', 'животное потеряно'),
        defaultValue: 'животное потеряно'
    }
}, {
    timestamps: false
});

const Volunteer = sequelize.define('volunteer', {
    volunteer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_joined: { type: DataTypes.DATE, allowNull: false },
    skills: { type: DataTypes.STRING },
    assigned_events: { type: DataTypes.STRING },
}, {
    timestamps: false
});

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
    status: {
        type: DataTypes.ENUM('продается', 'продано'),
        defaultValue: 'продается'
    }
}, {
    timestamps: false
});


const Review = sequelize.define('review', {
    review_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.STRING, allowNull: false },
    date_posted: { type: DataTypes.DATE, allowNull: false },
}, {
    timestamps: false
});

const Record = sequelize.define('record', {
    record_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    weight: { type: DataTypes.FLOAT },
    surgical_interventions: { type: DataTypes.STRING },
    vaccinations: { type: DataTypes.STRING },
    chronic_diseases: { type: DataTypes.STRING },
    allergies: { type: DataTypes.STRING },
}, {
    timestamps: false
});

const EducationMaterials = sequelize.define('education_materials', {
    material_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    file_url: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING },
    upload_date: { type: DataTypes.DATE },
}, {
    timestamps: false
});

const VolunteerActivity = sequelize.define('volunteer_activity', {
    activity_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    activity_type: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    duration: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
    timestamps: false
});

const VolunteerVolunteerActivity = sequelize.define('volunteer_volunteerActivity', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}, {
    timestamps: false
});

// Определение связей между моделями
User.hasOne(Volunteer, { foreignKey: 'user_id' });
Volunteer.belongsTo(User, { foreignKey: 'user_id' });


User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

AnimalCatalog.hasOne(Record, { foreignKey: 'animal_id' });
Record.belongsTo(AnimalCatalog, { foreignKey: 'animal_id' });

Volunteer.belongsToMany(VolunteerActivity, { through: VolunteerVolunteerActivity });
VolunteerActivity.belongsToMany(Volunteer, { through: VolunteerVolunteerActivity });

module.exports = {
    User,
    AnimalCatalog,
    Record,
    Review,
    LostAnimal,
    EducationMaterials,
    Volunteer,
    VolunteerActivity,
    VolunteerVolunteerActivity,
};




