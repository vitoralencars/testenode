"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var subCategorySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        unique: true
    }
});
var categorySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        unique: true
    },
    subCategories: {
        type: [subCategorySchema],
        required: false,
        select: true,
        "default": []
    }
});
exports.Category = mongoose.model('Category', categorySchema);
