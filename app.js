/*jslint node: true */
"use strict";
// BASE SETUP
// =============================================================================

// include the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./server/config'); // get our config file
//var cors = require('cors');
var http = require('http');
var path = require('path');
var logger = require('./server/lib/logger').logger;
// load models
var models = require('./server/models');

var port = process.env.PORT || 8090; // set our port

/* var whitelist = ['http://localhost:8080']
var corsOptions = {
    origin: function(origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions)); */
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));
app.set('view engine', 'ejs');
app.set('superSecret', config.secret); // secret variable

app.all('/*', function(req, res, next) {
	// CORS headers
	var allowedOrigins = ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:8090', 'http://localhost:8090'];
	var origin = req.headers.origin;
	if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
	}
	//res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// Set custom headers for CORS
	res.header('Access-Control-Allow-Headers', 'Content-type,Authorization,Accept,X-Access-Token,X-Key');
	res.header('Access-Control-Allow-Credentials', true);
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

// parse application/vnd.api+json as json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

var router = express.Router(); // get an instance of the express Router
// all of our routes will be prefixed with /api
app.use('/api', router);
require('./server/routes/index')(app, router, jwt);

app.use(function(req, res, next){
	res.status(404).json({
		code: 404,
		success: false,
		message: 'Not Found',
		payload: {
			/* Application-specific data would go here. */
	    }
	});
});
// START THE SERVER
// =============================================================================
var server = http.createServer(app);
models.sequelize.sync().then(function() {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, function() {
        console.log('Express server listening on port ' + server.address().port);
    });
    server.on('error', onError);
    server.on('listening', onListening);
});
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    logger.info('Listening on ' + bind);
}