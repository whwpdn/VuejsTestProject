var express = require('express');
var mysql_dbc = require('../DB/db_conn')();

var router = express.Router();
var connection = mysql_dbc.init();


// router.get('/', function(req,res){
// 	res.send('Root');
// });

router.get('/',function(req, res){
	console.log('test');
	var stmt = 'select * from equipment';
	connection.query(stmt, function(err,rows){
		if(err)
			console.log('error : ', err);
		console.log('rows : ' ,rows);
		res.send(rows);
	});
});

module.exports = router;