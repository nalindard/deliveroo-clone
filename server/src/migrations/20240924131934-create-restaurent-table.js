'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('restaurants', {
        id: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
          type: Sequelize.STRING(128),
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [3, 128],
          }
        },
        ownerId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        city: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        area: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        opensAt: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        closesAt: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        note: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },

        // timestamps
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      }, { transaction })
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('restaurants', { transaction });
    });
  }
};
