var fs = require('fs');
var path = require("path");

var fiData;

function init(){
	try {
		fiData = fs.readFileSync('./public/sass/font_icons/_variables.scss','utf-8');

	}catch(err){
		console.error("Read File Error!");
		if(err instanceof Error){
			console.log("Error code:" + err.code);
			console.log("message:" + err.message);
		}
	}
}

function makeJson(){

	var filterData ={
		"font-size-base":undefined,
		"css-prefix":undefined,
		"version":undefined,
		"fonts":[]
	};

	fiData.replace(/\/\*(\s|.)*\*\//g,"\r").split('\r').forEach(function(currVal,index,currArr){
		// 丢弃注释
		if(/\/\/(.|\s)*/.test(currVal) || /^[\s\n\r]+$/.test(currVal)){
			console.log("! ignore:" + currVal);
			return ;
		}

		var _tmp = currVal.split(":"),
				key = _tmp[0].replace(/\$fi\-/,"").replace(/[\s]/g,""),
				val = _tmp[1].replace(/(\!default)|[\;\s\"]/g,"");

		// 匹配 基本信息
		if(/\$fi-(?!var){1}(.*)/g.test(currVal)){
			filterData[key] = val.replace(/[\r\n\s]/g,"");
			// console.log("! set:" + filterData[key]);
		}
		// 匹配 字符
		else if(/(\$fi\-var\-)(.*)/g.test(currVal)){
			filterData.fonts.push({
				"name":key.replace("var-",""),
				"value":val.replace(/[\r\n\s\\]/g,"")
			});
			// console.log("! set:{\nname:" + key.replace("var-","") + "\nvalue:" + val +"\n}");
		}
	});

	return filterData;
}

init();

module.exports = {
	reload:init,
	render:makeJson
}
