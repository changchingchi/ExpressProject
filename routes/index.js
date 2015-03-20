var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//mongojs for DB
var mongo = require('mongodb');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);


router.get('/contactlist', function(req, res){

	console.log('server received a REST request');
	  db.contactlist.find(function(err, docs){
	  	console.log(docs);
	  	res.json(docs);
	  });
});

router.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err,doc){
		//doc meaning the data we parsed and received.
		res.json(doc);
	})
});
router.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	 console.log('id :'+id+' is ready for removal');
	db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
		//doc meaning the data we parsed and received.
		res.json(doc);
	})
});

router.get('/contactlist/:id', function(req , res){
	var id = req.params.id;
	console.log('id' +id+ "is ready for GET request.");
	db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});

router.put('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log("put id: "+id+" is ready for PUT request");
	db.contactlist.findAndModify({query:{ _id: mongojs.ObjectId(id)},
		update : {$set : {name: req.body.name, email : req.body.email, number: req.body.number}},
		new : true}, function(err, doc){
			res.json(doc);
		});
});







module.exports = router;
