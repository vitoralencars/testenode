"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
exports.productSchema = new mongoose.Schema({
    description: {
        type: String
    }
});
