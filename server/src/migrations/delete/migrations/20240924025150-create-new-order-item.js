'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('order_items', {
        id: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        basketId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        orderId: {
          type: Sequelize.UUID,
          allowNull: true,
        },
        dishId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        priceInCents: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },

        // timestamps
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      }, { transaction })
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('order_items', { transaction })
    })
  }
};
