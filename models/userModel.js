module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.INTEGER,
            default:1
        }
    
    })
    return User;
}