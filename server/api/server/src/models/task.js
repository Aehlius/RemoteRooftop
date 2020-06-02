module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assigner: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assignee: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      project: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
    return Task;
  };