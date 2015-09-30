/**
 * Created by shijinyu on 2015/9/25.
 */
var fs = require('fs');
var path = require("path");



/*
* 合并请求文件
* @return 返回请求后的文件内容
* */

function combineFiles(files){
    var datas = [];

    // console.log("files:"+files);

    for(var i=0;i<files.length;i++){
        try{
            datas[i] = fs.readFileSync(files[i]).toString();

        }catch(err){
            datas[i] = "";
            console.log("Read File " + files[i] + " Error!");
            if(err instanceof Error){
                console.log("Error code:" + err.code);
                console.log("message:" + err.message);
            }
        }
    }

    // console.log(datas);

    return datas.join("\r\n");

}

/*
 * 合成新的文件名
 * @return 返回请求后的文件内容
 * */

function getCombineName(files){
    var str = ["cmb_"];
    for(var i=0;i<files.length;i++){
        var _str = files[i].split('\/'),
            fileName = _str[_str.length-1];
        str.push("_"+fileName);
    }
    return str.join("");
}

/*
 * 根据module和所需文件合成完整的文件路径
 * @param 1 String,模块名
 * @param 2 String,可选,所需文件名
 * @return 新的文件路径
 * */
function getLocate(mods,fileName){
    fileName = fileName || "";
    var filePath = path.join("./public/scripts/module/",mods, fileName);
    return filePath;
}

/*
*  接收请求并返回合并后的代码
*  @describe
*       ① 判断调用的文件是否都存在更新，如不存在更新，进入②，如存在，进入③
*       ② 调用getCombineName方法检查dist文件夹下是否已经存在需要的文件，若存在，读取并返回
*       ③ 若不存在，调用combineFiles生成合成后的代码并写入文件，返回文件，然后调用checkUpdate方法更新引用到的版本。
* */

function getCombine(mods){

    var datas;

    var filePaths = (function(){
            var _files = [];
            mods.forEach(function(value,index,arr){
                _files[index] = getLocate(mods[index],"index.js");
            });
            return _files;
        })(); // 返回包含每个模块js文件路径的数组，默认每个模块的主文件是index.js

    var combineName = getCombineName(mods);

    var isExistCombine = fs.existsSync("./dist/" + combineName + ".js");

    // 判断是否都存在更新，如有一个存在更新，则needUpdate为true

    var needUpdate = checkUpdate(mods,combineName);

    // 如果存在更新
    // 调用combineFile
    if(needUpdate || !isExistCombine){

        datas = combineFiles(filePaths);
        fs.writeFileSync("./dist/" + combineName + ".js",datas);


    }else{ // 如果不存在更新，直接读文件

        datas = fs.readFileSync("./dist/" + combineName + ".js");
    }


    return datas.toString();

}

/*
 * 检查单个模块的更新
 * @param String 需要检查的模块
 * @return Boolean 若存在更新返回 true
 * @describe
 *      ① 读取该模块的配置文件 package.json ，记录update，即时间戳
 *      ② 读取 dist/modules.json 下相应的字段（key为相应模块名称，value为时间戳）
 *      ③ 若dist下没有相应字段、或dist下相应字段小于模块的配置文件字段，则更新此字段并返回true
 *      ④ 若大于模块的配置文件字段，则更新此字段并返回false
 * */

function checkUpdate(mods,combineName){
    var modCfg = require("../dist/modules.json");
    var cfgs = (function(){
        var _cfgs = [];
        mods.forEach(function(value,index,arr){
            _cfgs[index] = getLocate(value,"package.json");
        });
        return _cfgs;
    })();
    var isUpdated = false;

    cfgs.forEach(function(cfg,index,arr){
        var cfgObj;
        try{
            cfgObj = JSON.parse(fs.readFileSync(cfg));
            if(mods[index] in modCfg){
                isUpdated = parseInt(cfgObj.update) >= parseInt(modCfg[mods[index]]) || isUpdated;
            }else{
                isUpdated = true;
                modCfg[mods[index]] = cfgObj.update;
            }
        }catch(err){

        }
    });

    if(combineName){
        var cmbCfg = require("../dist/combinedModules.json");
            cmbCfg[combineName] = "normal";
        fs.writeFileSync("./dist/combinedModules.json",JSON.stringify(cmbCfg));
    }

    fs.writeFileSync("./dist/modules.json",JSON.stringify(modCfg));

    return isUpdated;
}

/*
* 合并lib下的全部文件并缓存
* */

(function(){
    var data = combineFiles(['./public/scripts/lib/jquery.js','./public/scripts/lib/arttemplate.js']);
    fs.writeFileSync('./dist/lib.js',data);
})();

module.exports = {
    getCombine:getCombine,
    checkUpdate:checkUpdate
}