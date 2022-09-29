const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)
db.users = require('./userModel')(sequelize, DataTypes)
db.foodProduct = require('./foodProductModel')(sequelize,DataTypes)
db.order = require("./order" )(sequelize,DataTypes);

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes Database connected re-sync done!')
})



// 1 to Many Relation

db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'review'
})
db.foodProduct.hasMany(db.reviews, {
    foreignKey: 'foodproduct_id',
    as: 'review'
})

db.products.hasMany(db.order, {
    foreignKey: 'product_id',
    as: 'order'
})

db.foodProduct.hasMany(db.order, {
    foreignKey:'foodproduct_id',
    as: 'order'
})



db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product',
})

db.reviews.belongsTo(db.foodProduct, {
  foreignKey: 'foodproduct_id',
   as: 'foodproduct'
})

db.order.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product',
}),

db.order.belongsTo(db.foodProduct, {
    foreignKey: 'foodproduct_id',
    as: 'foodproduct'
})

module.exports = db
