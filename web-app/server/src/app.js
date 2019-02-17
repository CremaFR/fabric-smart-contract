const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var network = require('./fabric/network.js');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
const router = express.Router();

//ROUTES
const accounts = require('./routes/accounts');
const fabcar = require('./routes/fabcar');

router.use('/accounts', accounts);
router.use('/', fabcar);



app.use('/', router);
// 404
app.use((req, resp, next) => {
  return next(new Error('Route not found, see /api-docs for available routes'));
});

app.listen(process.env.PORT || 8081)