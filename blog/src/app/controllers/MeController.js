const { multipleMongooseToObject } = require('../../util/mongoose');

const Course = require('../models/Course');

class MeController {
    // [GET] /me/storedCourses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).sortable(req), 
            Course.countDocumentsDeleted()
        ])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(next);
    }
    
    // [GET] /me/trashCourses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next);
    }
}

module.exports = new MeController();
