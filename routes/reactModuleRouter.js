var express = require('express');
var path = require('path');
var url = require('url');
var _ = require('underscore');
var navConfig = require('../modules/navConfig');
var menu = require('../modules/reactModuleConfig');

var router = express.Router();

var sideMenu = menu['menu'];


/**
 * 根据请求路由将当前页面对应的侧边栏彩带置为选中状态
 *
 * @return {function} 返回被配置的新数组
 * @author shijinyu
 */
function setCurrentItem(arr,currUrl) {
    var _arr = _.extend([],arr);
    var currName;
    var newArr = _arr.map(function(currVal,i,thisArr){
        // console.log(currVal.lists);
        currVal.lists = currVal.lists.map(function(item,j,lists){
            if(item.router.test(currUrl)){
                item["is-curr"] = true;
                currName = item.name;
            }else{
                item["is-curr"] = false;
            }
            return item;
        });
        thisArr.currName = currName || "";
        // console.log("currName: "+thisArr.currName);
        return currVal;
    });

    return [currName,newArr];
}

/**
 * 根据json配置生成对应的路由方法
 *
 * @param {string} reqUrl 对应的url
 * @param {function} customRouter 自定义路由函数
 * @return {void}
 * @author shijinyu
 */
function makeRouter(reqUrl,filePath,customRouter){

    console.log("------ make router ------");
    console.log("reqUrl:" + reqUrl);
    console.log("filePath:" + filePath);

    if(customRouter instanceof Function){
        router.get(reqUrl, function(req, res, next) {

            var mnu = setCurrentItem(sideMenu,req.path);

            customRouter(req, res, next);

            next();
        });
    }
    else{
        router.get(reqUrl, function(req, res, next) {

            var mnu = setCurrentItem(sideMenu,req.path);
            res.render(filePath,
                {
                    nav:navConfig,
                    menuIndex:menu.index,
                    crumbs:[mnu[0]],
                    title: mnu[0],
                    menu: mnu[1]
                });

            next();
        });
    }
}

function regRouter(){
    _.each(sideMenu,function(arrays, tit, selfObj){

        _.each(arrays.lists,function(mnuItem,i,selfArr){

            var comlineUrl = mnuItem.router; // new RegExp(mnuItem.router,"g");

            // console.log("mnuItem:"+JSON.stringify(mnuItem));

            makeRouter(comlineUrl,mnuItem.file);

        });
    });
}

regRouter();

module.exports = router;
