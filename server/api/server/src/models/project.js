module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
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
      }
    });
    return Project;
  };