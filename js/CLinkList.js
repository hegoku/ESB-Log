var LinkList={
		createNew: function(){
			var tmp={};
			tmp.node=null;
			tmp.next=null;
			tmp.tail=null;
			return tmp;
		}
};

function addLink(head,obj){
	if(head.node==null){
		head.node=obj;
		head.tail=head;
	}else{
		head.tail.next=LinkList.createNew();
		head.tail.next.node=obj;
		head.tail=head.tail.next;
	}
}

function printLink(head){
	var tmp1=head;
	while(tmp1!=null){
		var tmp=tmp1.node;
		if(tmp.times!=0){
			console.log(tmp.layout+" "+tmp.variablename+" "+tmp.times);
			console.log("===============================================================");	
		}else if(tmp.len!=0){
			/*tmp.value=inputValue(currentVar,str,getValueStart,currentVar.len);
			getValueStart+=currentVar.len;
			if(currentVar.point!=-1){
				getValueStart--;
			}
			if(currentVar.sy!=-1){
				getValueStart--;
			}*/
			console.log(tmp.layout+" "+tmp.variablename+" "+tmp.len+" : "+tmp.value);
		}else if(tmp!=null){
			console.log(tmp.layout+" "+tmp.variablename);
		}
		tmp1=tmp1.next;
	}
}