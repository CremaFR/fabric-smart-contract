const express = require('express')
const router = express.Router();


var network = require('../fabric/network.js');

// todo get *real* accounts not cars
router.get('/', (req, res, next) => {
	network.queryAllCars()
		.then((response) => {
			var carsRecord = JSON.parse(response);
			res.status(200).send(carsRecord);
			// res.send(carsRecord)
		})
		.catch( err => {
			res.status(err.status).send(err)
		})
});


network.connectChannelEvent().then( channel => {
	// channel.registerTxEvent(
	// 	'all', // this listener will be notified of all transactions
	// 	(tx, status, block_num) => {
	// 		console.log(tx, status, block_num);
	// 		// console.log(util.format('Transaction %s has completed', tx));
	// 	},
	// 	(err) => {
	// 		channel.unregisterTxEvent('all');
	// 		// reportError(err);
	// 		console.log('Error Transaction listener has been deregistered for ', err, channel.getPeerAddr());
	// 	}
	// );
	//
	channel.registerChaincodeEvent("account", "ACCOUND_ADDED", (chaincodeEvent,blockNumber, txId, status) => {
		console.log(chaincodeEvent);
		console.log(status);
	}, (err) => console.error(err));
	
	
	
	channel.connect(true); // set to true to receive payload
});


module.exports = router;