var normVar={
		createNew: function(){
			var tmp={};
			tmp.layout="";
			tmp.variablename="";
			tmp.value="";
			tmp.point=-1;
			tmp.sy=-1;
			return tmp;
		}
};

var typeVar={
	createNew: function(){
		var tmp=normVar.createNew();
		tmp.len=0;
		return tmp;
	}
};

var arrayVar={
	createNew: function(){
		var tmp=normVar.createNew();
		tmp.times=0;
		return tmp;
	}
};