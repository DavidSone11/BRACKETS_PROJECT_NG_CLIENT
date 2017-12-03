var mongoose = require('mongoose');
mongoose.set('debug', true)
var r = require('../models/role.js');
var q = require('q');
require('mongoose-query-paginate');
var https = require('request');
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
            res.json(results);
        });
    },

    getremoteRoles:function(req,res){
        var uri = "https://api.mlab.com/api/1/databases/locolink/collections/roles?apiKey=X0Kwsbg8nMVftxRD98a1qIZN0aOvmgfl"
        var pageOptions = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'roleCode'
        }

        https.get(uri, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
             }
        })
    }
};
module.exports = roles;


