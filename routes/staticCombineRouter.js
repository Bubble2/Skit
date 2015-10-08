/* TODO:

  合并Javascript文件请求

  /js/libs ==> 合并 scripts/lib 下全部js代码并返回

  /js/router?js=a/b,a/c ==> 合并 scripts/a/b.js,scripts/a/c.js 并返回

*/

var express = require('express');

var router = express.Router();

var combineConfig = require('../modules/staticCombineConfig');

var fs = require("fs");

/*
*  combine javascripts requests as one
*
*  /mod?mod=turn,upload
*
* */

router.get("/mod",function(req, res, next){

    if(!("mod" in req.query)){
        console.log("mod is required!");
        res.end("");
        return ;
    }
    var mods = req.query.mod.split(",");
    var codes = combineConfig.getCombine(mods);

    res.type('application/javascript');

    res.send(codes);
});

router.get("/lib",function(req, res, next){
    var codes = fs.readFileSync("./dist/lib.js");
    res.type('application/javascript');
    res.send(codes);
});

module.exports = router;