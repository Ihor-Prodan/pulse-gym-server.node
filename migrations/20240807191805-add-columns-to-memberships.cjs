'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Memberships', 'giveOne', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Memberships', 'giveTwo', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Memberships', 'giveThree', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Memberships', 'slogan', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Memberships', 'access', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Memberships', 'unlimited', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Memberships', 'locker', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Memberships', 'price', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Memberships', 'best', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.addColumn('Memberships', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Memberships', 'giveOne');
    await queryInterface.removeColumn('Memberships', 'giveTwo');
    await queryInterface.removeColumn('Memberships', 'giveThree');
    await queryInterface.removeColumn('Memberships', 'slogan');
    await queryInterface.removeColumn('Memberships', 'access');
    await queryInterface.removeColumn('Memberships', 'unlimited');
    await queryInterface.removeColumn('Memberships', 'locker');
    await queryInterface.removeColumn('Memberships', 'price');
    await queryInterface.removeColumn('Memberships', 'best');
    await queryInterface.removeColumn('Memberships', 'userId');
  }
};
