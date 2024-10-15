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
      await queryInterface.createTable('reviews', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        userId: {
          allowNull: false,
          type: Sequelize.UUID,
        },
        dishId: {
          allowNull: false,
          type: Sequelize.UUID,
        },
        restaurantId: {
          allowNull: false,
          type: Sequelize.UUID,
        },
        rating: {
          allowNull: false,
          type: Sequelize.INTEGER,
          validate: {
            min: 1,
            max: 5,
          },
        },
        comment: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notEmpty: true,
            len: [2, 256],
          },
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

      }, { transaction });
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
      await queryInterface.dropTable('reviews', { transaction });
    });
  }
};
