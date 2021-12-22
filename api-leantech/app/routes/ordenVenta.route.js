module.exports = (app) => {
  const ordenVenta = require("../controllers/ordenVenta.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", ordenVenta.create);

  router.get("/", ordenVenta.findAll);

  app.use("/api/ordenVenta", router);
};
