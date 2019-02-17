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

// const eh = channel.newChannelEventHub(peer);
//
// // register the listener before calling "connect()" so there
// // is an error callback ready to process an error in case the
// // connect() call fails
// eh.registerTxEvent(
// 	'all', // this listener will be notified of all transactions
// 	(tx, status, block_num) => {
// 		record(tx, status, block_num);
// 		console.log(util.format('Transaction %s has completed', tx));
// 	},
// 	(err) => {
// 		eh.unregisterTxEvent('all');
// 		reportError(err);
// 		console.log(util.format('Error %s! Transaction listener has been ' +
// 			'deregistered for %s', err, eh.getPeerAddr()));
// 	}
// );
//
// eh.connect();

module.exports = router;