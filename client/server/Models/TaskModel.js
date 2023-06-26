const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const User = require("./user");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Task.belongsTo(User, { foreignKey: "user_id" });

module.exports = Task;
