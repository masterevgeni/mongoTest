const db = require("../models");
const Invoices = db.invoice;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csv = require('csv-parser');
const fs = require('fs');

// create new invoice
exports.create = (req, res) => {
  // validate request
  if (!req.body.customerId) {
    res.status(400).send({ message: "customerId can not be empty!" });
    return;
  }

  // validate request 
  if (!req.body.invoiceId) {
    res.status(400).send({ message: "invoiceId can not be empty!" });
    return;
  }

  // schema new invoice
  const invoice = new Invoices({
    customerId: req.body.customerId,
    invoiceId: req.body.invoiceId,
  });

  // add new invoice in the database
  invoice
    .save(invoice)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating new invoice."
      });
    });
};

// get all invoices 
exports.findAll = (req, res) => {
  Invoices.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting invoice."
      });
    });
};

// get invoice filtered by date
exports.findByDateFilter = (req, res) => {
  const { startDate, endDate } = req.query;

  Invoices.find({
    createdAt: {
      $gte: new Date(Number(startDate)),
      $lt: new Date(Number(endDate))
    }
  })
    .then(data => {
      const fileName = new Date().getTime();
      writeCSV(fileName, data);     
      res.status(200).send({url: req.headers.host+'/'+fileName+'.csv'});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting invoice."
      });
    });
}

//download file
exports.downloadFile = (req, res) => {
  const { filename } = req.query;
  fs.createReadStream('./'+filename+'.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
  // res.setHeader('Content-disposition', 'attachment; filename=1627277521234.csv');
  // res.set('Content-Type', 'text/csv');
  // res.status(200).send('downloading file');
  
}

const writeCSV = (fileName, data) => {
  const csvWriter = createCsvWriter({
    path: `${fileName}.csv`,
    header: [
      { id: 'customerId', title: 'customerId' },
      { id: 'invoiceId', title: 'invoiceId' },
      { id: 'createdAt', title: 'createdAt' }
    ]
  });
  csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
}
