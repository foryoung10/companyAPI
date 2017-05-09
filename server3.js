var db = require("./db");
var express = require("express");
var app = express();
const sql = require('mssql')

var config = {
  user: 'api_user',
  password: 'GICDev2017',
  server: 'trove.database.windows.net',
  database: 'trove',
  options: {
      encrypt: true
  }
};


app.get('/companyinfo', function (req, res, next) {
  const pool1 = new sql.ConnectionPool(config, err => {
    pool1.request().query('SELECT * FROM PUB_TROVE.COMPANY_INFO', (err, result) => {
      console.dir(result)
      res.send(result);
    })
  })
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
