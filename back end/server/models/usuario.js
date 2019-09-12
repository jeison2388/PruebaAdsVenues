'use strict';
module.exports = (sequelize, DataTypes) => {
  var usuario = sequelize.define('Usuario', {
    idUsuario: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombreUsuario: {
        allowNull: false,
        require: true,
        type: DataTypes.STRING,
        unique: true,
        validate: {
            validateLength: (description) =>{
                const length = description.length;
                if(length < 5)
                    return Promise.reject({field: 101, error: 100});
                else if(length > 60)
                    return Promise.reject({field: 101, error: 101})
            }
        }
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });
  return usuario;
};