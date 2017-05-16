var _AUTH = require('./auth');
module.exports = function(app,router,jwt) {
	
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
	// decode token
	if (token && typeof token != undefined) {
		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.status(401).send({
					'success': false,
					'error-message': 'Unclassified Authentication Failure',
					'error-auxiliary': 'Access token is invalid. Please try with new Access token'
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
		return res.status(403).send({
			'success': false,
			'error-message': 'Unclassified Authentication Failure',
			'error-auxiliary': 'Missing authorization token. Please try with valid Access token.'
		});
	}
}	