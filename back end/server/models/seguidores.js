'use strict';
module.exports = (sequelize, DataTypes) => {
  let seguidores = sequelize.define('seguidores', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    seguidor: {
        allowNull: false,
        require: true,
        type: DataTypes.INTEGER
    },
    seguido: {
        allowNull: false,
        require: true,
        type: DataTypes.INTEGER
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });
  seguidores.associate = function(models) {
      models.seguidores.belongsTo(models.usuario, {foreignKey: 'seguidor', as : 'quien_sigue'});
      models.seguidores.belongsTo(models.usuario, {foreignKey: 'seguido', as : 'a_quien_sigue'});
  };
  return seguidores;
};