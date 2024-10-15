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
      await queryInterface.createTable('orders', {
        id: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        userId: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        restaurantId: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'restaurants',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        status: {
          allowNull: false,
          type: Sequelize.ENUM(
            'pending',
            'preparing',
            'out-for-delivery',
            'delivered',
            'canceled',
            'rejected'
          ),
          defaultValue: 'pending',
        },

        // timestamps
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        // updatedAt: Sequelize.DATE,
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      }, { transaction });
    },);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('orders', { transaction });
    });
  }
};
