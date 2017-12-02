var mongoose = require('mongoose');
var r = require('../models/role.js');
var q = require('q');
var roles = {
    createRole: function (req, res) {
        r.create({
            roleCode: req.body.roleCode
        }, function (err, result) {
            if (err) return err;
            else {
                res.status(201);
                res.json(result);
                console.log(result);
            }
        });
    }
};
module.exports = roles;
