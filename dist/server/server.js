"use strict";
exports.__esModule = true;
var restify = require("restify");
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var environment_1 = require("../common/environment");
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.initializeDb = function () {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useNewUrlParser: true
        });
    };
    Server.prototype.initRoutes = function (routers) {
        var _this = this;
        return new mongoose_1.Promise(function (resolve, reject) {
            try {
                _this.application = restify.createServer({
                    name: 'teste-api',
                    version: '1.0.0'
                });
                _this.application.use(restify.plugins.queryParser());
                for (var _i = 0, routers_1 = routers; _i < routers_1.length; _i++) {
                    var r = routers_1[_i];
                    r.applyRoutes(_this.application);
                }
                _this.application.listen(environment_1.environment.server.port, function () {
                    resolve(_this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    };
    Server.prototype.bootstrap = function (routers) {
        var _this = this;
        if (routers === void 0) { routers = []; }
        return this.initializeDb().then(function () {
            return _this.initRoutes(routers).then(function () { return _this; });
        });
    };
    return Server;
}());
exports.Server = Server;
