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
      await queryInterface.createTable('dishes', {

        id: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(128),
          validate: {
            len: [3, 128],
          },
        },
        restaurantId: {
          allowNull: false,
          type: Sequelize.UUID,
          // references: {
          //   model: 'restaurants',
          //   key: 'id',
          // }
        },
        priceInCents: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        categoryId: {
          allowNull: false,
          type: Sequelize.UUID,
        },
        calories: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        description: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        highlight: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            len: [3, 25],
          },
        },
        image: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        isAvaliable: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },

        // timestamps
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
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
      await queryInterface.dropTable('dishes', { transaction });
    })
  }
};
