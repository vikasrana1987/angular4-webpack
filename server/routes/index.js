var _AUTH = require('./auth');
var _TOKEN = require('./middleware/validate');

module.exports = function(app, router, jwt) {
    global.app = app;
    global.jwt = jwt;
    /* Auth */
    router.post('/authenticate', _AUTH.authenticate(app, jwt));
    /* End Auth */

    /* User */
    router.get('/users', _TOKEN.validateToken, _AUTH.getUsers);
    router.get('/users/:id', _TOKEN.validateToken, _AUTH.getUserById);
	
    /* End User */
    router.get('*', function(req, res, next) {
        res.render('app/index', { page_title: 'JOB Hunt', user_data: {} });
    })
}