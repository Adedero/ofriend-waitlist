'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Visitors', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      sessionId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userAgent: {
        type: Sequelize.STRING,
        allowNull: false
      },
      referrer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      visitTimestamp: {
        type: Sequelize.STRING,
        allowNull: false
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Visitors');
  }
};
