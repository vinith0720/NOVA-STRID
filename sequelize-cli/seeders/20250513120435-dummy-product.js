"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "People",
      [
        {
          name: "Apple iPhone 15",
          price: 999,
          stock: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung Galaxy S24",
          price: 899,
          stock: 75,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Google Pixel 9",
          price: 799,
          stock: 40,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("product", null, {});
  },
};
