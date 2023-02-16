const { Router } = require("express");

const Carts = require("../../src/Carts")


const router = Router();

const carts = new Carts("./products/carrito.json")
console.log("🚀 ~ file: app.js:15 ~ carts", carts)


module.exports = router;