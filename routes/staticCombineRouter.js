/* TODO:

  合并Javascript文件请求

  /js/libs ==> 合并 scripts/lib 下全部js代码并返回

  /js/router?js=a/b,a/c ==> 合并 scripts/a/b.js,scripts/a/c.js 并返回

*/

var express = require('express');

var router = express.Router();

router.get("/js/libs",function(){

});

router.get("/js/router",function(){

});

module.exports = router;