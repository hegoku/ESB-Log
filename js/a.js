var position=0;
var theSy=-1;
var thePoint=-1;

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
				return true;
			}else{
				return false;
			}
		}
		pos++;
		position=pos;
	}
	return false;
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
			return true;
		}else{
			return false;
		}
		start++;
		position=start;
	}
	return false;
}

function readType(input){
	var tmp=0;
	theSy=-1;thePoint=-1;
	while(position!=input.length){
		if(input.charAt(position)==' '){
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

function pharse(input){
	if(input.charAt(6)=="*"){
		return null;
	}
	var lay,name,endpoint,isoccur,times,tmp,length;
	position=7;
	lay=readLayout(input,position);
	if(lay==""){
		return null;
	}
	name=readVariableName(input,position);
	if(name==""){
		return null;
	}

	endpoint=readEndStat(input,position);
	if(endpoint==true){
		var theVar=normVar.createNew();
		theVar.layout=lay;
		theVar.variablename=name;
		return theVar;
	}
	isoccur=isOccur(input,position);
	if(isoccur==true){
		times=readTimesValue(input,position);
		tmp=readTimes(input,position);
		var theVar=arrayVar.createNew();
		theVar.layout=lay;
		theVar.variablename=name;
		theVar.times=times;
		return theVar;
	}else{
		length=readType(input,position);
		var theVar=typeVar.createNew();
		theVar.layout=lay;
		theVar.variablename=name;
		theVar.length=length;
		theVar.sy=theSy;
		theVar.point=thePoint;
		return theVar;
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