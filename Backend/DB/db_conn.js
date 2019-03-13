var mysql = require('mysql');
var config = require('./db_info').dev;

var pool = mysql.createPool({
  host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
        charset : 'utf8'
      });

module.exports = function () {
  return {
    init: function () {
      return mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
        charset : 'utf8'
      })
    },
    
    executeQuery: function(stmt, callback){
      pool.getConnection(function(err, connection) {
        if(err) { 
          console.log(err); 
          return; 
        }
        connection.query(stmt, function(erro,rows){
          if(erro)
            console.log('query error : ', erro ,'- query : ', stmt);
          callback(rows);
        });
      });
    },

    test_open: function (con) {
      con.connect(function (err) {
        if (err) {
          console.error('mysql connection error :' + err);
        } else {
          console.info('mysql is connected successfully.');
        }
      })
    }
  
    
  }
};