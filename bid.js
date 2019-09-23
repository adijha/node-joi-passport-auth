const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const User = require( '../../models/User' );

const Insta = require('instamojo-nodejs');
const url = require('url');

// /api/bid/pay
router.post('/pay', (req, res) => {
  const body = JSON.parse(req.body);
  Insta.setKeys('test_c496eefc2cceece396905f07440', 'test_b7781fba1a5e484e80cde59e36b');

  const data = new Insta.PaymentData();
  Insta.isSandboxMode(true);

  data.purpose = body.purpose;
  data.amount = body.amount;
  data.buyer_name = body.buyer_name;
  data.redirect_url = body.redirect_url;
  data.email = body.email;
  data.phone = body.phone;
  data.send_email = false;
  data.webhook = 'http://www.example.com/webhook/';
  data.send_sms = false;
  data.allow_repeated_payments = false;

  Insta.createPayment(data, function(error, response) {
    if (error) {
      // some error
    } else {
      // Payment redirection link at response.payment_request.longurl
      const responseData = JSON.parse(response);
      const redirectUrl = responseData.payment_request.longurl;
      // console.log( redirectUrl );

      res.send(redirectUrl);
    }
  });
});

/**
 * @route GET api/bid/callback/
 * @desc Call back url for instamojo
 * @access public
 */
router.get('/callback/', (req, res) => {
  let url_parts = url.parse(req.url, true),
    responseData = url_parts.query;

  // if ( responseData.payment_id ) {
  //  let userId = responseData.user_id;

  //  // Save the info that user has purchased the bid.
  //  const bidData = {};
  //  bidData.package = 'Bid100';
  //  bidData.bidCountInPack = '10';

  // User.findOneAndUpdate( { _id: userId }, { $set: bidData }, { new: true } )
  //  .then( ( user ) => res.json( user ) )
  //  .catch( ( errors ) => res.json( errors ) );

  // Redirect the user to payment complete page.
  return res.redirect('http://167.71.233.213/payment-complete');
  // }
});

// We export the router so that the server.js file can pick it up
module.exports = router;
