/**
 * Module dependencies.
 */

var express = require('express')
    , app = express()
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http').createServer(app)
    , io = require('socket.io').listen(http)
    , path = require('path');


app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

io.configure(function () {
    io.set('authorization', function (handshakeData, callback) {
        console.log('login user name>>'+handshakeData.query.userName);
        callback(null, false);
    });
});

io.sockets.on('connection', function (socket) {
    console.log('connect ok.');
});