;(function(window){


  var s = window.s = window.s || {};
  /*
	 * 
	 * @param $frm_item  jQuery对象 ：需要校验的输入框
	 * @param type       String： 校验类型
	 *            {
	 *						  "required":校验非空,
	 *						  "email":校验email格式,
	 *      			  "ip":校验是否是合法的IP地址,
	 *						  "url":校验合法的url,
	 *						  "mobile":校验手机号码,
	 *						  "tel":校验电话号码,
	 *						  "custom":自定义正则,
	 *            }
	 * @param custom_reg RegExp：自定义正则表达式，如type=="custom"，则此项必填，否则忽略
	 *
	 * 校验输入框设置：
	 *	data-vali-info ： 校验报错时需要显示的报错信息的选择器
	 */
	s.validate = function($frm_item,type,custom_reg){
		var l = $frm_item.length,
			ctrl_type = $frm_item.attr("type"),
			value = $frm_item.val(),
			vali_info = $frm_item.attr("data-vali-info") || false,
			vali = false;
		// execute value
		if(ctrl_type=="radio"){
			value = $frm_item.filter(":checked").val();
		}else if(ctrl_type=="checkbox"){
			value = [];
			$frm_item.filter(":checked").each(function(){
				value.push($(this).val());
			});
			value = value.join(",");
		}else if(/text|password|tel|number|hidden|url|search|file/g.test(ctrl_type)){
			value = $frm_item.val();
			// console.log(value);
		}
		// match rgg exp
		if(/required|email|ip|url|mobile|tel/g.test(type)){
			vali = sui._reg[type].test(value);
			// console.log(sui._reg[type]);

		}else if(type=="custom" && custom_reg instanceof RegExp){
			vali = custom_reg.test(value);
		}
		// show info
		if(!vali && vali_info){
			var $vali = $(vali_info).show();
		}
		return vali;
	};

	})(window)