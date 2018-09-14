"use strict";
exports.__esModule = true;
var restify = require("restify");
var mongoose_1 = require("mongoose");
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.initializeDb = function () {
    };
    Server.prototype.initRoutes = function () {
        var _this = this;
        return new mongoose_1.Promise(function (resolve, reject) {
            try {
                _this.application = restify.createServer({
                    name: 'teste-api',
                    version: '1.0.0'
                });
                _this.application.use(restify.plugins.queryParser());
                _this.application.listen(3000, function () {
                    resolve(_this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    };
    Server.prototype.bootstrap = function () {
        var _this = this;
        return this.initRoutes().then(function () { return _this; });
    };
    return Server;
}());
exports.Server = Server;
