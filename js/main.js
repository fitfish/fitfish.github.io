document.addEventListener('DOMContentLoaded',function(){
	var oCavs = document.getElementById('canvas');
	var oContent = document.getElementById('content');

	var screenH = window.innerHeight;
	var screenW = window.innerWidth;
	document.body.style.height = screenH + 'px';
	oCavs.style.height = screenH + 'px';

	if( 400 > screenH){
		alert('姿势不正确');
	}


	//首屏
	(function(){

		//添加图标
	
		//信息
			var skill = [
				{
					name: 'HTML',
					img: 'img/html.png'
				},
				{
					name: 'CSS',
					img: 'img/css.png'
				},
				{
					name: 'HTML5',
					img: 'img/html5.png'
				},
				{
					name: 'CSS3',
					img: 'img/css3.png'
				},
				{
					name: 'JS',
					img: 'img/js.png'
				},
				{
					name: 'JQuery',
					img: 'img/jquery.png'
				},
				{
					name: 'Ajax',
					img: 'img/ajax.png'
				},
				{
					name: 'Seajs',
					img: 'img/seajs.png'
				},
				{
					name: 'Node',
					img: 'img/node.png'
				},
				{
					name: 'Http',
					img: 'img/http.png'
				}
			];

			var intro = [
				{
					id: 'resume',
					name: '个人简介', //回到首页
					img: 'img/me.png'
				},
				{
					id: 'weixin',
					name: '加我好友', //二维码
					img: 'img/erweima.png'
				},
				{
					id: 'contact',
					name: '联系我', //EMAIL PHP NODEJS?
					img: 'img/contact.png'
				}
			];

		// {
		// 	画布宽:320px  画布高：未知
		// 	图标宽：50px 图标高: 50px
		// 	图标列数：4  图标行数: 5 
		// 	图标左间距: 24px 图标下间距: 40px
		// 	图标圆角：20%
		// 	底栏宽：100% 底栏高：96px
		// 	底栏图标上高: 16px
		// }

		//内容图标宽高
		var row = 4; //行
		var col = 4; //列
		var size = 50 //icon的大小 
		var spaceX = (320-size*col)/(col+1) //icon的水平间距
		var spaceY = 40 //icon的图标下间距

		oContent.style.height = (size+spaceY)*row + 'px';


		//存content中的Icon位置(宽的百分比)、行列
		var aPos = []; 
		for(var i = 0; i < row; i++){
			for(var j = 0; j < col; j++){
				var pos = {};
				pos.id = i*col + j; //数组下标
				pos.row = i;
				pos.col = j;
				pos.top =  i*(size+spaceY);  //0 ,size+spaceX 
				pos.left = (j+1)*spaceX + j*size; // spaceX , 2*spaceX+ size 
				aPos.push(pos);
			}
		}


		//创建content中的icon
		for(var i = 0; i < skill.length; i++){
			var oIcon = document.createElement('div');
			oIcon.className = 'icon app';
			oIcon.id = skill[i].name;
			oIcon.setAttribute('data-positionId',aPos[i].id);
			oIcon.style.width = size + 'px';
			oIcon.style.height = size + 'px';
			oIcon.style.backgroundImage = 'url('+ skill[i].img +')';
			oIcon.style.webkitTransform = 'translate3d('+aPos[i].left+'px,'+aPos[i].top+'px,0)';

			//aPos[i].name = skill[i].name;
			//创建文字
			var oSpan = document.createElement('span');
			oSpan.innerHTML = skill[i].name;
			oSpan.className = 'name';
			oIcon.appendChild(oSpan);
			oContent.appendChild(oIcon);
		}

		//存底部所有icon位置
		var aBtmPos = [];
		var btmCol = intro.length;
		var btmSpaceX =(320-size*btmCol)/(btmCol+1);
		for(var i = 0; i < btmCol; i++){
			var pos = {};
			pos.id = i //数组下标
			pos.top =  16;
			pos.left = (i+1)*btmSpaceX + i*size; 
			aBtmPos.push(pos);
		}
		// 三图标 二图标 一图标
		var oBtm = document.getElementById('bottom');
		//创建底部icon
		for(var i = 0; i < btmCol; i++){
			var oIcon = document.createElement('div');
			oIcon.className = 'icon key';
			oIcon.id = intro[i].id;
			oIcon.setAttribute('data-positionId',aBtmPos[i].id);
			oIcon.style.width = size + 'px';
			oIcon.style.height = size + 'px';
			oIcon.style.backgroundImage = 'url('+ intro[i].img +')';
			oIcon.style.webkitTransform =  'translate3d('+aBtmPos[i].left+'px,'+aBtmPos[i].top+'px,0)';
			//创建文字
			var oSpan = document.createElement('span');
			oSpan.innerHTML = intro[i].name;
			oSpan.className = 'name';
			oIcon.appendChild(oSpan);
			oBtm.appendChild(oIcon);
		}
		



		var oMain = document.getElementById('main');
		oMain.addEventListener('touchstart',addTouch,false);
		//添加点击事件
		(function(){
			var aIcon=document.getElementsByClassName('icon');
			var oAppBox = document.getElementById('appbox');

			var oHead = document.getElementsByTagName('head')[0];

			oMain.clickFn = function(ev){
				var target = ev.target || ev.srcElement;
				if(hasClass(target,'icon')){
					oAppBox.style.display = 'block';
					setTimeout(function(){
						oMain.style.webkitTransform = 'scale(1.2)';
						oMain.style.opacity = 0.5;
						oAppBox.style.webkitTransform = 'scale(1)';
						oAppBox.style.opacity = 1;
						ajax('apps/'+target.id+'.data',function(str){
							setTimeout(function(){
								oAppBox.innerHTML = str;
								//添加APP js文件
								var oScr = document.createElement('script');
								oScr.src = 'js/'+target.id+'.js';
								oHead.appendChild(oScr);
								//添加APP css文件
								var oLink = document.createElement('link');
								oLink.rel = 'stylesheet';
								oLink.href = 'css/'+target.id+'.css'
								oHead.appendChild(oLink);
								//关闭事件
								addClose(oScr,oLink);
							},500);
						});
					},100);
				}
			};

			function addClose(oScr,oLink){
				var oCloseBtn = oAppBox.getElementsByClassName('js-close')[0];
				oCloseBtn.addEventListener('touchstart',addTouch,false);
				oCloseBtn.clickFn = function(ev){
					oMain.style.webkitTransform = 'scale(1)';
					oMain.style.opacity = 1;
					oAppBox.style.webkitTransform = 'scale(0.5)';
					oAppBox.style.opacity = 0;
					setTimeout(function(){
						oAppBox.style.display = 'none';
						oAppBox.innerHTML = '';
						oHead.removeChild(oScr);
						oHead.removeChild(oLink);
					},600);
				};
			}
		})();

		var zIndex = 10;
		var oDotted = document.getElementById('dotted'); //虚线框
		var aIcon = document.getElementsByClassName('app');
		//添加长按事件
		(function(){
			oMain.pressFn = function(ev){
				var target = ev.target;
				if(hasClass(target,'icon')){
					//拖拽
					var left = getTranslate(target).left;
					var top = getTranslate(target).top;
					target.style.webkitTransition = '-webkit-transform  0.5s ease';
					target.style.webkitTransform = ' translate3d('+left+'px,'+top+'px,0) scale(1.15)';
					target.style['z-index'] = zIndex++;
					
					target.positionId=aPos[target.getAttribute('data-positionId')].id;
					//留框
					addDotted(target);
					target.addEventListener('touchstart',addTouch,false);

					target.finish = true;

					oMain.moveFn = function(ev,disX,disY){
						target.style.webkitTransition = '-webkit-transform  0 linear';
						target.style.webkitTransform = ' translate3d('+(disX+left)+'px,'+(disY+top)+'px,0) scale(1.15)';

						changePos(target,{top: (disY+top), left: (disX+left)}); //改变元素位置

					};
					oMain.completeFn = function(){
						target.style.webkitTransition = '-webkit-transform 0.5s ease';
						target.style.webkitTransform = 'translate3d('+aPos[target.positionId].left+'px,'+aPos[target.positionId].top+'px,0) scale(1) ';
						//框消失
						oDotted.style.display = 'none';
						oMain.moveFn = oMain.completeFn = null;
					};

				}
			};

			//获取translte值
			function getTranslate(obj){
				var arr = [];
				arr = getComputedStyle(obj,false)['-webkit-transform'].split(',');

				return {top: parseInt(arr[arr.length - 1]),left: parseInt(arr[arr.length - 2])}
			}


			//改变位置
			function changePos(obj,json){
				//改变位置
				obj.target = getTarget(obj,json); //获取换位置的对象;
				if(obj.target && obj.finish){

					obj.finish = false;
					obj.positionId = parseInt(obj.getAttribute('data-positionId'));
					obj.target.positionId = parseInt(obj.target.getAttribute('data-positionId'));
					var minId = Math.min(obj.positionId,obj.target.positionId);
					var maxId = Math.max(obj.positionId,obj.target.positionId);
					if(obj.positionId > obj.target.positionId){
						var bBack = true;
					}
					// 中间的Icon移动位置
					for(var i = 0; i < aIcon.length; i++){
						if((aIcon[i].getAttribute('data-positionId') > minId) && (aIcon[i].getAttribute('data-positionId') < maxId)){ //判断夹在中间的元素
							
							if(bBack){ //target向后移动
								aIcon[i].positionId = parseInt(aIcon[i].getAttribute('data-positionId')) + 1;

							}
							else{ //target向前移动
								aIcon[i].positionId = parseInt(aIcon[i].getAttribute('data-positionId')) - 1;
							}
							aIcon[i].setAttribute('data-positionId',aIcon[i].positionId); 
							aIcon[i].style.webkitTransform = 'translate3d('+aPos[aIcon[i].positionId].left+'px,'+aPos[aIcon[i].positionId].top+'px,0)';
							aIcon[i].style.webkitTransition = '-webkit-transform  0.5s ease;'
						}
					}
					// 改变当前对象的位置属性
					obj.positionId = parseInt(obj.target.getAttribute('data-positionId'));
					obj.setAttribute('data-positionId',obj.positionId);
					addDotted(obj); //添加虚线框

					// 目标对象移动位置
					if(bBack){
						obj.target.positionId = obj.positionId + 1;
					}else{
						obj.target.positionId = obj.positionId - 1;
					}
					obj.target.setAttribute('data-positionId',obj.target.positionId ); 
					obj.target.style.webkitTransition = ' -webkit-transform  0.5s ease;'
					obj.target.style.webkitTransform = 'translate3d('+aPos[obj.target.positionId].left+'px,'+aPos[obj.target.positionId].top+'px,0)';
					setTimeout(function(){
						//运动完成
						obj.finish = true;
						obj.target = null;
					},500);
				}
			}

			// 8.拖拽留虚线框
			function addDotted(obj){
				var l = aPos[obj.positionId].left;
				var t = aPos[obj.positionId].top;
				oDotted.style.display = 'block';
				oDotted.style.webkitTransform = 'translate3d('+l+'px,'+ t +'px,0)';
			}


			//返回要换位置的对象
			function getTarget(obj, json){
				var selfId = parseInt(obj.getAttribute('data-positionid'));
				//超出高度 
				//高度之内接触
				for(var i = 0; i < aIcon.length; i++){
					if(i == selfId){
						continue;
					}
					var a = aPos[i].top - json.top;
					var b = aPos[i].left - json.left;
					var dis = Math.sqrt(a*a+b*b);
					
					if(dis < 35){
						for(var j = 0; j < aIcon.length; j++){
							if(aIcon[j].getAttribute('data-positionid') == i){
								return aIcon[j];
							}
						}
					}
				}
			}


		})();
	})();
	
	//遮罩
	(function(){

		// <div class="top"></div>
		// <div class="time"><p>'+hours+':'+minius+'</p><p>3月15日</p></div>
		// <div class="weather"><p>北京</p><p>白天</p><p>气温：12~13℃</p><p>微风：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一级</p><p>夜晚</p><p>气温：12~13℃</p><p>微风：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二级</p></div>

		//创建
		var oMask = document.getElementById('mask');
		var oTime = oMask.querySelector('.time');
		var oWeather = oMask.querySelector('.weather');


		var oScr = document.createElement('script');
		var oHead = document.getElementsByTagName('head')[0];
		oScr.src = "http://cdn.weather.hao.360.cn/api_weather_info.php?app=hao360&_jsonp=smartloaddata101190101&code=101010300";
		oHead.appendChild(oScr);

		window.smartloaddata101190101 = function(json){
			console.log(json);
			console.log('地点：'+json.area[0][0]+'天气：'+json.weather[0].info.day);
			oWeather.innerHTML = '<p>'+json.area[0][0]+
				'</p><p>白天</p><p>气温：'+json.weather[0].info.day[0]+'~'+json.weather[0].info.day[2]+
				'℃</p><p>'+json.weather[0].info.day[3]+
				'：&nbsp;&nbsp;&nbsp;&nbsp;'+json.weather[0].info.day[4]+
				'</p><p>晚上</p><p>气温：'+json.weather[0].info.night[0]+'~'+json.weather[0].info.night[2]+
				'℃</p><p>'+json.weather[0].info.night[3]+
				'：&nbsp;&nbsp;&nbsp;&nbsp;'+json.weather[0].info.night[4]
			oHead.removeChild(oScr);
		};

		//设置时间
		setTime();
		setInterval(function(){
			setTime();
		},1000);

		function setTime(){
			var oDate = new Date();
			var month = (oDate.getMonth() + 1) + '';
			var date = oDate.getDate() + '';
			var hours = toDub(oDate.getHours());
			var minius = toDub(oDate.getMinutes());
			oTime.innerHTML = '<p>'+hours+':'+minius+'</p><p>'+month+'月'+date+'日</p>';
		}


		function toDub(num){
			if(num < 10){
				return ('0' + num); 
			}else{
				return ('' + num);
			}
		}


		oMask.addEventListener('touchstart',addTouch,false);
		oMask.moveFn = function (ev,disX,disY){
			if(disY > 0){
				disY = 0;
			}
			this.style.webkitTransform = 'translate3d(0,'+disY+'px,0)';
			this.style.webkitTransition = '-webkit-transform 0 linear';
		};
		oMask.slowFn = function (ev,disX,disY){
			if(disY < -200 ){
				this.style.webkitTransform = 'translate3d(0,-'+700+'px,0)';
				this.style.webkitTransition = '-webkit-transform  0.8s ease';
				setTimeout(function(){
					oMask.style.display = 'none';
					oMask.completeFn = function (){
						oMask.moveFn = oMask.slowFn = oMask.upFn = oMask.completeFn = null;
					};
				},1000);
			}else{
				this.style.webkitTransform = 'translate3d(0,0,0)';
				this.style.webkitTransition = '-webkit-transform  0.8s ease';
			}
		};
		oMask.upFn = function (){
			this.style.webkitTransform = 'translate3d(0,-'+700+'px,0)';
			this.style.webkitTransition = '-webkit-transform  0.8s ease';
			setTimeout(function(){
				oMask.style.display = 'none';
				oMask.completeFn = function (){
					oMask.moveFn = oMask.slowFn = oMask.upFn = oMask.completeFn = null;
				};
			},1000);
		};




	})();



	//app
	// (function(){
		//Switch
		// (function (){
		// 	var oMain = document.getElementById('main');
		// 	var oAppBox = document.getElementById('appbox');
		// 	var oJs = document.getElementById('JS');


		// 	var oSwitch = document.getElementById('switch');
		// 	var oUl = document.querySelector('#switch .box ul')
		// 	var oClose = oSwitch.getElementsByClassName('close')[0];

		// 	//打开app
		// 	oClose.addEventListener('touchstart',click,false);
		// 	oJs.addEventListener('touchstart',click,false);
		// 	//关闭app
		// 	// oJs.addEventListener('touchstart',click,false);
		// 	// opcity 0 - > 1
		// 	// scale  0.5 - > 1
		// 	function test(){
		// 		console.log('test');
		// 	}

		// 	//打开app
		// 	oJs.clickFn = function() {
		// 		//显示页面
		// 		oAppBox.style.display = 'block';
		// 		oSwitch.style.display = 'block';
		// 		setTimeout(function(){
		// 			oMain.style.webkitTransform = 'scale(1.5)';
		// 			oMain.style.opacity = 0.5;
		// 			oSwitch.style.webkitTransform = 'scale(1)';
		// 			oSwitch.style.opacity = 1;
		// 		},1);
		// 		//初始化数据
		// 		setData();
		// 		oUl.addEventListener('touchstart',changeImg,false);
		// 		autoNext();
		// 	};

		// 	//关闭app
		// 	oClose.clickFn = function(){
		// 		console.log('close')
		// 		//关闭页面
		// 		oMain.style.webkitTransform = 'scale(1)';
		// 		oMain.style.opacity = 1;
		// 		oSwitch.style.webkitTransform = 'scale(0.2)';
		// 		oSwitch.style.opacity = 0;
		// 		setTimeout(function(){
		// 			oAppBox.style.display = 'none';
		// 			oSwitch.style.display = 'none';
		// 			//结束本页面事件
		// 			oUl.removeEventListener('touchstart',changeImg,false);
		// 			clearInterval(oUl.timer);
		// 			oUl.timer = null;

		// 		},500);

		// 	};


		// 	//初始化数据
		// 	setData();
		// 	//滑动换页
		// 	oUl.addEventListener('touchstart',changeImg,false);
		// 	//自动换页
		// 	autoNext();

		// 	//初始化数据
		// 	function setData(){
		// 		oUl.acount = oUl.children.length;
		// 		oUl.childWith = oUl.children[0].offsetWidth;

		// 		oUl.btn = document.querySelectorAll('.box ol li');
		// 		//存位置
		// 		oUl.aPos = [];
		// 		for(var i = 0; i < oUl.acount; i++){
		// 			var _pos = {};
		// 			_pos.index = i;
		// 			_pos.x = -i*oUl.childWith;
		// 			oUl.aPos.push(_pos);
		// 		}
		// 		oUl.index = 0; // 存当前位置的index
		// 	}
		// 	//滑动换页
		// 	function changeImg(ev){
		// 		var _this = this;
		// 		//清定时器
		// 		clearInterval(_this.timer);
		// 		_this.timer = null;

		// 		var startX = ev.targetTouches[0].pageX;
		// 		var disX = 0;
		// 		_this.addEventListener('touchmove',move,false);
		// 		_this.addEventListener('touchend',end,false);

		// 		function move(ev){
		// 			disX = ev.targetTouches[0].pageX - startX;
		// 		}
		// 		function end(ev){

		// 			//翻页
		// 			if(disX < -20){
		// 				//下一页
		// 				_this.index += 1;
		// 				if(_this.index == oUl.acount){
		// 					_this.index = oUl.acount - 1;
		// 				}
		// 			}else if(disX > 20){
		// 				//上一页
		// 				_this.index -= 1;
		// 				if(_this.index == -1){
		// 					_this.index = 0;
		// 				}
		// 			}else{
		// 				//点击
		// 			}

		// 			//底部进度条变色
		// 			for(var i = 0; i < _this.acount; i++){
		// 				_this.btn[i].className = '';
		// 			}
		// 			_this.btn[_this.index].className = 'active';

		// 			//改变位置
		// 			_this.style.webkitTransform =  'translateX('+ oUl.aPos[_this.index].x +'px)';

		// 			//开始自动播放
		// 			autoNext();

		// 			_this.removeEventListener('touchmove',move,false);
		// 			_this.removeEventListener('touchend',end,false);
		// 		}
		// 	}
		// 	//自动换页
		// 	function autoNext(){
		// 		if(oUl.timer){
		// 			return;
		// 		}
		// 		oUl.timer = setInterval(function (){
		// 			oUl.index ++;
		// 			if(oUl.index == oUl.acount){
		// 				oUl.index = 0;
		// 			} 
		// 			for(var i = 0; i < oUl.acount; i++){
		// 				oUl.btn[i].className = '';
		// 			}
		// 			oUl.btn[oUl.index].className = 'active';
		// 			oUl.style.webkitTransform = 'translateX('+ oUl.aPos[oUl.index].x +'px)';
		// 		},2000);
		// 	}




},false);



