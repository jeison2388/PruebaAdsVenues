'use strict';
module.exports = (sequelize, DataTypes) => {
  let usuario = sequelize.define('usuario', {
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
  usuario.associate = function(models) {
    models.usuario.hasMany(models.seguidores, {foreignKey: 'seguidor', as: 'quien_me_sigue'})
    models.usuario.hasMany(models.seguidores, {foreignKey: 'seguido', as: 'a_quien_sigo'})    
};
  return usuario;
};