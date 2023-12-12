const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const path = require('path');
const { User, Event, Volunteer, Review } = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
}

class UserController {
    async registration(req, res, next) {
        try {
        const { email, password, role, firstName, lastName } = req.body;
        const { photo } = req.files;
            const fileName = uuid.v4() + ".png";
            photo.mv(path.resolve(__dirname, '..', 'static', 'user_images', fileName));
            
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, firstName, lastName, password: hashPassword, photo: fileName });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
    }

    async login(req, res, next) {
        try {
          const { email, password } = req.body;
      
          if (!email || !password) {
            return next(ApiError.badRequest('Email and password are required'));
          }
      
          const user = await User.findOne({ where: { email } });
      
          if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
          }
      
          const comparePassword = bcrypt.compareSync(password, user.password);
      
          if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
          }
      
          const token = generateJwt(user.user_id, user.email, user.role);
          return res.json({ token });
        } catch (error) {
          // Handle unexpected errors
          console.error('Login error:', error);
          return next(ApiError.badRequest('Internal Server Error'));
        }
      }
      

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }
}

module.exports = new UserController();
