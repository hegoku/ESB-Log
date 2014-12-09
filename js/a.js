var position=0;
var theSy=-1;
var thePoint=-1;
var currentVar;
var nextState="readLayout";

function readLayout(input,start){
	var pos=start;
	var lay="";
	while(pos!=input.length){
		if(input.charAt(pos)==' ' && lay==""){
			pos++;
			continue;
		}
		if(input.charAt(pos)!=" "){
			lay+=input.charAt(pos);
		}else{
			return lay;
		}
		pos++;
		position=pos;
	}
	return lay;
}

function readVariableName(input,start){
	var pos=start;
	var name="";
	while(pos!=input.length){
		if(input.charAt(pos)==' ' && name==""){
			pos++;
			continue;
		}
		if(input.charAt(pos)!=" " && input.charAt(pos)!="."){
			name+=input.charAt(pos);
		}else{
			return name;
		}
		pos++;
		position=pos;
	}
	return name;
}

function isOccur(input,start){
	var pos=start;
	var tmp="";
	while(pos!=input.length){
		if(input.charAt(pos)==' ' && tmp==""){
			pos++;
			continue;
		}
		if(input.charAt(pos)!=" "){
			tmp+=input.charAt(pos);
		}else{
			if(tmp=="OCCURS"){
				return "Y";
			}else{
				return "N";
			}
		}
		pos++;
		position=pos;
	}
	return "";
}

function readTimesValue(input,start){
	var pos=start;
	var time="";
	while(pos!=input.length){
		if(input.charAt(pos)==' ' && time==""){
			pos++;
			continue;
		}
		if(input.charAt(pos)!=" "){
			time+=input.charAt(pos);
		}else{
			return time;
		}
		pos++;
		position=pos;
	}
	return time;
}

function readTimes(input,start){
	var tmp="";
	while(start!=input.length){
		if(input.charAt(start)==' ' && tmp==""){
			start++;
			continue;
		}
		if(input.charAt(start)!=" "  && input.charAt(start)!="."){
			tmp+=input.charAt(start);
		}else{
			return tmp;
		}
		start++;
		position=start;
	}
	return tmp;
}

function readEndStat(input,start){
	while(start!=input.length){
		if(input.charAt(start)==' '){
			start++;
			continue;
		}
		if(input.charAt(start)=='.'){
			//console.log("end stat");
			return "Y";
		}else{
			return "N";
		}
		start++;
		position=start;
	}
	return "";
}

function readValue(input,start){
	var pos=start;
	var tmp="";
	while(pos!=input.length){
		if(input.charAt(pos)==' ' && tmp==""){
			pos++;
			continue;
		}
		if(input.charAt(pos)!=" " && input.charAt(pos)!="."){
			tmp+=input.charAt(pos);
		}else{
			if(tmp=="VALUE"){
				return "Y";
			}else{
				return "N";
			}
		}
		pos++;
		position=pos;
	}
	return "";
}

function readType(input){
	var tmp=0;
	theSy=-1;thePoint=-1;
	while(position!=input.length){
		if(input.charAt(position)==' ' && tmp==0){
			position++;
			continue;
		}
		if(input.charAt(position)!=" " && input.charAt(position)!="."){
			if(input.charAt(position)=="A"){
				tmp++;
			}else if(input.charAt(position)=="S"){
				theSy=tmp;
				tmp++;
			}else if(input.charAt(position)=="V"){
				//if shift then move tmp++ up
				thePoint=tmp;
				tmp++;
			}else if(input.charAt(position)=="X"){
				position++;
				var num=parseInt(readFromParentheses(input,position));
				tmp+=num;
			}else if(input.charAt(position)=="9"){
				position++;
				var num=parseInt(readFromParentheses(input,position));
				tmp+=num;
			}
		}else{
			return tmp;
		}
		position++;
	}
	return tmp;
}

function readFromParentheses(input,start){
	var tmp="";
	while(start!=input.length){
		if(input.charAt(start)==' '){
			start++;
			continue;
		}
		if(input.charAt(start)=="("){
			start++;
			continue;
		}else if(input.charAt(start)==")"){
			position=start;
			return tmp;
		}else{
			tmp+=input.charAt(start);
		}
		start++;
	}
	return tmp;
}

function readValueValue(input,start){
	var tmp="";
	var num=0;
	while(start!=input.length){
		if(num==2){
			return tmp;
		}
		if(input.charAt(start)==' '){
			start++;
			continue;
		}
		if(input.charAt(start)=="'"){
			start++;
			num++;
			position=start;
			continue;
		}
		tmp+=input.charAt(start);
		start++;
		position=start;
	}
	return tmp;
}

function pharse(input){
	var lay,name,endpoint,isoccur,times,tmp,length;
	if(nextState=="readLayout"){
		if(input.charAt(6)=="*"){
			position=input.length;
			return 0;
		}
		position=7;
		currentVar=normVar.createNew();
		lay=readLayout(input,position);
		if(lay==""){
			position=input.length;
			return 0;
		}
		currentVar.layout=lay;
		nextState="readVariableName";
	}else if(nextState=="readVariableName"){
		name=readVariableName(input,position);
		if(name==""){
			position=input.length;
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
			position=input.length;
			return 0;
		}
	}else if(nextState=="readTimesValue"){
		times=readTimesValue(input,position);
		if(times==""){
			position=input.length;
			return 0;
		}
		currentVar.times=times;
		nextState="readTimes";
	}else if(nextState=="readTimes"){
		tmp=readTimes(input,position);
		if(tmp==""){
			position=input.length;
			return 0;
		}
		nextState="isEnd";
	}else if(nextState=="readType"){
		length=readType(input,position);
		if(length==""){
			position=input.length;
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
			position=input.length;
			return 0;
		}
	}else if(nextState=="readValueValue"){
		tmp=readValueValue(input,position);
		if(tmp==""){
			position=input.length;
			return 0;
		}
		currentVar.value=tmp;
		nextState="isEnd";
	}else if(nextState=="isEnd"){
		endpoint=readEndStat(input,position);
		if(endpoint=="Y"){
			position=input.length;
			nextState="End";
		}else{
			position=input.length;
			return 0;
		}
	}else if(nextState=="isVarEnd"){
		endpoint=readEndStat(input,position);
		if(endpoint=="Y"){
			position=input.length;
			nextState="End";
		}else if(endpoint==""){
			position=input.length;
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