;(function(window){
	var s = window.s = window.s || {};
	
	// render a html template from comments
	s.render = function (fn) {

		var reCommentContents = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)[ \t]*\*\//;

		if (typeof fn !== 'function') {
			throw new TypeError('Expected a function');
		}

		var match = reCommentContents.exec(fn.toString());

		if (!match) {
			throw new TypeError('Multiline comment missing.');
		}

		return match[1];
	};

	// get QueryString
	s.getQueryString = function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null){
    	return unescape(r[2]);
    }
    return null;
	};

	s.setCookie = function(name,value){
		var Days = 30;
  	var exp = new Date();
  	exp.setTime(exp.getTime() + Days*24*60*60*1000);
  	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	}

	var _regs = {
		"required":/\S+/,
		"email":/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g,
		"ip":/(\d+)\.(\d+)\.(\d+)\.(\d+)/g,
		"url":/[a-zA-z]+:\/\/[^\s]*/g,
		"mobile":/^1\d{10}$/gi,
		"tel":/^\d[\d\-]{6-17}$/g
	}

   console.log("core is loaded!");

})(window);