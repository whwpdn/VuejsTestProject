var express = require('express');
var mysql_dbc = require('../DB/db_conn')();

var router = express.Router();
var connection = mysql_dbc.init();


// router.get('/', function(req,res){
// 	res.send('Root');
// });

router.get('/all',function(req, res){
	var stmt = 'select * from equipment';
	connection.query(stmt, function(err,rows){
		if(err)
			console.log('error : ', err);
		//console.log(rows);
		res.send(rows);
	});
});

router.get('/all2',function(req, res){
	var stmt = 'select * from equipmentdetails_view';
	connection.query(stmt, function(err,rows){
		if(err)
			console.log('error : ', err);
		res.send(rows);
	});
});

router.get('/TypeList',function(req, res){
	var stmt = 'select _id, modelname, type from model';
	connection.query(stmt, function(err,rows){
		if(err)
			console.log('error : ', err);
		//console.log(rows);
		res.send(rows);
	});
});
router.get('/specific/:modelname',function(req, res){
	var modelname = req.params.modelname;
	var stmt = 'select * FROM equipmentdetails_view WHERE system ="'+modelname +'"';
	connection.query(stmt, function(err,rows){
		if(err)
			console.log('error : ', err);
		res.send(rows);
	});
});



module.exports = router;