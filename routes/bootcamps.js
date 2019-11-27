const express = require('express');
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRaduis,
    bootcampPhotoUpload    
} = require('../controllers/bootCamps');

const Bootcamp = require('../models/Bootcamp');

const advanceResults = require('../middleware/advancedResults');

// Include other resourse routers
const courseRouter = require('./courses');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth')

// Reroute into other resourse routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRaduis);

router.route('/:id/photo').put(protect,authorize('publisher', 'admin'), bootcampPhotoUpload);

router
    .route('/')
    .get(advanceResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, authorize('publisher', 'admin'),createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(protect,authorize('publisher', 'admin'),updateBootcamp)
    .delete(protect,authorize('publisher', 'admin'),deleteBootcamp)

module.exports = router;
