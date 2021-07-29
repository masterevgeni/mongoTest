HOW OT INSTALL LOCAL

npm install
attach .env file
node index.js or nodemon index.js


PATHS

GET http://localhost:5001/api/invoices/  - to get all invoices

GET http://localhost:5001/api/invoices/search?startDate=1627248211000&endDate=1627249288000 - to filter between dates

POST http://localhost:5001/api/invoices/ - post new invoice
 {
	"customerId": "customer6",
	"invoiceId":"invoice6"
}