'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require('./../config'); // get our config file
var queries = require('./../lib/logger').queries;
var db = {};

var sequelize = new Sequelize(config.database.db, config.database.user, config.database.password, {
    host: config.database.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
	logging: function (str) {
        queries.info(str);
    }
});

var sequelizeAttributeRoles = require('sequelize-attribute-roles');
   
// Guard attributes on all models of a Sequelize instance 
sequelizeAttributeRoles(sequelize);

module.exports = sequelize;

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;