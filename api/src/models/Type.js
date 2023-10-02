const {DataTypes} = require("sequelize");

module.exports= (sequelize)=>{
    sequelize.define("type",{
        id:{
            type:DataTypes.INTEGER, 
            // defaultValue: DataTypes.UUIDV4, 
            primaryKey: true, 
            autoIncrement:true,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING, 
            allowNull:false
        }
    },{timestamps:false})
}