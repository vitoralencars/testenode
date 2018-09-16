"use strict";
exports.__esModule = true;
var mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = function (req, resp, next) {
    if (req.getContentType() === mpContentType && req.method === 'PATCH') {
        try {
            req.body = JSON.parse(req.body);
            return next();
        }
        catch (e) {
            return next(new Error("Conte\u00FAdo inv\u00E1lido: " + e.message));
        }
    }
};
