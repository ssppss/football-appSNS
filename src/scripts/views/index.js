var indexTpl=require("../templates/index.string");//引入模板

var util=require("../utils/util");
//定义视图
SPA.defineView("index",{
	html:indexTpl,//定义HTML
	plugins:["delegated"],//引入gelegated插件，用于定义tap事件
	//定义子视图 主页
	modules:[{
		name:"content",
		defaultTag:"home",
		views:["home","find","my"],
		container:".wrap"
	}],
	bindEvents:{
		// 视图显示出来之前执行的回调函数
		beforeShow:function(){
            //console.log("before");
		},
		show:function(){
			//var myscroll=new IScroll("#listscroll");
		}
	},
	bindActions:{
		"switch.tabs":function(e,data){
			//当前高亮显示
			util.setFocus($(e.el));
			//切换子视图
			this.modules.content.launch(data.tag);
		},
		"goto.my":function(){
			SPA.open("my",{
				ani:{
					name:"dialog",
					width:280,
					height:140
				}
			})
		},
		"goto.search":function(){
			SPA.open("find",{
				ani:{
					
				}
			})
		}
	}
})

/*function renderData(data){
	var str='',item=render.data;
	for(var i=0;i<item.length-1;i++){
		if(i%2==0){
			str+="<ul><li>"
				+"<img src="+item[i].img+"></img>"
				+"<b>"+item[i].title+"</b>"
			+"</li>" 
			+"<li></li>"
		}if(i%2==1){
			str+="<li>"
			+"<img src="+item[i].img+"></img>"
			+"<b>"+item[i].title+"</b>"
			+"</li></ul>"
		}
	}
	$(".scroller").html(str);
}*/