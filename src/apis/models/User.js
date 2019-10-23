const mongoose = require('mongoose');
const connection = require('../dbs')().default;

const { schema, options } = require('@vanillacoding/models').online.User;

const UserSchema = new mongoose.Schema(schema, options);

module.exports = connection.model('User', UserSchema);
