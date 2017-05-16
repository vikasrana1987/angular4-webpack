// User.js
"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        firstName: {type: DataTypes.STRING},
        lastName: {type: DataTypes.STRING},
        username: {type: DataTypes.STRING},
		email: {
			type: DataTypes.STRING,
			access: {
			  admin: true,
			  self: true
			}
		},
        password: {
			type: DataTypes.STRING,
			access: false
		}
  });

  return User;
};