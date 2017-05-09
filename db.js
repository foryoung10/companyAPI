var mssql = require('mssql');

var config = {
  user: 'api_user',
  password: 'GICDev2017',
  server: 'trove.database.windows.net',
  database: 'trove',
  options: {
      encrypt: true
  }
};

var connection = mssql.connect(config, function (err) {
  if (err)
    console.log("Error connecting to DB: " + err);
});

module.exports = connection;
