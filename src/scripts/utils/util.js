var util={
	setFocus:function(el){
		el.addClass("active").siblings().removeClass("active");
	}
}
//使用module.exports这个方法将util暴露出去
module.exports=util;