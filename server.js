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

    .get(function(req, res) {
        const pool1 = new sql.ConnectionPool(config, err => {
          pool1.request().query('SELECT gs_sec_id, company_name FROM PUB_TROVE.TBLUI_CompanyOwnership', (err, result) => {
            res.send(JSON.stringify(result.recordset));
            JSON.stringify(result.recordset);
            })
          })
      });

//
router.route('/companyInfo/:gs_sec_id')

    .get(function(req, res) {
        const pool1 = new sql.ConnectionPool(config, err => {
          pool1.request().query('SELECT * FROM PUB_TROVE.TBLUI_CompanyOwnership where gs_sec_id =' + req.params.gs_sec_id , (err, result) => {
            res.send(JSON.stringify(result.recordset));
            JSON.stringify(result.recordset);
            })
          })
      });


router.route('/strategyBreakdowntest/:list')

    .get(function(req, res) {
        const pool1 = new sql.ConnectionPool(config, err => {
          pool1.request().query('SELECT * FROM PUB_TROVE.TBLUI_StrategyBreakdown' , (err, result) => {
            res.send(JSON.stringify(result.recordset));
            JSON.stringify(result.recordset);
            })
          })
      });


      router.route('/strategyBreakdown/:gs_sec_id')


    .get(function(req, res) {
        const pool1 = new sql.ConnectionPool(config, err => {
          pool1.request().query('SELECT * FROM PUB_TROVE.TBLUI_StrategyBreakdown where gs_sec_id =' + req.params.gs_sec_id , (err, result) => {
            res.send(JSON.stringify(result.recordset));
            JSON.stringify(result.recordset);
            })
          })
      });

router.route('/companyData/:list')

    .get(function(req, res) {
        console.log(req.params.list);
        //var list = req.params.list.split(',');
      //  console.log( list);
        // var text = '('
        // for (var i = 0; i < list.length; i++) {
        //   text +=  list[i];
//console.log(list[i]);
  //      };
        //console.log(text);
      //  list = list.replace('[', '').replace(']','').replace('\"', '\'');
        console.log('SELECT * FROM PUB_TROVE.TBLUI_CompanyOwnership where gs_sec_id in ( ' + req.params.list + ' )');
        const pool1 = new sql.ConnectionPool(config, err => {
          pool1.request().query('SELECT * FROM PUB_TROVE.TBLUI_CompanyOwnership where gs_sec_id in ( ' + req.params.list + ' )'
          , (err, result) => {
    //      console.log(result);
          res.send(JSON.stringify(result.recordset));
          JSON.stringify(result);
          })
        })
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// more routes for our API will happen here

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
