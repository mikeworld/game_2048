window.onload = function(){
	var docMain = document.getElementById("gameMain");
 	//产生新的方块并填充到方格内
 	FillNewBlock();

 	docMain.onmousedown = function(ed){
 		ed = ed || window.event;

 		docMain.onmouseup = function(eu){
			eu = eu || window.event;

			var x_change = Math.abs(eu.clientX - ed.clientX),
				y_change = Math.abs(eu.clientY - ed.clientY);
			//上移
			if (eu.clientY < ed.clientY && y_change >= x_change) {
				SlideToUp();
			}
			//右移
			else if(eu.clientX > ed.clientX && y_change <= x_change){
				SlideToRight();
			}
			//下移
			else if(eu.clientY > ed.clientY && y_change >= x_change){
				SlideToDown();
			}
			//左移
			else if(eu.clientX < ed.clientX && y_change <= x_change){
				SlideToLeft();
			}				 
		
 		}

 		return false;
 	}
 	//向下滑动
 	function SlideToDown(){
 		//用来判断每次滑动方块是否成功发生移动过
 		var blockMoved = false;
 		for (var i = docMain.children.length-1; i >= 0; i--) {
 			//当前行数字
 			var currentRowNum = docMain.children[i].innerText;
 			//为数字且不是最下面一排
 			if (IsExistsBlockNum(currentRowNum) && i < 12){

 				for (var currentIndex = i; currentIndex < 16; currentIndex = currentIndex + 4) {
 					//比较下一行
	 				var nextBlockRowIndexTemp = currentIndex + 4;
	 				if (nextBlockRowIndexTemp > 15) {
	 					break;
	 				}
	 				var status = StartFill(currentIndex,currentRowNum,nextBlockRowIndexTemp);
	 				if (status == 1) {
	 					break;
	 				}
	 				if (!blockMoved) {
	 					blockMoved = status == 2 ? true:false;
	 				}
 				}
 			}
 		}
 		//方块发生移动过才产生新的方块
 		if (blockMoved) {
 			FillNewBlock();
 		}
 		else{
 			IsExistMovedBlock();
 		}
 	}
 	//向上滑动
 	function SlideToUp(){
 		//用来判断每次滑动方块是否成功发生移动过
 		var blockMoved = false;
 		for (var i = 0; i < docMain.children.length ; i++) {
 			//当前行数字
 			var currentRowNum = docMain.children[i].innerText;
 			//为数字且不是最上面一排
 			if (IsExistsBlockNum(currentRowNum) && i > 3){

 				for (var currentIndex = i; currentIndex < 16; currentIndex = currentIndex - 4) {
 					//比较下一行
	 				var nextBlockRowIndexTemp = currentIndex - 4;
	 				if (nextBlockRowIndexTemp < 0) {
	 					break;
	 				}
	 				var status = StartFill(currentIndex,currentRowNum,nextBlockRowIndexTemp);
	 				if (status == 1) {
	 					break;
	 				}
	 				if (!blockMoved) {
	 					blockMoved = status == 2 ? true:false;
	 				}
 				}
 			}
 		}
 		//方块发生移动过才产生新的方块
 		if (blockMoved) {
 			FillNewBlock();
 		}
 		else{
 			IsExistMovedBlock();
 		}
 	}
 	//向左滑动
 	function SlideToLeft(){
 		//用来判断每次滑动方块是否成功发生移动过
 		var blockMoved = false;
 		for (var i = 0; i < docMain.children.length ; i++) {
 			//当前行数字
 			var currentRowNum = docMain.children[i].innerText;
 			//为数字且不是最左边一排
 			if (IsExistsBlockNum(currentRowNum) && i%4 != 0){

 				for (var currentIndex = i; currentIndex < 16; currentIndex = currentIndex - 1) {
 					if (currentIndex%4 == 0) {
 						break;
 					}
 					//比较下一行
	 				var nextBlockRowIndexTemp = currentIndex - 1;
	 				if (nextBlockRowIndexTemp < 0 || nextBlockRowIndexTemp > 15) {
	 					break;
	 				}
	 				var status = StartFill(currentIndex,currentRowNum,nextBlockRowIndexTemp);
	 				if (status == 1) {
	 					break;
	 				}
	 				if (!blockMoved) {
	 					blockMoved = status == 2 ? true:false;
	 				}
 				}
 			}
 		}
 		//方块发生移动过才产生新的方块
 		if (blockMoved) {
 			FillNewBlock();
 		}
 		else{
 			IsExistMovedBlock();
 		}
 	}
 	//向右滑动
 	function SlideToRight(){
 		//用来判断每次滑动方块是否成功发生移动过
 		var blockMoved = false;
 		for (var i = docMain.children.length-1; i >= 0; i--) {
 			//当前行数字
 			var currentRowNum = docMain.children[i].innerText;
 			//为数字且不是最右边一排
 			if (IsExistsBlockNum(currentRowNum) && (i+1)%4 != 0){

 				for (var currentIndex = i; currentIndex < 16; currentIndex = currentIndex + 1) {
 					if ((currentIndex+1)%4 == 0) {
 						break;
 					}
 					//比较下一行
	 				var nextBlockRowIndexTemp = currentIndex + 1;
	 				if (nextBlockRowIndexTemp > 15) {
	 					break;
	 				}
	 				var status = StartFill(currentIndex,currentRowNum,nextBlockRowIndexTemp);
	 				if (status == 1) {
	 					break;
	 				}
	 				if (!blockMoved) {
	 					blockMoved = status == 2 ? true:false;
	 				}
 				}
 			}
 		}
 		//方块发生移动过才产生新的方块
 		if (blockMoved) {
 			FillNewBlock();
 		}		
 		else{
 			IsExistMovedBlock();
 		}
 	}
 	//开始填充方格
 	function StartFill(currentIndex,currentRowNum,nextBlockRowIndexTemp){
 		var status = 0;
		var nextRowBlockNumTemp = docMain.children[nextBlockRowIndexTemp].innerText;
	 	var nextRowBlockFlagTemp = docMain.children[nextBlockRowIndexTemp].getAttribute('flag');
	 	if(!IsExistsBlockNum(nextRowBlockNumTemp)){
	 		FillNextRowBlock(currentIndex,nextBlockRowIndexTemp,currentRowNum);
	 		status = 2;
	 	}
	 	else if(parseInt(nextRowBlockNumTemp) == parseInt(currentRowNum) &&
	 		nextRowBlockFlagTemp != 1){
	 		//下一行数字
 			var nextBlockNum2 = currentRowNum * 2;

 			FillNextRowBlock(currentIndex,nextBlockRowIndexTemp,nextBlockNum2);
 			//标记下一行数字是已经被堆叠过的
 			docMain.children[nextBlockRowIndexTemp].setAttribute('flag',1);
 			status = 2;
	 	}
	 	else if(parseInt(nextRowBlockNumTemp) != parseInt(currentRowNum)){
	 		status = 1;
	 	}
	 	return status;
 	}
 	//填充下一行,清空当前行数字
 	function FillNextRowBlock(currentRowIndex,nextRowIndex,nextRowNum){
 		//1.填充下一行
	 	docMain.children[nextRowIndex].innerText = nextRowNum;
	 	docMain.children[nextRowIndex].style['background-color'] = GetBlockColor(nextRowNum);
	 	//2.清空当前行
	 	docMain.children[currentRowIndex].innerText = '';
	 	docMain.children[currentRowIndex].style['background-color'] = '';
	 	docMain.children[currentRowIndex].removeAttribute('flag');
 	}
 	//判断是否存在可移动的方块
 	function IsExistMovedBlock(){
 		//默认不可移动
 		var canMoved = false;
 		//当方块上下左右存在空，或和上下左右数字存在相同,则说明可以移动
 		for (var i = 0; i < docMain.children.length; i++) {
 			if (!IsExistsBlockNum(docMain.children[i].innerText)) {
 				canMoved = true;
 				break;
 			}
 			//下面方块下标
 			var IndexDown = i + 4;
 			//上面方块下标
 			var IndexUp = i - 4;
 			//左边方块下标
 			var IndexLeft = i - 1;
 			//右边方块下标
 			var IndexRight = i + 1;
 			if (IndexDown < 16) {
 				if(parseInt(docMain.children[i].innerText) == parseInt(docMain.children[IndexDown].innerText)){
 					canMoved = true;
 					break;
 				}
 			}
 			if (IndexUp >= 0){
 				if(parseInt(docMain.children[i].innerText) == parseInt(docMain.children[IndexUp].innerText)){
 					canMoved = true;
 					break;
 				}
 			}
 			if (i%4 != 0) {
 				if(parseInt(docMain.children[i].innerText) == parseInt(docMain.children[IndexLeft].innerText)){
 					canMoved = true;
 					break;
 				}
 			}
 			if ((i+1)%4 != 0) {
 				if(parseInt(docMain.children[i].innerText) == parseInt(docMain.children[IndexRight].innerText)){
 					canMoved = true;
 					break;
 				}
 			}
 		}

 		if (!canMoved) {
 			alert('游戏结束');
 		}
 	}
 	//产生新的方块数字并填充到方格内,并清空标记flag
 	function FillNewBlock(){
 		var blockIndex = GetRandomEmptyBlock();
	 	setTimeout(function(){
		 	//新出现的方块数字
		 	var blockNum = (new Array(2,4))[GetRandomNum(0,1)];
		 	var blockColor = GetBlockColor(blockNum);
		 	docMain.children[blockIndex].innerText = blockNum;
		 	docMain.children[blockIndex].style['background-color'] = blockColor;

		 	for (var i = 0; i < docMain.children.length; i++) {
		 		docMain.children[i].removeAttribute('flag');
		 	}
		 },100);
 	}
 	//随机获取一个未填充的方格
 	function GetRandomEmptyBlock(){
 		var emptyBlock = GetEmptyBlock();
 		var blockIndex = emptyBlock[GetRandomNum(0,emptyBlock.length-1)];

 		return blockIndex;
 	}

 	//获取未被填充的所有方格
 	function GetEmptyBlock(){
 		var emptyBlock = [];

 		for (var i = 0; i < docMain.children.length; i++) {
 			if (!IsExistsBlockNum(docMain.children[i].innerText)) {
 				emptyBlock.push(i);
 			}
 		}
 
 		return emptyBlock;
 	}
 	//判断方块数字是否存在
 	function IsExistsBlockNum(str) {
 		if (str != '' && str != null && str != undefined) {
 			return true;
 		}
 		else {
 			return false;
 		}
 	}
 	//获取随机数
 	function GetRandomNum(Min,Max)
	{   
		var Range = Max - Min;   
		var Rand = Math.random();   
		return(Min + Math.round(Rand * Range));   
	}
 	//获取方块颜色
 	function GetBlockColor(num){
 		num = parseInt(num);
 		var blockColor = "";
 		switch(num){
 			case 2:
 				blockColor = "#f0f2d9";
 				break;
 			case 4:
 				blockColor = "#ffcabf";
 				break;
 			case 8:
 				blockColor = "#ffa896";
 				break;
 			case 16:
 				blockColor = "#ff7c62";
 				break;
 			case 32:
 				blockColor = "#ff5533";
 				break;
 			case 64:
 				blockColor = "#c6fdc5";
 				break;
 			case 128:
 				blockColor = "#aaffa9";
 				break;
 			case 256:
 				blockColor = "#6dff6b";
 				break;
 			case 512:
 				blockColor = "#41ff3e";
 				break;
 			case 1024:
 				blockColor = "#92caff";
 				break;
 			case 2048:
 				blockColor = "#63b4ff";
 				break;
 			case 4096:
 				blockColor = "#2f9aff";
 				break;
 			case 8192:
 				blockColor = "#0082fd";
 				break;
 			default:
 				blockColor = "red";
 				break;
 		}
 		return blockColor;
 	}
}