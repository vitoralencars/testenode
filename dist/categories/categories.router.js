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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoriesRouter.prototype.applyRoutes = function (application) {
        application.get('/categorias', function (req, resp, next) {
            categories_model_1.Category.find().then(function (categories) {
                resp.json(categories);
                return next();
            });
        });
        application.get('/categorias/:id', function (req, resp, next) {
            categories_model_1.Category.findById(req.params.id).then(function (category) {
                if (category) {
                    resp.json(category);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
    };
    return CategoriesRouter;
}(router_1.Router));
exports.categoriesRouter = new CategoriesRouter();
