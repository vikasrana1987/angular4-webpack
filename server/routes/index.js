var _AUTH = require('./auth');
var global = {};

module.exports = function(app,router,jwt) {
	global.app = app;
	global.jwt = jwt;
	/* Auth */
	router.post('/authenticate', _AUTH.authenticate(app, jwt));
	/* End Auth */
	
	/* User */
    router.get('/users', tokenProtection, _AUTH.getUsers);
	router.get('/users/:id', tokenProtection, _AUTH.getUserById);
    /* End User */
	router.get('*', function(req, res, next) {
		res.render('app/index', { page_title: 'PEN_V4', user_data: {} });
	})
}

function tokenProtection(req, res, next){
	// check header or url parameters or post parameters for token
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.query && req.query.token) {
		token = req.query.token;
	} else {
		token = req.body.token || req.query.token || req.headers['x-access-token'];
	}
	try {
		// decode token
		if (token && typeof token != undefined) {
			// verifies secret and checks exp
			global.jwt.verify(token, global.app.get('superSecret'), function(err, decoded) {
				if (err) {
					res.status(401).json({
						code: 401,
						success: false,
						message: 'Access token is invalid. Please try with new Access token',
						payload: {
							
						}
					});
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;
					next();
				}
			});
		} else {
			// if there is no token
			// return an error
			res.status(403).json({
				code: 403,
				success: false,
				message: 'Missing authorization token. Please try with valid Access token',
				payload: {
					
				}
			});
		}
	} catch (err) {
		res.status(500).json({
			code: 500,
			success: false,
			message: 'Oops something went wrong',
			payload: {
				error:err.message
			}
		});
    }
}	