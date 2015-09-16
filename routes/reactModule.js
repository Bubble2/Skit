var express = require('express');
var path = require('path');
var url = require('url');
var _ = require('underscore');
var menu = require('../modules/menu.json');

var router = express.Router();

var module_lst = menu['/module'];


/**
 * ��������·�ɽ���ǰҳ���Ӧ�Ĳ�����ʴ���Ϊѡ��״̬
 *
 * @return {function} ���ر����õ�������
 * @author shijinyu
 */
function setCurrentItem(arr,currUrl) {
    var _arr = _.extend([],arr);
    var currName;
    var newArr = _arr.map(function(currVal,i,thisArr){
        // console.log(currVal.lists);
        currVal.lists = currVal.lists.map(function(item,j,lists){
            if(new RegExp(item.router,"g").test(currUrl)){
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
 * ����json�������ɶ�Ӧ��·�ɷ���
 *
 * @param {string} reqUrl ��Ӧ��url
 * @param {function} customRouter �Զ���·�ɺ���
 * @return {void}
 * @author shijinyu
 */
function makeRouter(reqUrl,filePath,customRouter){

    console.log("------ make router ------");
    console.log("reqUrl:" + reqUrl);
    console.log("filePath:" + filePath);

    if(customRouter instanceof Function){
        router.get(reqUrl, function(req, res, next) {

            var mnu = setCurrentItem(module_lst,req.path);

            customRouter(req, res, next);

            next();
        });
    }
    else{
        router.get(reqUrl, function(req, res, next) {

            var mnu = setCurrentItem(module_lst,req.path);
            res.render(filePath,
                {
                    title: mnu[0],
                    menu: mnu[1]
                });

            next();
        });
    }
}

function regRouter(){
    _.each(module_lst,function(arrays, tit, selfObj){

        _.each(arrays.lists,function(mnuItem,i,selfArr){

            var comlineUrl = new RegExp(mnuItem.router,"g");

            // console.log("mnuItem:"+JSON.stringify(mnuItem));

            makeRouter(comlineUrl,mnuItem.file);

        });
    });
}

regRouter();

module.exports = router;
