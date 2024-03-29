const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isOwner, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campground')
const { storage } = require('../cloudinary')
const multer = require('multer');
const upload = multer({ storage });
// const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(
        isLoggedIn,
        upload.array('image'),
        validateCampground,
        catchAsync(campgrounds.createCampground))


router.get('/new',
    isLoggedIn,
    campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(
        isLoggedIn,
        isOwner,
        upload.array('image'),
        validateCampground,
        catchAsync(campgrounds.updateCampground))
    .delete(
        isLoggedIn,
        isOwner,
        catchAsync(campgrounds.deleteCampground))


router.get('/:id/edit',
    isLoggedIn,
    isOwner,
    catchAsync(campgrounds.renderEditForm))




module.exports = router;