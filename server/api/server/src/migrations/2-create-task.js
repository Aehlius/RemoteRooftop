module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Tasks', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        assigner: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        assignee: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        project: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    },
    down: (queryInterface) => {
      return queryInterface.dropTable('Tasks');
    }
  };