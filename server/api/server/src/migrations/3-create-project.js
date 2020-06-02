module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Projects', {
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
        body: {
          type: Sequelize.TEXT,
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
      return queryInterface.dropTable('Projects');
    }
  };