const { Post } = require('../models');
const postData = require('./postData.json');

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;