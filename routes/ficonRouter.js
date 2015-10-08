var express = require('express');
var path = require('path');
var url = require('url');
var _ = require('underscore');

var ficonConfig = require('../modules/ficonConfig.js');

var router = express.Router();

var result = ficonConfig.render();

router.get('/req/ficon',function(req, res, next){
	console.log("/req/ficon",result);
	res.json(result);
	// next();
});

module.exports = router;