var mongoose = require('mongoose');
var user = require('../models/user.js');
var q = require('q');
var bcrypt = require('bcrypt');
require('mongoose-query-paginate');
var users = {
    createUser: function (req, res) {
        var saltRounds = 10;
        var password = req.body.password;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                var userOBJ = new user({
                    userName: req.body.userName,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: hash,
                    email: req.body.email,
                    code: req.body.roleCode

                })

                userOBJ.save((err, createdTodoObject) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).send(createdTodoObject);
                });



            });
        });


    },
    getUsers: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'userName'
        };
        
        var query = user.find({}).sort(options.order);
        query.paginate(options, function (err, results) {
            if (err) throw err;
            if (results) {
                res.json(results);
            }

        });


        // queryResolver.resolveQuery(req.query, user, options).then(function(response) {
        //   res.json(response);
        // });
    },
    updateUser: function (req, res) {
        user.findByIdAndUpdate(req.body._id, {
            'userName': req.body.userName,
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'password': req.body.password,
            'email': req.body.email,
            'roleCode': req.body.roleCode
        }).then(function (result) {
            res.status(201);
            res.json({
                "status": 200,
                "message": "Update Successfully"
            })
        }, function (error) {
            console.log(error);
        })
    },
    deleteUser: function (req, res) {
        var id = req.params.id;
        user.findByIdAndUpdate(id, {
            'markDelete': true
        }, function (result) {
            res.status(201);
            res.json({
                "status": 200,
                "message": "delete Successfully"
            })
        }, function (error) {
            console.log("error" + error);
        })
    }
};
module.exports = users;
