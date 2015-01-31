// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
// var braintree  = require('braintree');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 51005;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/login', function(req, res) {
    res.sendfile(__dirname + 'login.html');
    // var connect = require('connect');
    // var serveStatic = require('serve-static');
    // connect().use(serveStatic(__dirname)).listen(51005);
});

router.get('/braintree', function(req, res) {
    // var gateway = braintree.connect({
    //     environment: braintree.Environment.Sandbox,
    //     merchantId: "v6pkkfspb62fycn7",
    //     publicKey: "b4ggz2gtm4myv8nk",
    //     privateKey: "576267fe9238a5d2bdda0da8ede05dd2"
    // });
    // var clientToken = '';
    // gateway.clientToken.generate({}, function (err, response) {
    //     clientToken = response.clientToken
    //     // console.log(clientToken);
    //     res.locals.token = clientToken;
    // });
    // console.log(clientToken);
    res.locals.other = 'blah';
    res.sendfile('braintree.html');
});

app.post("/purchase", function (req, res) {
    var nonce = req.body.payment_method_nonce;
    gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: nonce,
    }, function (err, result) {
        console.log(result.success); // true
        console.log(result.customer.id); // e.g 160923
        console.log(result.customer.creditCards[0].token); // e.g f28wm
    });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(express.static('./public'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
