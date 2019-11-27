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

const { protect } = require('../middleware/auth')

// Reroute into other resourse routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRaduis);

router.route('/:id/photo').put(protect, bootcampPhotoUpload);

router
    .route('/')
    .get(advanceResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect ,createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(protect,updateBootcamp)
    .delete(protect,deleteBootcamp)

module.exports = router;
