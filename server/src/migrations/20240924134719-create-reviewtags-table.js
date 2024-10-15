'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('review_tags', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(128),
          validate: {
            notEmpty: true,
            len: [3, 128],
          }
        },
        icon: {
          allowNull: false,
          type: Sequelize.STRING(128),
          // validate: {
          //   notEmpty: true,
          //   len: [3, 128],
          // }
        }


      }, { transaction });
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('reviews', { transaction });
    });
  }
};
