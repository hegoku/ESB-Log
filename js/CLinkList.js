var LinkList={
		createNew: function(){
			var tmp={};
			tmp.node=null;
			tmp.next=null;
			tmp.pre=null;
			tmp.tail=null;
			return tmp;
		}
};

function addLink(head,obj){
	if(head.node==null){
		head.node=obj;
		head.tail=head;
	}else{
		var tmp=LinkList.createNew();
		tmp.pre=head.tail;
		tmp.node=obj;
		head.tail.next=tmp;
		head.tail=head.tail.next;
	}
}

function printLink(head){
	$("#res").html("");
	var tmp1=head;
	while(tmp1!=null){
		var tmp=tmp1.node;
		if(tmp.times!=0){
			$("#res").html($("#res").html()+"<p>"+tmp.layout+" "+tmp.variablename+" "+tmp.times+"</p>");
			console.log(tmp.layout+" "+tmp.variablename+" "+tmp.times);
		}else if(tmp.len!=0){
			$("#res").html($("#res").html()+"<p>"+tmp.layout+" "+tmp.variablename+" "+tmp.len+" : "+tmp.value+"</p>");
			console.log(tmp.layout+" "+tmp.variablename+" "+tmp.len+" : "+tmp.value);
		}else if(tmp!=null){
			$("#res").html($("#res").html()+"<p>"+tmp.layout+" "+tmp.variablename+"</p>");
			console.log(tmp.layout+" "+tmp.variablename);
		}
		tmp1=tmp1.next;
	}
}

function delLinkFromtail(head){
	var tmp=head.tail.pre;
	tmp.next=null;
	head.tail=tmp;
}