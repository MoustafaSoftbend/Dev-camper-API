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

// Include other resourse routers
const courseRouter = require('./courses');

const router = express.Router();

// Reroute into other resourse routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRaduis);

router.route('/:id/photo').put(bootcampPhotoUpload);

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp)

module.exports = router;
