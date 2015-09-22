;(function($,window,undefined){

	// declare
	
	var doc = window.doc = doc || {};

	doc.getFicon = function(){

		$.getJSON("/req/ficon",function(data){
			var render = template("tmpFontPreview",{
				"data":data
			});
			$("#fontPreview").html(render);

			var $inputUnicode = $("#fontPreview").find(".js-selected"),
					$search = $("#fontPreview").find(".js-search"),
					$items = $("#fontPreview").find(".font-prev-item");
			var tmpTimeout = null;
			$inputUnicode.on("mouseenter",function(){
				$inputUnicode.blur();
				$(this).select();
			});
			$search.on("keydown",function(){
				clearTimeout(tmpTimeout);
				tmpTimeout = setTimeout(function(){
					var keyword = $search.val();
					if(!keyword){
						$items.show();
						return;
					}
					$items.each(function(index){
						var itemKey = $(this).attr("data-value");
						if(itemKey.indexOf(keyword)>-1){
							$(this).show();
						}else{
							$(this).hide();
						}
					});
				});
			});

		});
	}

	$(function(){

		// run
		
		doc.getFicon();

	});

})(jQuery,window)