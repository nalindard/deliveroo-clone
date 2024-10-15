'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
          references: {
            model: 'baskets',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        orderId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'orders',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        dishId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'dishes',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('order_items', { transaction })
    })
  }
};
