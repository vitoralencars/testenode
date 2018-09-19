"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var products_model_1 = require("../products/products.model");
exports.subCategorySchema = new mongoose.Schema({
    description: {
        type: String,
        unique: true
    },
    products: {
        type: [products_model_1.productSchema],
        required: false,
        select: true,
        "default": []
    }
});
exports.SubCategory = mongoose.model('SubCategory', exports.subCategorySchema);
