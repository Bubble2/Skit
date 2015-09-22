var data = [
    {
        "name":"表单复合组件",
        "lists":[
            {
                "href":"\/@@@\/turn",
                "router":"(^\/@@@\/turn$)|(^\/@@@$)",
                "file":"@@@/turn",
                "name":"开关、锁定",
                "is-curr":false,
                "data":{}
            },
            {
                "href":"\/@@@\/progress",
                "router":"^\/@@@\/progress$",
                "file":"@@@/progress",
                "name":"进度条和刻度条",
                "is-curr":false,
                "data":{}
            },
            {
                "href":"\/@@@\/upload",
                "router":"^\/@@@\/upload$",
                "file":"@@@/upload",
                "name":"异步上传组件",
                "is-curr":false,
                "data":{}
            },
            {
                "href":"\/@@@\/pop-drop-tip",
                "router":"^\/@@@\/pop-drop-tip$",
                "file":"@@@/pop-drop-tip",
                "name":"输入框下拉提示",
                "is-curr":false,
                "data":{}
            },
            {
                "href":"\/@@@\/node-tree",
                "router":"^\/@@@\/node-tree$",
                "file":"@@@/node-tree",
                "name":"节点树",
                "is-curr":false,
                "data":{}
            },
            {
                "href":"\/@@@\/filter-menu",
                "router":"^\/@@@\/filter-menu$",
                "file":"@@@/filter-menu",
                "name":"筛选菜单",
                "is-curr":false,
                "data":{}
            }
        ]
    },
    {
        "name":"提示类组件",
        "lists":[
            {
                "href":"\/@@@\/tip",
                "router":"^\/@@@\/tip$",
                "file":"@@@/tip",
                "name":"提示框",
                "is-curr":false,
                "data":{}
            },
            {
                "href":"\/@@@\/pop-tip",
                "router":"^\/@@@\/pop-tip$",
                "file":"@@@/pop-tip",
                "name":"气泡提示框",
                "is-curr":false,
                "data":{}
            }
        ]
    },
    {
        "name":"模态弹窗",
        "lists":[
            {
                "href":"\/@@@\/pop",
                "router":"^\/@@@\/pop$",
                "file":"@@@/pop",
                "name":"模态弹窗",
                "is-curr":false,
                "data":{}
            }
        ]
    }
];

module.exports = function(replaced){

	if(typeof replaced !=="string"){
		return null;
	}

    var ret = [];
	
	data.forEach(function(currVal,index,currArr){
		var val = {"name":currVal.name,"lists":[]},
			lists = [];
		currVal.lists.forEach(function(item,jndex,currLists){

				var _regExp = new RegExp(item.router.replace(/@@@/g,replaced));
				
				var _item = {
                    "href":item.href.replace(/@@@/g,replaced),
                    "router":_regExp,
                    "file":item.file.replace(/@@@/g,replaced),
                    "name":item.name,
                    "is-curr":false,
                    "data":{}
                };
                lists.push(_item);
		});
		val.lists = lists;
		ret.push(val);
	});

	return ret;

}