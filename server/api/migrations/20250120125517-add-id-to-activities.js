'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Activities', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Activities', 'id');
  }
};

