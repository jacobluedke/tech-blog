const { Comment } = require('../models');
const commentData = require('./commentData.json');

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;