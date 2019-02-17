
const express = require('express')
const router = express.Router();


var network = require('../fabric/network.js');




router.get('/queryAllCars', (req, res) => {
	network.queryAllCars()
		.then((response) => {
			var carsRecord = JSON.parse(response);
			res.send(carsRecord)
		});
})

router.post('/createCar', (req, res) => {
	network.queryAllCars()
		.then((response) => {
			var carsRecord = JSON.parse(JSON.parse(response));
			var numCars = carsRecord.length;
			var newKey = 'CAR' + numCars;
			network.createCar(newKey, req.body.make, req.body.model, req.body.color, req.body.owner)
				.then((response) => {
					res.send(response)
				})
		})
})

router.post('/changeCarOwner', (req, res) => {
	network.changeCarOwner(req.body.key, req.body.newOwner)
		.then((response) => {
			res.send(response)
		})
})

module.exports = router;