var express = require('express');
var router = express.Router();


router.post("/api/v1/user", function (req, res, next) {
    var username = req.body.username;
    var password  = req.body.password;
    return res.json({
        "message": "User has been saved Successfully!!!"
    })

})
module.exports = router;
