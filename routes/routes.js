module.exports = app => {
  const invoices = require("../controllers/controller.js");

  var router = require("express").Router();

  // add new invoice
  router.post("/", invoices.create);

  // get all invoice
  router.get("/", invoices.findAll);

  //get with date filter
  router.get("/search", invoices.findByDateFilter);

  //download csv file
  router.get("/download", invoices.downloadFile)

  app.use("/api/invoices", router);
};
