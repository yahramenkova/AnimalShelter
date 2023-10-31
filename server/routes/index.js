const { Router } = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const eventRouter = require('./eventRouter');
const reviewRouter = require('./reviewRouter');
const recordRouter = require('./recordRouter');
const educationRouter = require('./educationRouter');
const catalogRouter = require('./catalogRouter');
const lostAnimalRouter = require('./lostAnimalRouter');
const volunteerRouter = require('./volunteerRouter');
const volunteerActivityRouter = require('./volunteerActivityRouter');


router.use('/user', userRouter);
router.use('/catalog', catalogRouter);
router.use('/event', eventRouter);
router.use('/volunteer', volunteerRouter);
router.use('/lostAnimal', lostAnimalRouter);
router.use('/education', educationRouter);
router.use('/record', recordRouter);
router.use('/review', reviewRouter);
router.use('/volunteerActivity', volunteerActivityRouter);

module.exports = router
