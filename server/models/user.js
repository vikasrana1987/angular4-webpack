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
		},
		role_id: {type: DataTypes.INTEGER},
		country_id: {type: DataTypes.INTEGER},
		company_name: {
			type: DataTypes.STRING
		},
		address: {
			type: DataTypes.STRING
		},
		city: {
			type: DataTypes.STRING
		},
		state: {
			type: DataTypes.STRING
		},
		zip_code: {
			type: DataTypes.STRING
		},
		phone_number: {
			type: DataTypes.STRING
		},
		willing_to_change: {type: DataTypes.INTEGER},
		notice_period: {type: DataTypes.INTEGER},
		in_notice_period: {type: DataTypes.INTEGER}
  });

  return User;
};