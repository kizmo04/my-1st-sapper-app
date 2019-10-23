const mongoose = require('mongoose');
const { schema, options } = require('@vanillacoding/models').online.Order;

const OrderSchema = new mongoose.Schema(schema, options);

module.exports = mongoose.model('Order', OrderSchema);
