"use strict";
exports.__esModule = true;
var server_1 = require("./server/server");
var categories_router_1 = require("./database-documents/categories/categories.router");
var server = new server_1.Server();
server.bootstrap([categories_router_1.categoriesRouter]).then(function (server) {
    console.log('Deu certo');
})["catch"](function (error) {
    console.log('Deu errado');
    console.error(error);
    process.exit(1);
});
