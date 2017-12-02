var express = require('express');
var router = express.Router();
var user = require('./users.js');
var role = require('./role.js');

router.post("/api/v1/admin/users", user.createUser);
router.get('/api/v1/admin/users', user.getUsers);
router.put('/api/v1/admin/user/', user.updateUser);
router.put('/api/v1/admin/user/:id', user.deleteUser);

router.get('/api/v1/admin/role', role.getRoles);
router.post('/api/v1/admin/role', role.createRole);

router.post("/api/v1/user", function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    return res.json({
        "message": "User has been saved Successfully!!!"
    })
})
module.exports = router;
