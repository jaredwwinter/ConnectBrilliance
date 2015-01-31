// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var braintree  = require('braintree');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

var port = process.env.PORT || 51006;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.post('/braintree', function(req, res) {
    console.log('request received');
    var gateway = braintree.connect({
        environment: braintree.Environment.Sandbox,
        merchantId: "v6pkkfspb62fycn7",
        publicKey: "b4ggz2gtm4myv8nk",
        privateKey: "576267fe9238a5d2bdda0da8ede05dd2"
    });
    var clientToken = '';
    gateway.clientToken.generate({}, function (err, response) {
        clientToken = response.clientToken
        res.json({ token: clientToken }); 
    });
});

app.post("/purchase", function (req, res) {
    var nonce = req.body.payment_method_nonce;
    var amount = req.body.payment_amount;
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonce,
    }, function (err, result) {
        // console.log(result.success); // true
        // console.log(result.customer.id); // e.g 160923
        // console.log(result.customer.creditCards[0].token); // e.g f28wm
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
