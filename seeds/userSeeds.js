const { User } = require('../models');
const userData = require('./userData.json');

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUsers;