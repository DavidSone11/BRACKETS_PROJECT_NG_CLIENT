var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var dbURI = 'mongodb://127.0.0.1/locolink';
var remotedbURI = 'mongodb://127.0.0.1/locolink';

var options = {
    promiseLibrary: global.Promise,
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10,
    bufferMaxEntries: 0
};
mongoose.connect(dbURI, options);
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
