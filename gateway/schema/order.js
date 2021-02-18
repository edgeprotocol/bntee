const {getDBConnectionString} = require('./common');


const mongoose = getDBConnectionString()

var order = new mongoose.Schema({
  transactionHash: String,
  fullName: String,
  email: String,
  shirtSize: String,
  streetAddress: String,
  city: String,
  zipCode: String,
  country: String,
  province: String,
  walletAddress: String,
  timeStamp: Date,
  productName: String,
  tokenSymbol: String,
  tokenAddress: String,
  dateRedeemed: {type: Date, default: new Date()},
  timeStamp: {type: Date, default: new Date()},
  status: {'type': String, default: 'pending'},
});
  
var Order = mongoose.model('order', order);

module.exports = Order;
