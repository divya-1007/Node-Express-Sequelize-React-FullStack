module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define("order", {
        paymentId: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        amount_paid: {
            type: DataTypes.INTEGER
        },
        currency: {
            type: DataTypes.STRING,
        },
        receipt:{
         type: DataTypes.STRING,
        },
        statu: {
            type: DataTypes.STRING,
        }
    
    })

    return Order

}