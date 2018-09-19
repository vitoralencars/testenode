"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
//import * as subcategories from '../subcategories/subcategories.model'
var subcategories_model_1 = require("../subcategories/subcategories.model");
var categorySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        unique: true
    },
    subCategories: {
        type: [subcategories_model_1.subCategorySchema],
        required: false,
        select: true,
        "default": []
    }
});
exports.Category = mongoose.model('Category', categorySchema);
