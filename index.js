const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite' // Your SQLite file
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Book = require('./book')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);

// Define model associations
db.Book.hasMany(db.Review, { foreignKey: 'book_id' });
db.Review.belongsTo(db.Book, { foreignKey: 'book_id' });

module.exports = db;
