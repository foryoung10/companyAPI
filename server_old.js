// server.js

// BASE SETUP
// =============================================================================

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

// Create connection to database
var config = {
  user: 'api_user',
  password: 'GICDev2017',
  server: 'trove.database.windows.net',
  database: 'trove',
  options: {
       database: 'trove',
       encrypt: true
   }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    if (err) {
        console.log(err)
    }
    else{
        queryDatabase()
    }
});

dataset = [];
newrow = {};

function queryDatabase(err, rowCount, rows){
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
        "SELECT * FROM pub_trove.company_info FOR JSON PATH",
        function(err, rowCount, rows) {
        //    console.log(rowCount + ' row(s) returned');
        }
    );

    request.on('row', function(columns) {

        columns.forEach(function(column) {
          newrow.push({
            col: column.metadata.colName: val: column.value
          })
          console.log("%s\t%s", column.metadata.colName, column.value);
      });
        dataset.push(newrow);
    });

    connection.execSql(request);

    console.log(dataset);
    return dataset;
}

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.route('/companyInfo')

// get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
       res.json(dataset)
    });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
