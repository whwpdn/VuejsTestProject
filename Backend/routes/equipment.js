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
	mysql_dbc.executeQuery(stmt,function(rows){
		res.send(rows);
	});
});

router.get('/TypeList',function(req, res){
	var stmt = 'select _id, modelname, type from model';
	mysql_dbc.executeQuery(stmt,function(rows){
		console.log(rows);
		res.send(rows);
	});
});
router.get('/specific/:modelname',function(req, res){
	var modelname = req.params.modelname;
	var stmt = 'select * FROM equipmentdetails_view WHERE system ="'+modelname +'"';
	mysql_dbc.executeQuery(stmt,function(rows){
		res.send(rows);
	});
});
router.get('/historyField',function(req, res){
	var stmt = 'SELECT column_name ' +
				'FROM information_schema.columns ' +
				'WHERE table_name="history_view"';
	mysql_dbc.executeQuery(stmt,function(rows){
		console.log(rows);
		res.send(rows);
	});
});
router.get('/history',function(req, res){
	var stmt = 'select * FROM history_view';
	mysql_dbc.executeQuery(stmt,function(rows){
		res.send(rows);
	});
});
router.post('/UpdateEqDetail',function(req, res){
	var param = req.body;
	
	var stmt = 'INSERT INTO history SELECT 0, NOW(),_id, ManageNum, SerialNum, BoardId, SystemId, Splitter, CPU, RAM, HDD, VGA, UserId, Location, IncomingDate, Note FROM equipment WHERE _Id = '+param._id;
	mysql_dbc.executeQuery(stmt,function(rows){
		if(rows.constructor.name =="OkPacket") {
			stmt = 'UPDATE equipment SET ';		
			for(var key in param) {
				stmt += key +'='+param[key];
				if(key != '_id'){
					stmt += ', '
				}
			}
			stmt += ' WHERE _id=' +param._id;
			mysql_dbc.executeQuery(stmt,function(rows){
			 	res.send(rows);
			});
		}
		else {
			res.send(rows);
		}
	});
});
router.get('/BoardDetails',function(req, res){
	var stmt = 'select * FROM boardDetails_view';
	mysql_dbc.executeQuery(stmt,function(rows){
		res.send(rows);
	});
});

module.exports = router;