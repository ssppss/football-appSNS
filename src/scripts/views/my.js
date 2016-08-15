var myTpl=require("../templates/my.string");
SPA.defineView("my",{
	html:myTpl,
	plugins:["delegated"],
	bindEvents:{
		show:function(){
			/*var liveScroll=this.widgets["livenavScroll"];
			//console.log(liveScroll)
			liveScroll.options.scrollX=true;
			liveScroll.options.scrollY=false;*/
		}
	},
	bindActions:{
		"close":function(){
			this.hide();
		},
		"goto.register":function(){
			SPA.open("register",{
				ani:{
					name:"actionsheet",
					distance:300
				}
			})
		}
	}
})