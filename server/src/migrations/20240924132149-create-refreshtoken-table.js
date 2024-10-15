'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('refresh_tokens', {
        id: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        token: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        // timestamps
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          // defaultValue: Sequelize.NOW,
          defaultValue: Sequelize.fn('now'),
        },
        expiresAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }, { transaction })
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('refresh_tokens', { transaction })
    })
  }
};
