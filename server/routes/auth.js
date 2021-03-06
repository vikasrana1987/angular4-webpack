var models = require('./../models');
var passwordHash = require('password-hash');
var payloadChecker = require('payload-validator');

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}
exports.authenticate = function(app, jwt) {
    return function(req, res) {
        if (req.body) {
            var expectedPayload = {
                "username": "",
                "password": ""
            };

            var result = payloadChecker.validator(req.body, expectedPayload, ["username", "password"], false);
            if (result.success) {
                models.User.findOne({ attributes: ['id', 'password'], where: { email: req.body.username } }).then(function(user) {
                    if (!user) {
                        res.status(401).json({
                            success: false,
                            message: 'Authentication failed. Wrong email or password.'
                        });
                    } else if (user) {
                        // check if password matches
                        if (passwordHash.verify(req.body.password, user.password)) {
                            var userObj = {
                                id: user.id,
                                username: user.username,
                                password: user.password
                            };
                            // if user is found and password is right
                            // create a token
                            var token = jwt.sign(userObj, app.get('superSecret'), {
                                expiresIn: expiresIn(1) // 1 day
                            });

                            // return the information including token as JSON
                            res.json({
                                success: true,
                                message: 'You are logged in successfully.',
                                token: token
                            });
                        } else {
                            res.status(401).json({
                                success: false,
                                message: 'Authentication failed. Wrong email or password.'
                            });
                        }

                    }
                });
            } else {
                res.status(500).json({
                    code: 500,
                    success: false,
                    message: result.response.errorMessage,
                    payload: {
                        /* Application-specific data would go here. */
                    }
                });
            }
        } else {
            res.status(500).json({
                code: 500,
                success: false,
                message: 'Payload is not correct',
                payload: {
                    /* Application-specific data would go here. */
                }
            });
        }
    }
}

// find all users
exports.getUsers = function(req, res, next) {
    models.User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email']
    }).then(function(users) {
        return res.status(200).send(JSON.stringify(users));
    });
}

// find user by id
exports.getUserById = function(req, res, next) {
    var userId = req.params.id;
    models.User.findById(userId, {
        attributes: ['id', 'firstName', 'lastName', 'email']
    }).then(function(user) {
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        } else {
            return res.status(200).send(JSON.stringify(user));
        }
    });
}