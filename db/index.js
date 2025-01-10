import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('users', 'muskanmodi', 'Modi@123', {
  host: 'localhost', 
  dialect: 'postgres', 
  logging: console.log,
});

export default sequelize;
