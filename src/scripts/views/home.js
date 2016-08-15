var homeTpl=require("../templates/home.string");


var util=require("../utils/util");
SPA.defineView("home",{
	html:homeTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.livedata=[];
		}
	}],
	//初始化
	init:{
		vm:null, 
        livelistArr:[],
        homeSlider:null,
        hotSlider:null,
		formatData:function(data){
			var tempArr=[];
			for(var i=0;i<Math.ceil(data.length/2);i++){
				tempArr[i]=[];
				tempArr[i].push(data[2*i]);
				tempArr[i].push(data[2*i+1]);
			}
			return tempArr;
		}
	},
	bindEvents:{
		beforeShow:function(){
			//获取视图
			var that=this;
			//获取vm
			that.vm = this.getVM();
			$.ajax({
				//url:"/football-app/mock/livelist.json",
				url:"/api/getLivelist.php",
				type:"get",
				data:{
					rtype:"origin"
				},
				success:function(rs){
					that.livelistArr = rs.data;
                 	that.vm.livedata = that.formatData(rs.data);
				},
				error:function(){
					console.log("数据连接失败！")
				}
			})
		},
		show:function(){
			var that = this;
			this.hotSlider=new Swiper("#swiper-con",{
				loop:false,
				onSlideChangeStart:function(swiper){
					//swiper这个参数是对newSwiper出来的实例的引用
					var index=swiper.activeIndex;
					var $tags=$("#title li");
					util.setFocus($tags.eq(index));
				}
			})
			this.homeSlider=new Swiper("#swiper-slide",{
				loop:false,
				onSlideChangeStart:function(swiper){
					//swiper这个参数是对newSwiper出来的实例的引用
					var index=swiper.activeIndex;
					var $tags=$(".home nav li");
					util.setFocus($tags.eq(index));
				}
			})
			//解决iscroll与swiper的冲突
			//获取视图下指定的widget
			  var myScroll=this.widgets.homeListScroll;
			  var scrollSize = 30;
		      myScroll.scrollBy(0,-scrollSize);

		      var top=$(".top img"),
		          topImgHasClass=top.hasClass("up");
		      var bottom=$(".bottom img"),
		          bottomImgHasClass=top.hasClass("down");
		      myScroll.on("scroll",function(){
		        var y=this.y,
		            maxY=this.maxScrollY-y;
		            if(y>=0){
		                 !topImgHasClass && top.addClass("up");
		                 return "";
		            }
		            if(maxY>=0){
		                 !bottomImgHasClass && bottom.addClass("down");
		                 return "";
		            }
		      })

		      myScroll.on("scrollEnd",function(){
		        if(this.y>=-scrollSize && this.y<0){
		              myScroll.scrollTo(0,-scrollSize);
		              top.removeClass("up");
		        }else if(this.y>=0){
		              top.attr("src","/football-app/images/ajax-loader.gif");
		            
		            setTimeout(function(){
		                  myScroll.scrollTo(0,-scrollSize);
		                  top.removeClass("up");
		                  top.attr("src","/football-app/images/arrow.png");
		            },1000)
		        }

		        var maxY=this.maxScrollY-this.y;
		        var self=this;
		        if(maxY>-scrollSize && maxY<0){
		              myScroll.scrollTo(0,self.maxScrollY+scrollSize);
		              bottom.removeClass("down")
		              console.log("refresh");
		        }else if(maxY>=0){
		            bottom.attr("src","/football-app/images/ajax-loader.gif")
		              // 请求加载数据
		              $.ajax({
		                  //url:"/football-app/mock/livelist.json",  mock数据
		                  url:"/api/getLivelist.php",
		                  type:"get",
		                  data:{
		                     rtype:"refresh"
		                  },
		                  success:function(rs){
		                   /*  var arr = that.livelistArr.concat(rs.data);
		                     that.vm.livedata = that.formatData(arr);
		                     that.livelistArr = arr;*/

		                     that.livelistArr = rs.data.concat(that.livelistArr);
		                     that.vm.livedata = that.formatData(that.livelistArr);   
		                     //console.log(that.vm.livedata);

		                     myScroll.scrollTo(0,-scrollSize);
			                 top.removeClass("up");
			                 top.attr("src","/football-app/images/arrow.png");
		                  }
		              })
		          }
		      })
		}
	},
	bindActions:{
		"tag.list":function(e){
			var index=$(e.el).index();
			this.hotSlider.slideTo(index);
		},
		"tag.slide":function(e){
			var index=$(e.el).index();
			this.homeSlider.slideTo(index);
		},
		"goto.detail":function(){
			SPA.open("detail"); //open用于打开一个新视图
		}
	}
})