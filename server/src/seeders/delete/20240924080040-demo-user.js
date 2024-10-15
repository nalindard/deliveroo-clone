'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const users = Array.from({ length: 100 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }))

    await queryInterface.bulkInsert('users', users, {}).catch(async (error) => {
      console.error(error);
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {}, {})
  }
};
