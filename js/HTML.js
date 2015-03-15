//顶部焦点图
(function (){
	var oUl=document.querySelector('#appbox .slider ul');
	var aLi=oUl.children;
	var aBtn=document.querySelectorAll('#appbox .slider ol li');
	var now=0;
	
	setInterval(function (){
		now++;
		if(now==aLi.length)now=0;
		tab();
	}, 2000);
	
	function tab(){
		for(var i=0;i<aBtn.length;i++){
			aBtn[i].className='';
		}
		aBtn[now].className='active';
		oUl.style.WebkitTransform='translateX(-'+now*aLi[0].offsetWidth+'px)';
	}
})();

//点击搜索
(function (){
	var oBtn=document.getElementById('search_btn');
	var oDiv=document.getElementById('search_dialog');
	var oBtnClose=oDiv.querySelector('#appbox .close');
	var oPage=document.querySelector('#appbox .page');
	
	oBtn.onclick=function (){
		oPage.style.display='none';
		oDiv.style.display='block';
	};
	oBtnClose.onclick=function (){
		oPage.style.display='block';
		oDiv.style.display='none';
	};
})();
