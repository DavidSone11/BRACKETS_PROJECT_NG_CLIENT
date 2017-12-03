" use strict";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./database/db');
var convjson = require('./library/convertJSON.js');
var remotemlabconfig = require('./config/remote-mlab-config.js');
var exception = require('./custom-exception/Exception.js');

var routes = require('./routes/index');
var userCtrl = require('./controllers/users.js');
var app = express();
///var validateAPIREQUEST = require('./middlewares/validateAPIRequest.js')({app:app});
var secureRoutes = express.Router();
var raw_port = process.env.PORT;
process.argv.forEach(function (val, index, array) {
    var port_i = val.search(/^port=/i);
    if (port_i > -1) {
        raw_port = val.substring(port_i + 5, val.length);
    }
});

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
var port = normalizePort(raw_port || '4000');
app.set('port', port);
var server = app.listen(port, function () {
    console.log('Server listening on url: http://localhost:' + port);
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Cookie');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use("/secure-api",secureRoutes);
secureRoutes.use(function (req, res, next) {
    var token = req.body.token || req.headers["token"];
    if (token) {
        res.send("TOKEN VALIDE");
        next();
    } else {
        res.send("PLEASE SEND THE TOKEN AGAIN");
    }
});

secureRoutes.get("/api/v1/user", userCtrl.getUser);
secureRoutes.post("/api/v1/user", userCtrl.createUser);
//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
///app.use('/', routes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
var from = {
    day: 1,
    time: "01:00"
};
var to = {
    day: 1,
    time: "00:59"
};
//console.log(timeCal.diffDateTimeObj(from,to));
var baseURI = {
    "href": "./data",
}
var name = {
    "users": "users",
    "links": "links",
    "globalsections": "globalsections",
    "roles": "roles",
    "trainlists": "trainlists",
    "trainstations": "trainstations",
    "privileges": "priviliges",
    "userplansections": "userplansections",
    ext: {
        "json": "json",
        "html": "html",
        "csv": "csv"
    }
}
var APIobj = {
    protocol: 'mongodb',
    server: '@ds125716.mlab.com',
    port: 25716,
    remotedbname: "locolink",
    remotedbUser: "db_locolink",
    remotedbPassword: "root123"
};
var remoteURI = APIobj.protocol + '://' + APIobj.remotedbUser + ":" + APIobj.remotedbPassword + APIobj.server + ':' + APIobj.port + "/" + APIobj.remotedbname;
mongodb://db_locolink:root123@ds125716.mlab.com:25716?/locolink?apiKey=X0Kwsbg8nMVftxRD98a1qIZN0aOvmgfl
convjson.readJSON(baseURI.href + "/" + name.userplansections + "." + name.ext.json);
module.exports = app;

