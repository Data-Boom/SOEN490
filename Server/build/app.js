"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
var express = require("express");
var cors = require("cors");
// Create a new express application instance
var app = express();
app.use(cors);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/note', function (req, res) {
    res.send("L, did you know Shinigami love apples");
});
app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});
