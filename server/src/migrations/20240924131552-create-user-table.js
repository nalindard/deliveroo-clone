'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        name: {
          type: Sequelize.STRING(128),
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [2, 128],
          }
        },
        email: {
          type: Sequelize.STRING(128),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          }
        },
        passwordHash: {
          type: Sequelize.STRING(256),
          allowNull: true
        },
        passwordSalt: {
          type: Sequelize.STRING(256),
          allowNull: true
        },
        isOAuthUser: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        oauthProvider: {
          type: Sequelize.STRING(128),
          allowNull: true
        },
        oauthId: {
          type: Sequelize.STRING(128),
          allowNull: false,
          unique: true,
        },
        role: {
          type: Sequelize.ENUM('customer', 'admin', 'restaurant'),
          allowNull: false,
          defaultValue: 'customer'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      await queryInterface.addIndex('users', ['email'], {
        unique: true,
        transaction
      });
      await queryInterface.addIndex('users', ['oauthId'], {
        unique: true,
        transaction
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('users');
    });
  }
};
