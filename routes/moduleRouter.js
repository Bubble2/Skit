var express = require('express');
var path = require('path');
var url = require('url');
var _ = require('underscore');
var navConfig = require('../modules/navConfig');
var jqMenu = require('../modules/jqueryModuleConfig');
var reMenu = require('../modules/reactModuleConfig');

var router = express.Router();


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
 * 解析json路由配置
 *
 * @param {object} data 配置信息
 * @return {void}
 * @author shijinyu
 */
function regRouter(data){

    var sideMenu = data.menu;

    console.log(data);

    sideMenu.forEach(function(menuItem, index, _menu){

        menuItem.lists.forEach(function(item,i,selfLst){

            // console.log("mnuItem:"+JSON.stringify(mnuItem));

            // makeRouter(item.router,item.file,data,sideMenu);

            console.log("------ make router ------");
            console.log("reqUrl:" + item.router);
            console.log("filePath:" + item.file);

            router.get(item.router, function(req, res, next) {

                var mnu = setCurrentItem(sideMenu,req.path);

                res.render(item.file,
                    {
                        nav:navConfig,
                        menuIndex:data.index,
                        crumbs:[mnu[0]],
                        title: mnu[0],
                        menu: mnu[1]
                    });

                // next();
            });

        });
    });
}

regRouter(jqMenu);
regRouter(reMenu);

module.exports = router;
