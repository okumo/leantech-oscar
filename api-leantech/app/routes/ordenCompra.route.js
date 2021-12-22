module.exports = (app) => {
  const ordenCompra = require("../controllers/ordenCompra.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", ordenCompra.create);

  router.get("/", ordenCompra.findAll);

  app.use("/api/ordenCompra", router);
};
