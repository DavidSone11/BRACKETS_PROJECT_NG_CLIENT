var mongoose = require('mongoose');
mongoose.set('debug', true)
var r = require('../models/role.js');
var q = require('q');
require('mongoose-query-paginate');
var roles = {
    createRole: function (req, res) {
        r.create({
            roleCode: req.body.roleCode
        }, function (err, result) {
            if (err) return err;
            else {
                res.status(201).json({
                    message: "role has been created successfully",
                    status: 200,
                    data: '',
                });
            }
        });
    },
    getRoles: function (req, res) {
        var pageOptions = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'roleCode'
        }
        r.find({}).sort(pageOptions.order);
        query.paginate(pageOptions, function (err, results) {
            if (err) throw err;
            res.json(results)
        });
    },
};
module.exports = roles;
