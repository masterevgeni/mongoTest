
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URL
db.invoice = require("./model.js")(mongoose);

module.exports = db;
