var theSy=-1;
var thePoint=-1;
var currentVar;
var nextState="readLayout";
var getValueStart=0;

function readLayout(input,start){
	var lay="";
	while(start.value!=input.length){
		if(input.charAt(start.value)==' ' && lay==""){
			start.value++;
			continue;
		}
		if(input.charAt(start.value)!=" "){
			lay+=input.charAt(start.value);
		}else{
			return lay;
		}
		start.value++;
	}
	return lay;
}

function readVariableName(input,start){
	var name="";
	while(start.value!=input.length){
		if(input.charAt(start.value)==' ' && name==""){
			start.value++;
			continue;
		}
		if(input.charAt(start.value)!=" " && input.charAt(start.value)!="."){
			name+=input.charAt(start.value);
		}else{
			return name;
		}
		start.value++;
	}
	return name;
}

function isOccur(input,start){
	var tmp="";
	while(start.value!=input.length){
		if(input.charAt(start.value)==' ' && tmp==""){
			start.value++;
			continue;
		}
		if(input.charAt(start.value)!=" "){
			tmp+=input.charAt(start.value);
		}else{
			if(tmp=="OCCURS"){
				return "Y";
			}else{
				return "N";
			}
		}
		start.value++;
	}
	return "";
}

function readTimesValue(input,start){
	var time="";
	while(start.value!=input.length){
		if(input.charAt(start.value)==' ' && time==""){
			start.value++;
			continue;
		}
		if(input.charAt(start.value)!=" "){
			time+=input.charAt(start.value);
		}else{
			return time;
		}
		start.value++;
	}
	return time;
}

function readTimes(input,start){
	var tmp="";
	while(start.value!=input.length){
		if(input.charAt(start.value)==' ' && tmp==""){
			start.value++;
			continue;
		}
		if(input.charAt(start.value)!=" "  && input.charAt(start.value)!="."){
			tmp+=input.charAt(start.value);
		}else{
			return tmp;
		}
		start.value++;
	}
	return tmp;
}

function readEndStat(input,start){
	while(start.value!=input.length){
		if(input.charAt(start.value)==' '){
			start.value++;
			continue;
		}
		if(input.charAt(start.value)=='.'){
			//console.log("end stat");
			return "Y";
		}else{
			return "N";
		}
		start.value++;
	}
	return "";
}

function readValue(input,start){
	var tmp="";
	while(start.value!=input.length){
		if(input.charAt(start.value)==' ' && tmp==""){
			start.value++;
			continue;
		}
		if(input.charAt(start.value)!=" " && input.charAt(start.value)!="."){
			tmp+=input.charAt(start.value);
		}else{
			if(tmp=="VALUE"){
				return "Y";
			}else{
				return "N";
			}
		}
		start.value++;
	}
	return "";
}

function readType(input,start){
	var tmp=0;
	theSy=-1;thePoint=-1;
	while(start.value!=input.length){
		if(input.charAt(start.value)==' ' && tmp==0){
			start.value++;
			continue;
		}
		if(input.charAt(start.value)!=" " && input.charAt(start.value)!="."){
			if(input.charAt(start.value)=="A"){
				tmp++;
			}else if(input.charAt(start.value)=="S"){
				theSy=tmp;
				tmp++;
			}else if(input.charAt(start.value)=="V"){
				//if shift then move tmp++ up
				thePoint=tmp;
				tmp++;
			}else if(input.charAt(start.value)=="X"){
				start.value++;
				var num=parseInt(readFromParentheses(input,start));
				tmp+=num;
			}else if(input.charAt(start.value)=="9"){
				start.value++;
				var num=parseInt(readFromParentheses(input,start));
				tmp+=num;
			}
		}else{
			return tmp;
		}
		start.value++;
	}
	return tmp;
}

function readFromParentheses(input,start){
	var tmp="";
	while(start.value!=input.length){
		if(input.charAt(start.value)==' '){
			start.value++;
			continue;
		}
		if(input.charAt(start.value)=="("){
			start.value++;
			continue;
		}else if(input.charAt(start.value)==")"){
			position=start.value;
			return tmp;
		}else{
			tmp+=input.charAt(start.value);
		}
		start.value++;
	}
	return tmp;
}

function readValueValue(input,start){
	var tmp="";
	var num=0;
	while(start.value!=input.length){
		if(num==2){
			return tmp;
		}
		if(input.charAt(start.value)==' '){
			start.value++;
			continue;
		}
		if(input.charAt(start.value)=="'"){
			start.value++;
			num++;
			continue;
		}
		tmp+=input.charAt(start.value);
		start.value++;
	}
	return tmp;
}

function pharse(input,position){
	var lay,name,endpoint,isoccur,times,tmp,length;
	if(nextState=="readLayout"){
		if(input.charAt(6)=="*"){
			position.value=input.length;
			return 0;
		}
		position.value=7;
		currentVar=normVar.createNew();
		lay=readLayout(input,position);
		if(lay==""){
			position.value=input.length;
			return 0;
		}
		currentVar.layout=lay;
		nextState="readVariableName";
	}else if(nextState=="readVariableName"){
		name=readVariableName(input,position);
		if(name==""){
			position.value=input.length;
			return 0;
		}
		currentVar.variablename=name;
		nextState="isVarEnd";
	}else if(nextState=="isOccurs"){
		isoccur=isOccur(input,position);
		if(isoccur=="Y"){
			nextState="readTimesValue";
		}else if(isoccur=="N"){
			nextState="readType";
		}else{
			position.value=input.length;
			return 0;
		}
	}else if(nextState=="readTimesValue"){
		times=readTimesValue(input,position);
		if(times==""){
			position.value=input.length;
			return 0;
		}
		currentVar.times=times;
		nextState="readTimes";
	}else if(nextState=="readTimes"){
		tmp=readTimes(input,position);
		if(tmp==""){
			position.value=input.length;
			return 0;
		}
		nextState="isEnd";
	}else if(nextState=="readType"){
		length=readType(input,position);
		if(length==""){
			position.value=input.length;
			return 0;
		}
		currentVar.len=length;
		currentVar.sy=theSy;
		currentVar.point=thePoint;
		nextState="readValue";
	}else if(nextState=="readValue"){
		tmp=readValue(input,position);
		if(tmp=="Y"){
			nextState="readValueValue";
		}else if(tmp=="N"){
			nextState="isEnd";
		}else{
			position.value=input.length;
			return 0;
		}
	}else if(nextState=="readValueValue"){
		tmp=readValueValue(input,position);
		if(tmp==""){
			position.value=input.length;
			return 0;
		}
		currentVar.value=tmp;
		nextState="isEnd";
	}else if(nextState=="isEnd"){
		endpoint=readEndStat(input,position);
		if(endpoint=="Y"){
			position.value=input.length;
			nextState="End";
		}else{
			position.value=input.length;
			return 0;
		}
	}else if(nextState=="isVarEnd"){
		endpoint=readEndStat(input,position);
		if(endpoint=="Y"){
			position.value=input.length;
			nextState="End";
		}else if(endpoint==""){
			position.value=input.length;
			return 0;
		}else{
			nextState="isOccurs";
		}
	}
}

function inputValue(ob,str,start,len){
	var i;
	var tmp="";
	var a=start+len;
	if(ob.point!=-1){
		a--;
	}
	if(ob.sy!=-1){
		a--;
	}
	for(i=start;i<a;i++){
		if(ob.point==(i-start)){
			tmp+=".";
		}else if(ob.sy==(i-start)){
			tmp+="-";
		}else{
			tmp+=str.charAt(i);
		}
	}
	return tmp;
}