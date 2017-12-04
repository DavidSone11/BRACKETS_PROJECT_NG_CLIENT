var jwt = require('jsonwebtoken');
module.exports.getUser = function (req, res) {
   
     res.json({
            "message": "token validate"
        });
   
}
module.exports.createUser = function (req, res) {
    var user = {
        "email": "santosh@gmail.com",
        "username": "santosh"
    }
    var token = jwt.sign(user, 'shhhhh');
    return res.json({
        "username": user.username,
        "email": user.email,
        "token": token
    })
}
