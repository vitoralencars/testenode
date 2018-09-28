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
var subcategories_model_1 = require("./subcategories.model");
var SubCategoriesRouter = /** @class */ (function (_super) {
    __extends(SubCategoriesRouter, _super);
    function SubCategoriesRouter() {
        var _this = _super.call(this, subcategories_model_1.SubCategory) || this;
        _this.on('beforeRender', function (document) {
        });
        return _this;
    }
    SubCategoriesRouter.prototype.applyRoutes = function (application) {
        //application.get('/categories/:id/subcategories', [this.validateId, this.findById])
    };
    return SubCategoriesRouter;
}(model_router_1.ModelRouter));
exports.subCategoriesRouter = new SubCategoriesRouter();
