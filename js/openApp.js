window.onload= function (){

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
			oIcon.style.top = aPos[i].top + 'px';
			oIcon.style.left = aPos[i].left + 'px';

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
			oIcon.style.top =  aBtmPos[i].top + 'px';
			oIcon.style.left = aBtmPos[i].left + 'px';
			//创建文字
			var oSpan = document.createElement('span');
			oSpan.innerHTML = intro[i].name;
			oSpan.className = 'name';
			oIcon.appendChild(oSpan);
			oBtm.appendChild(oIcon);
		}

		//点击、                长按拖拽
		// time<500 && dis < 5 |  time>500 &&  动 dis < 5
		var aApp=document.getElementsByClassName('app');

		for(var i = 0; i < aApp.length;i++){
			moveEvent(aApp[i]);
		}

		//添加移动事件  //时间、移动距离
		var oDotted = document.getElementById('dotted'); //虚线框
		var zIndex = 10;
		var complete = true;
		function moveEvent(obj){
			obj.addEventListener('touchstart', function (ev){
				if(!complete){
					return;
				}
				obj.style['z-index'] = 	zIndex++;
				complete = false;
				var startTop  = ev.targetTouches[0].clientX;
				var startLeft = ev.targetTouches[0].clientY;
				var disX = ev.targetTouches[0].clientX - obj.offsetLeft;
				var disY = ev.targetTouches[0].clientY - obj.offsetTop;
				
				var	startTime = new Date()*1;
				var endTime = 0;
				var disTime = 0;
				obj.bLong = true;
				obj.bMove = false;
				obj.positionId=aPos[obj.getAttribute('data-positionId')].id;

				obj.timer = setInterval(function(){
					endTime = new Date()*1;
					disTime = endTime - startTime;
					if(disTime > 500){
						if(obj.bLong){
							obj.bMove = true; //长按
							addDotted(obj); //添加虚线框
							obj.style.webkitTransform = 'scale(1.15)';
						}
						clearInterval(obj.timer);
					}
				},10);
				document.addEventListener('touchend', end, false);
				document.addEventListener('touchmove', move, false);


				obj.finish = true;
				function move(ev){
					//空间维度未移动
					var clientX = ev.targetTouches[0].clientX;
					var clientY = ev.targetTouches[0].clientY;
					var left = clientX - disX;
					var top = clientY - disY;
					if(clientX + clientY - (startTop + startLeft) > 10){
						obj.bLong = false;
					}
					if(obj.bMove){
						//拖拽
						obj.style.left= left +'px';
						obj.style.top= top +'px';
						changePos(obj,{top: top, left: left}); //改变元素位置

					}
					ev.preventDefault();
				}

				function end(){
					clearInterval(obj.timer);
					endTime = new Date()*1;
					if(endTime - startTime < 500){
						complete = true;
					}else{
						movePos(obj,{top: aPos[obj.positionId].top, left: aPos[obj.positionId].left},{time: 700,complete:function(){
							complete = true;
						}});
						obj.style.webkitTransform = 'scale(1)';
						oDotted.style.display = 'none';
					}
					document.removeEventListener('touchmove', move, false);
					document.removeEventListener('touchend', end, false);
				}
				ev.preventDefault();
			}, false);
		}

		// 改变位置
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
				for(var i = 0; i < aApp.length; i++){
					if((aApp[i].getAttribute('data-positionId') > minId) && (aApp[i].getAttribute('data-positionId') < maxId)){ //判断夹在中间的元素
						
						if(bBack){ //target向后移动
							aApp[i].positionId = parseInt(aApp[i].getAttribute('data-positionId')) + 1;

						}
						else{ //target向前移动
							aApp[i].positionId = parseInt(aApp[i].getAttribute('data-positionId')) - 1;
						}
						aApp[i].setAttribute('data-positionId',aApp[i].positionId); 
						movePos(aApp[i],{top: aPos[aApp[i].positionId].top, left: aPos[aApp[i].positionId].left});
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
				movePos(obj.target,{top: aPos[obj.target.positionId].top, left: aPos[obj.target.positionId].left},{complete: function (){
						//运动完成
						obj.finish = true;
						obj.target = null;
					}
				});

			}
		}

		// 8.拖拽留虚线框
		function addDotted(obj){
			var l = aPos[obj.positionId].left;
			var t = aPos[obj.positionId].top;
			oDotted.style.display = 'block';
			oDotted.style.top = t + 'px';
			oDotted.style.left = l + 'px';
		}


		//返回要换位置的对象
		function getTarget(obj, json){
			var selfId = parseInt(obj.getAttribute('data-positionid'));
			//超出高度 
			//高度之内接触
			for(var i = 0; i < aApp.length; i++){
				if(i == selfId){
					continue;
				}
				var a = aPos[i].top - json.top;
				var b = aPos[i].left - json.left;
				var dis = Math.sqrt(a*a+b*b);
				
				if(dis < 35){
					for(var j = 0; j < aApp.length; j++){
						if(aApp[j].getAttribute('data-positionid') == i){
							return aApp[j];
						}
					}
				}
			}
		}


		function movePos(obj, json, options){
			options=options||{};
			options.type=options.type || 'ease-out';
			options.time=options.time || 700;
			
			var start={};
			var dis={};
			
			for (var name in json){
				if (name == 'opacity'){
					start[name]=parseFloat(getStyle(obj, name));
				}
				else{
					start[name]=parseInt(getStyle(obj, name));
				}
				
				dis[name]=json[name]-start[name];
			}
			
			// 次数
			var count=Math.round(options.time/30);
			var n=0;
			
			// 设置样式了
			clearInterval(obj.timer);
			obj.timer=setInterval(function (){
				n++;
				
				for (var name in json){
					switch (options.type){
						case 'linear': // 匀速
							var cur=start[name]+dis[name]*n/count;
							break;
							
						case 'ease-in': // 加速
							var a=n/count;
							var cur=start[name]+dis[name]*a*a*a;
							break;
							
						case 'ease-out': // 减速
							var a=1-n/count;
							var cur=start[name]+dis[name]*(1-a*a*a);
							break;
					}
					
					if (name == 'opacity'){
						obj.style[name]=cur;
						obj.style.filter='alpha(opacity:'+cur*100+')';
					}
					else{
						obj.style[name]=cur+'px';
					}	
				}
				
				if (n == count){
					clearInterval(obj.timer);
					options.complete && options.complete();
				}
			}, 30);
		}

		function getStyle(obj, name){
			return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, false)[name];
		}
	})();
	

	//个人信息 
	(function(){

		var oResume = document.getElementById('resume');
		var oIfoBox = document.getElementById("myifo");

		oResume.addEventListener('touchstart',toPage,false);
		oIfoBox.addEventListener('touchstart',movePage,false);

		var oWeixin = document.getElementById('weixin');
		var oWxBox = document.getElementById('weixinbox');


		oWeixin.addEventListener('touchstart',toPage,false);
		oWxBox.addEventListener('touchstart',movePage,false);



		function toPage(){
			if(this.id == 'resume'){
				var that = oIfoBox;
				var oIfoMsg = oIfoBox.getElementsByClassName('ifo')[0];
				var oUp = oIfoBox.getElementsByClassName('up')[0];
			}else if(this.id == 'weixin'){
				var that = oWxBox;
				var oIfoMsg = oWxBox.getElementsByClassName('ifo')[0];
				var oUp = oWxBox.getElementsByClassName('up')[0];
			}


			that.style.webkitTransition = '-webkit-transform  0.8s ease';
			that.style.webkitTransform = 'translate3d(0,0,0)';
			oIfoMsg.style.opacity = 1;
			oIfoMsg.style.webkitTransform = 'translate3d(0,0,0)';
			oUp.style.opacity = 1;
		}

		function movePage(ev){
			var _this = this;
			var oIfoMsg = _this.getElementsByClassName('ifo')[0];
			var oUp = _this.getElementsByClassName('up')[0];

			var oTranslat = getTranslate(getComputedStyle(_this,false)['-webkit-transform']);
			var disY = ev.targetTouches[0].clientY-oTranslat.y;
			var startTime = new Date()*1;

			function move(ev){
				_this.moveY = ev.targetTouches[0].clientY-disY;
				_this.style.webkitTransition = '-webkit-transform  0s linear';
				if(_this.moveY < 0 ){
					_this.style.webkitTransform = 'translate3d(0,'+ _this.moveY +'px,0)';
				}
				ev.preventDefault();
			}
			function end(){
				var endTime = new Date()*1;
				//慢操作
				if(endTime - startTime > 800){
					if(_this.moveY < -100 ){
						//进入前一页
						_this.style.webkitTransition = '-webkit-transform  0.5s ease-out';
						_this.style.webkitTransform = 'translate3d(0,-600px,0)';

						oUp.style.opacity = 0;
						oIfoMsg.style.opacity = 0;
						oIfoMsg.style.webkitTransform = 'translate3d(-60px,0,0)';

					}else{
						_this.style.webkitTransition = '-webkit-transform  0.5s ease';
						_this.style.webkitTransform = 'translate3d(0,0,0)';
					}
				}else{
					//快操作 优化
					if(_this.moveY < -50){
						_this.style.webkitTransition = '-webkit-transform  0.5s ease-out';
						_this.style.webkitTransform = 'translate3d(0,-600px,0)';

						oUp.style.opacity = 0;
						oIfoMsg.style.opacity = 0;
						oIfoMsg.style.webkitTransform = 'translate3d(-60px,0,0)';

					}else{
						_this.style.webkitTransition = '-webkit-transform  0.5s ease';
						_this.style.webkitTransform = 'translate3d(0,0,0)';
					}
				}

				document.removeEventListener('touchmove', move, false);
				document.removeEventListener('touchend', end, false);
			}
			
			document.addEventListener('touchmove', move, false);
			document.addEventListener('touchend', end, false);
		}

		function getTranslate (str){
			var arr = str.split(',');
			var resX = parseInt(arr[arr.length - 1]);
			var resY = parseInt(arr[arr.length - 2]);
			return {x: resX,y: resY};
		}

	})();


	//tmail
	(function(){
		var oMain = document.getElementById('main');
		var oAppBox = document.getElementById('appbox');
		var oJs = document.getElementById('JS');


		var oTmail = document.getElementById('tmail');
		var oUl = oTmail.querySelector('#tmail .box ul')
		var oClose = oTmail.getElementsByClassName('close')[0];
		console.log(oClose);
		//打开app
		oClose.addEventListener('touchstart',click,false);
		oJs.addEventListener('touchstart',click,false);
		//关闭app
		// oJs.addEventListener('touchstart',click,false);
		// opcity 0 - > 1
		// scale  0.5 - > 1
		function test(){
			console.log('test');
		}

		//打开app
		oJs.clickFn = function() {
			//显示页面
			oAppBox.style.display = 'block';
			setTimeout(function(){
				oMain.style.webkitTransform = 'scale(1.5)';
				oMain.style.opacity = 0.5;
				oTmail.style.webkitTransform = 'scale(1)';
				oTmail.style.opacity = 1;
			},1);
			//初始化数据
			setData();
			oUl.addEventListener('touchstart',changeImg,false);
			autoNext();
		};

		//关闭app
		oClose.clickFn = function(){
			console.log('close')
			//关闭页面
			oMain.style.webkitTransform = 'scale(1)';
			oMain.style.opacity = 1;
			oTmail.style.webkitTransform = 'scale(0)';
			oTmail.style.opacity = 0;
			setTimeout(function(){
				oAppBox.style.display = 'none';

				//结束本页面事件
				oUl.removeEventListener('touchstart',changeImg,false);
				clearInterval(oUl.timer);
				oUl.timer = null;

			},500);

		};

		//点击事件
		function click(ev){
			var _this = this;
			//移动距离
			var startX = ev.targetTouches[0].pageX;
			var startY = ev.targetTouches[0].pageY;
			var disX = 0;
			var disY = 0;
			//触摸时间
			_this.startTime = new Date()*1;

			_this.addEventListener('touchmove',move,false);
			_this.addEventListener('touchend',end,false);
			function move(ev){
				disX = ev.targetTouches[0].pageX - startX;
				disY = ev.targetTouches[0].pageY - startY;
			}
			function end(ev){
				//点击
				_this.endTime = new Date()*1;
				if((disX + disY < 10) && (_this.endTime - _this.startTime < 500)){  //绝对值？？
					_this.clickFn();
				}					
				_this.removeEventListener('touchmove',move,false);
				_this.removeEventListener('touchend',end,false);
			}
		}

		//初始化数据
		setData();
		//滑动换页
		oUl.addEventListener('touchstart',changeImg,false);
		//自动换页
		autoNext();

		//初始化数据
		function setData(){
			oUl.acount = oUl.children.length;
			oUl.childWith = oUl.children[0].offsetWidth;

			oUl.btn = document.querySelectorAll('.box ol li');
			//存位置
			oUl.aPos = [];
			for(var i = 0; i < oUl.acount; i++){
				var _pos = {};
				_pos.index = i;
				_pos.x = -i*oUl.childWith;
				oUl.aPos.push(_pos);
			}
			oUl.index = 0; // 存当前位置的index
		}
		//滑动换页
		function changeImg(ev){
			var _this = this;
			//清定时器
			clearInterval(_this.timer);
			_this.timer = null;

			var startX = ev.targetTouches[0].pageX;
			var disX = 0;
			_this.addEventListener('touchmove',move,false);
			_this.addEventListener('touchend',end,false);

			function move(ev){
				disX = ev.targetTouches[0].pageX - startX;
			}
			function end(ev){
				//翻页
				if(disX < -20){
					//下一页
					_this.index += 1;
					if(_this.index == oUl.acount){
						_this.index = oUl.acount - 1;
					}
				}else if(disX > 20){
					//上一页
					_this.index -= 1;
					if(_this.index == -1){
						_this.index = 0;
					}
				}else{
					//点击
				}

				//底部进度条变色
				for(var i = 0; i < _this.acount; i++){
					_this.btn[i].className = '';
				}
				_this.btn[_this.index].className = 'active';

				//改变位置
				_this.style.webkitTransform =  'translateX('+ oUl.aPos[_this.index].x +'px)';

				//开始自动播放
				autoNext();

				_this.removeEventListener('touchmove',move,false);
				_this.removeEventListener('touchend',end,false);
			}
		}
		//自动换页
		function autoNext(){
			if(oUl.timer){
				return;
			}
			oUl.timer = setInterval(function (){
				oUl.index ++;
				if(oUl.index == oUl.acount){
					oUl.index = 0;
				} 
				for(var i = 0; i < oUl.acount; i++){
					oUl.btn[i].className = '';
				}
				oUl.btn[oUl.index].className = 'active';
				oUl.style.webkitTransform = 'translateX('+ oUl.aPos[oUl.index].x +'px)';
			},2000);
		}
	})();
};
