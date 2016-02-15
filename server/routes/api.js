var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Api Home' });
});


router.get('/user/:id', function(req, res, next){

    var id = req.params.id;

    var headers = {
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json, text/javascript, */*; q=0.01'
    };

    var dataString = 'wscid=' + id;

    var options = {
        url: 'http://swingdancecouncil.herokuapp.com/pages/dancer_point_history.json',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        var modifiedBody = body.substring(0,body.length)
        //var mBody = body.replace(/\\);
        //res.json(modifiedBody);
        //res.json(mBody);
        //res.json(modifiedBody);
        res.send(body);
    };

    request(options, callback);


});


router.get('/userList/:string', function(req, res, next){

    var string = req.params.string;

    var options = {

        url: 'http://swingdancecouncil.herokuapp.com/pages/dancer_search_by_fragment.json?term=' + string,
        method: 'GET'

    };

    function callback(error, response, body){

        res.send(body);

    };


    request(options, callback);

});


router.get('/events', function(req, res, next){

    var options = {

        url: 'https://api.import.io/store/connector/84e644e0-2b53-456f-b899-60d56fbd4a44/_query?input=webpage/url:http%3A%2F%2Fswingdancecouncil.com%2FActiveServerPages%2FUpcomingEvents.asp&&_apikey=06dfaed03c8c43d2b9c0337fb40708b3a34785bbd85ca1066d8fbd68a4e443a440a7a2bf6956ce30d6f923547a3540ad1c30245011346d77991b7b26047961c806d918a9761c4dc741c0d0c747eef47d',
        method: 'GET'
    };

    function callback(error, response, body){

        var temp = body;

        //temp = temp.replace('/')

       res.send(body);
    }

    request(options, callback);
});

router.get('/events2', function(req, res, next){

    var options = {

        url: 'https://www.kimonolabs.com/api/aioqtts6?&kimmodify=1',
        method: 'GET',
        apikey: 'jnDt83QRwizSddTVAdamsdnPLfwlD4vV'
    };

    function callback(error, response, body){

        res.send(body);
    }

    request(options, callback);
});



module.exports = router;