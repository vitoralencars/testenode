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
var router_1 = require("../common/router");
var categories_model_1 = require("./categories.model");
var CategoriesRouter = /** @class */ (function (_super) {
    __extends(CategoriesRouter, _super);
    function CategoriesRouter() {
        var _this = _super.call(this) || this;
        _this.on('beforeRender', function (document) {
        });
        return _this;
    }
    CategoriesRouter.prototype.applyRoutes = function (application) {
        var _this = this;
        application.get('/categories', function (req, resp, next) {
            categories_model_1.Category.find().then(_this.render(resp, next));
        });
        application.get('/categories/:id', function (req, resp, next) {
            categories_model_1.Category.findById(req.params.id).then(_this.render(resp, next));
        });
        application.post('/categories', function (req, resp, next) {
            var category = new categories_model_1.Category(req.body);
            category.save().then(_this.render(resp, next));
        });
        application.put('/categories/:id', function (req, resp, next) {
            var options = { overwrite: true };
            categories_model_1.Category.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then(function (result) {
                if (result.n) {
                    return categories_model_1.Category.findById(req.params.id);
                }
                else {
                    resp.send(404);
                }
            }).then(_this.render(resp, next));
        });
        application.patch('/categories/:id', function (req, resp, next) {
            var options = { "new": true };
            categories_model_1.Category.findByIdAndUpdate({ _id: req.params.id }, req.body, options)
                .then(_this.render(resp, next));
        });
        application.del('/categories/:id', function (req, resp, next) {
            categories_model_1.Category.remove({ _id: req.params.id })
                .exec()
                .then(function (commandResult) {
                if (commandResult.result.any) {
                    resp.send(200);
                }
                else {
                    resp.send(404);
                }
                return next();
            });
        });
    };
    return CategoriesRouter;
}(router_1.Router));
exports.categoriesRouter = new CategoriesRouter();
