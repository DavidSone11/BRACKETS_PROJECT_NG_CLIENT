module.exports.getUser = function (req, res) {
    if (req.session) {
        return res.json({
            "message": "token validate"
        });
    }
}
module.exports.createUser = function (req, res) {
    var user = req.body.user;
    res.json({
        "user": user
    })
}
