var mongoose = require('mongoose');
var user = require('../models/user.js');
var q = require('q');
require('mongoose-query-paginate');
var users = {
    createUser: function (req, res) {
        var code = req.body.roleCode;
    },
    getUsers: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'userName'
        };
        var query;
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
