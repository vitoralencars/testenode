"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var categorySchema = new mongoose.Schema({
    description: {
        type: String,
        unique: true
    }
});
exports.Category = mongoose.model('Category', categorySchema);
