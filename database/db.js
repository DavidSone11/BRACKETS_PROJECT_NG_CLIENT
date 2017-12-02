var mongoose = require('mongoose');
mongoose.set('debug', true)
mongoose.Promise = global.Promise;
var localdbURI = 'mongodb://127.0.0.1/locolink';
var APIobj = {
    protocol: 'mongodb',
    server: '@ds125716.mlab.com',
    port: 25716,
    remotedbname: "locolink",
    remotedbUser: "db_locolink",
    remotedbPassword: "root123"
};
var remoteURI = APIobj.protocol + '://' + APIobj.remotedbUser + ":" + APIobj.remotedbPassword + APIobj.server + ':' + APIobj.port + "/" + APIobj.remotedbname;
var options = {
    promiseLibrary: global.Promise,
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10,
    bufferMaxEntries: 0
};
mongoose.connect(remoteURI, options);
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + remoteURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
