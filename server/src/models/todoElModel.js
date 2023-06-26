module.exports = (sequelize, DataTypes) => {
  const todoEl = sequelize.define("todoEl", {
    cont: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  });
  return todoEl;
};
