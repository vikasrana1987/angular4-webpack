// Role.js
"use strict";
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: {type: DataTypes.STRING},
        description: {type: DataTypes.STRING}
  });

  return Role;
};