/*-------common.js------------*/
//手机触屏事件
//this.clickFn(),点击
//this.pressFn(),长按;
//this.downFn()，快速下滑;
//this.upFn(),快速上滑;
//this.leftFn(),快速左滑;
//this.rightFn(),快速右滑
//this.moveFn(),移动触发事件;
//this.completeFn(),end完成;
function addTouch(ev){
	var _this = this;
	//移动距离
	var startX = ev.touches[0].pageX;
	var startY = ev.touches[0].pageY;
	var disX = 0;
	var disY = 0;
	//触摸时间
	var startTime = new Date()*1;
	var endTime = 0;
	var disTime = 0;
	//设置方向
	var direction = 0;
	//判断长按
	_this.bPress = true;
	var timer = setInterval(function(){
		endTime = new Date()*1;
		disTime = endTime - startTime;
		if(disTime>=600){
			if(_this.bPress){
				_this.pressFn && _this.pressFn(ev);
				console.log('长按');
			}
			clearInterval(timer);
		}
	},10); //会有很小的几率出现不是点击，也不是长按
	_this.addEventListener('touchmove',move,false);
	_this.addEventListener('touchend',end,false);
	function move(ev){
		//获取时间差
		endTime = new Date()*1;
		disTime = endTime - startTime;
		//获取空间差
		disX = ev.touches[0].pageX - startX;
		disY = ev.touches[0].pageY - startY;
		//移动时执行函数
		_this.moveFn && _this.moveFn(ev,disX,disY);
		//判断长按
		if(Math.abs(disX) > 2 && Math.abs(disY) > 2){
			_this.bPress = false;
		}
		ev.preventDefault();
	}
	function end(ev){
		endTime = new Date()*1;
		disTime = endTime - startTime;
		direction = getDirection(disX,disY);
		if(disTime < 600){ 
			//获取方向 对应事件
			switch (direction) {
				case 0:
					//点击
					_this.clickFn && _this.clickFn(ev);
					console.log("点击");
					break;
				case 1:
					//向下快滑
					_this.downFn && _this.downFn(ev);
					console.log("向下");
					break;
				case 2:
					//向上快滑
					_this.upFn && _this.upFn(ev);
					console.log("向上");
					break;
				case 3:
					//向左快滑
					_this.leftFn && _this.leftFn(ev);
					console.log("向左");
					break;
				case 4:
					//向左快滑
					_this.rightFn && _this.rightFn(ev);
					console.log("向右");
					break;
				default:
			} 
		}else{
			_this.slowFn && _this.slowFn(ev,disX,disY);
		}
		//事件完成
		_this.completeFn && _this.completeFn(ev,disX,disY);
		//移除事件
		_this.removeEventListener('touchmove',move,false);
		_this.removeEventListener('touchend',end,false);
		//移除定时器
		clearInterval(timer);
		//释放闭包
		end = move = null;
	}
	ev.preventDefault();
}
//返回角度
function getAngle(disX, disY) {
	return Math.atan2(disY, disX) * 180 / Math.PI;
}
//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function getDirection(disX,disY) {
	var result = 0;
	//如果滑动距离太短
	if (Math.abs(disX) < 2 && Math.abs(disY) < 2) {
		return result;
	}
	var angle = getAngle(disX, disY);
	if (angle >= -45 && angle < 45) {
		result = 4;
	} else if (angle >= 45 && angle < 135) {
		result = 1;
	} else if (angle >= -135 && angle < -45) {
		result = 2;
	}
	else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
		result = 3;
	}
	return result;
}

//ajax
function ajax(url,fnSucc,fnFail){
	//0.初始化
	var oAjax=new XMLHttpRequest();  
	
	//1. 打开连接
	oAjax.open('GET',url,true);
	//2. 发送
	oAjax.send();

	//3~4. 接收数据
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){ //完成
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				fnSucc && fnSucc(oAjax.responseText);
			}else{
				fnFail && fnFail(oAjax.status);
			}
		}
	};
}	


//class相关的JS
function hasClass(obj,sClass){
	var reg=new RegExp('\\b'+sClass+'\\b');
	return reg.test(obj.className);
}

function addClass(obj,sClass){
	if(obj.className){
		if(!hasClass(obj,sClass)){
			obj.className+=' '+sClass;	
		}
	}else{
		obj.className=sClass;	
	}
}

function removeClass(obj,sClass){
	var reg=new RegExp('\\b'+sClass+'\\b','g');
	if(hasClass(obj,sClass)){
		obj.className=obj.className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
	}
}


function jsonp(url){
	window[fnName]=function(data){
		json.success && json.success(data);
		oHead.removeChild(oS);
	};
	var oS=document.createElement('script');
	oS.src= url;
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}


