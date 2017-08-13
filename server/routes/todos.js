var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');


router.get('/', function(req, res){
	pool.connect(function (errorConnectingToDatabase, client, done) {//existing parameters to be passed under conditions 
		if (errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			client.query('SELECT * FROM todos;', function (errorMakingQuery, result) {
				done();
				if (errorMakingQuery) {
					console.log('Error making database query', errorMakingQuery);//sends error mes
					res.sendStatus(500);
				} else {
					res.send(result.rows); //sends back the data from DB
				}
			});
		}
	});
});

router.post('/', function (req, res) {
	console.log('todos post was hit!');

	pool.connect(function (errorConnectingToDatabase, client, done) {
		if (errorConnectingToDatabase) {

			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {

			client.query('INSERT INTO honeyDoList(task) VALUES($1);', [req.body.task, req.body.complete], function (errorMakingQuery, result) {
				done();
				if (errorMakingQuery) {
					console.log('Error making database query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.sendStatus(201);
				}
			});
		}
	});
});
router.put('/:id', function(req, res){
	var todoId = req.params.id;
	console.log('');
	pool.connect(function(errorConnectingToDatabase, client, done){
		if(errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			client.query('UPDATE =$1 WHERE id=$2', //why doesn't this work? UPDATE honeyDo SET todo="Y" WHERE id=$1
							['Y', todoId], 
							function(errorMakingQuery, result) {
				done();
				if(errorMakingQuery) {
					console.log('Error making database query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.sendStatus(200);
				}
			});
		}
	});
});

module.exports = router;