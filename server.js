var express = require('express');
var app = express();
var db = require('./db');
const sql = require('mssql');

var config = {
  user: 'api_user',
  password: 'GICDev2017',
  server: 'trove.database.windows.net',
  database: 'trove',
  options: {
      encrypt: true
  }
};

var router = express.Router();
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/companyInfo')

//GET API
    .get(function(req, res) {
        const pool1 = new sql.ConnectionPool(config, err => {
          pool1.request().query('SELECT COMPANY_ID, COMPANY_NAME FROM PUB_TROVE.COMPANY_INFO', (err, result) => {
            res.send(result);
            })
          })
      });

//
router.route('/companyInfo/:company_id')

      //GET API
          .get(function(req, res) {
              const pool1 = new sql.ConnectionPool(config, err => {
                pool1.request().query('SELECT * FROM PUB_TROVE.COMPANY_INFO where company_id =' + req.params.company_id , (err, result) => {
                  res.send(result);
                  })
                })
            });


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

// more routes for our API will happen here

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
