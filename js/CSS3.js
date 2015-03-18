(function(){
	// 在前面显示的元素，隐藏在后面的元素
	var eleBack = null, eleFront = null,
	    // 纸牌元素们 
	    eleList = document.querySelectorAll(".list");

	// 确定前面与后面元素
	var funBackOrFront = function() {
		for(var i = 0; i < eleList.length; i++){
			if(hasClass(eleList[i],'out')){
				eleBack = eleList[i];
			}else{
				eleFront = eleList[i];
			}
		}

	};
	funBackOrFront();

	var oBox = document.getElementById('box');
	oBox.addEventListener('click',function(){
		addClass(eleFront,'out');
		removeClass(eleFront,'in');
		setTimeout(function(){
			console.log(eleList);

			addClass(eleBack,'in');
			removeClass(eleBack,'out');
			// 重新确定正反元素
			funBackOrFront();
		},225);
	},false);

})();