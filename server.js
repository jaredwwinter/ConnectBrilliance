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

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "v6pkkfspb62fycn7",
    publicKey: "b4ggz2gtm4myv8nk",
    privateKey: "576267fe9238a5d2bdda0da8ede05dd2"
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.post('/braintree', function(req, res) {
    console.log('request received');
    var clientToken = '';
    gateway.clientToken.generate({}, function (err, response) {
        clientToken = response.clientToken
        res.json({ token: clientToken }); 
    });
});
router.get('/braintree', function(req, res) {
    console.log('request received');
    var clientToken = '';
    gateway.clientToken.generate({}, function (err, response) {
        clientToken = response.clientToken
        res.json({ token: clientToken }); 
    });
});

router.post("/purchase", function (req, res) {
    var nonce = req.body.payment_nonce;
    var amount = req.body.payment_amount;

    console.log(nonce);
    console.log(amount);

    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonce,
    }, function (err, result) {
        console.log(err);
        console.log(result);
        res.json({ result: result }); 
    });
});
router.get("/purchase", function (req, res) {
    // var nonce = req.body.payment_nonce;
    // var amount = req.body.payment_amount;    

    var nonce = 'a2b5e701-aebf-4eea-820a-c478f2a00038';
    var amount = '10.00';

    //http://localhost:51005/checkout.html?payment_method_nonce=48263bc8-fdf6-4d3b-a170-3ca60dd62fea
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonce,
    }, function (err, result) {
        console.log(err);
        console.log(result);
        // console.log(result.success); // true
        // console.log(result.customer.id); // e.g 160923
        // console.log(result.customer.creditCards[0].token); // e.g f28wm
        res.json({ err: err, result: result }); 
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
