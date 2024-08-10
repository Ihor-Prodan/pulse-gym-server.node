// 'use strict';
//
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('Memberships', {
//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       duration: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       date: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       giveOne: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       giveTwo: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       giveThree: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       slogan: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       access: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       unlimited: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       locker: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       price: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       best: {
//         type: Sequelize.BOOLEAN,
//         allowNull: true,
//       },
//       userId: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'Users',
//           key: 'id',
//         },
//         onUpdate: 'CASCADE',
//         onDelete: 'SET NULL',
//       },
//       createdAt: {
//         type: Sequelize.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//       },
//       updatedAt: {
//         type: Sequelize.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//       }
//     });
//   },
//
//   async down(queryInterface) {
//     await queryInterface.dropTable('Memberships');
//   }
// };
