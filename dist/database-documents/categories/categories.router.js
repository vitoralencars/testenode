"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var model_router_1 = require("../../common/model-router");
var categories_model_1 = require("./categories.model");
var CategoriesRouter = /** @class */ (function (_super) {
    __extends(CategoriesRouter, _super);
    function CategoriesRouter() {
        var _this = _super.call(this, categories_model_1.Category) || this;
        _this.findSubCategory = function (req, resp, next) {
            categories_model_1.Category.findById(req.params.id)
                .then(function (category) {
                if (category) {
                    resp.json(category.subCategories);
                    return next();
                }
                else {
                }
            })["catch"](next);
        };
        _this.addSubCategories = function (req, resp, next) {
            categories_model_1.Category.findById(req.params.id)
                .then(function (category) {
                if (category) {
                    category.subCategories = _this.sortSubCategoriesArray(category.subCategories.concat(req.body));
                    return category.save();
                }
                else {
                }
            })
                .then(function (category) {
                resp.json(category.subCategories);
                return next();
            })["catch"](next);
        };
        _this.deleteSubCategory = function (req, resp, next) {
            categories_model_1.Category.findById(req.params.id)
                .then(function (category) {
                if (category) {
                    //category.subCategories = category.subCategories.forEach(())
                    return next();
                }
                else {
                }
            })["catch"](next);
        };
        _this.on('beforeRender', function (document) {
        });
        return _this;
    }
    CategoriesRouter.prototype.sortSubCategoriesArray = function (subCategories) {
        return subCategories.sort(function (a, b) {
            if (a.description > b.description) {
                return 1;
            }
            if (a.description < b.description) {
                return -1;
            }
            return 0;
        });
    };
    CategoriesRouter.prototype.applyRoutes = function (application) {
        application.get('/categories', this.findAll);
        application.get('/categories/:id', [this.validateId, this.findById]);
        application.get('/categories/:id/subcategories', [this.validateId, this.findSubCategory]);
        application.post('/categories', this.save);
        application.put('/categories/:id/subcategories', [this.validateId, this.addSubCategories]);
        application.put('/categories/:id', [this.validateId, this.replace]);
        application.patch('/categories/:id', [this.validateId, this.update]);
        application.del('/categories/:id', [this.validateId, this["delete"]]);
    };
    return CategoriesRouter;
}(model_router_1.ModelRouter));
exports.categoriesRouter = new CategoriesRouter();
