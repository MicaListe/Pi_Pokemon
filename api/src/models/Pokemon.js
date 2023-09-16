const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    // id:{
    //   type:DataTypes.INTEGER, 
    //   primaryKey: true, 
    //   autoIncremet:true,
    //   allowNull:false
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    attack:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    defense:{
      type:DataTypes.INTEGER, 
      allowNull:false
    },
    speed:{
      type:DataTypes.INTEGER, 
      allowNull:false
    },
    height:{
      type:DataTypes.DECIMAL, 
      allowNull:false
    },
    weight:{
      type:DataTypes.DECIMAL,
      allowNull: false
    },
    image:{
      type:DataTypes.STRING, 
      allowNull:true
    }
  },{timestamps:false});
};
