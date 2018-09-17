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
var router_1 = require("./router");
var mongoose = require("mongoose");
var ModelRouter = /** @class */ (function (_super) {
    __extends(ModelRouter, _super);
    function ModelRouter(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        _this.validateId = function (req, resp, next) {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                //Tratar erro
            }
            else {
                next();
            }
        };
        _this.findAll = function (req, resp, next) {
            _this.model
                .find()
                .then(_this.renderAll(resp, next))["catch"](next);
        };
        _this.findById = function (req, resp, next) {
            _this.model
                .findById(req.params.id)
                .then(_this.render(resp, next))["catch"](next);
        };
        _this.save = function (req, resp, next) {
            var document = new _this.model(req.body);
            document.save()
                .then(_this.render(resp, next));
        };
        _this.replace = function (req, resp, next) {
            var options = { overwrite: true };
            _this.model.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then(function (result) {
                if (result.n) {
                    return _this.model.findById(req.params.id);
                }
                else {
                    resp.send(404);
                }
            }).then(_this.render(resp, next));
        };
        _this.update = function (req, resp, next) {
            var options = { "new": true };
            _this.model.findByIdAndUpdate({ _id: req.params.id }, req.body, options)
                .then(_this.render(resp, next));
        };
        _this["delete"] = function (req, resp, next) {
            _this.model.remove({ _id: req.params.id })
                .exec()
                .then(function (commandResult) {
                if (commandResult.result.n) {
                    resp.send(200);
                }
                else {
                    resp.send(404);
                }
                return next();
            });
        };
        return _this;
    }
    return ModelRouter;
}(router_1.Router));
exports.ModelRouter = ModelRouter;
