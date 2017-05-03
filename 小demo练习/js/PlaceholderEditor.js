function placeholderEditor(id,value,parentEle){
	this.id = id ;
	this.value = value ;
	this.parentEle = parentEle ;
	this.initValue = value ;
	this.initElements();
	this.initEvents();
}

placeholderEditor.prototype = {
	constructor : placeholderEditor,
	initElements : function(){
		this.txtEle = $("<span/>");
		this.txtEle.text(this.value);
		this.textEle = $("<input type='text' />");
		this.textEle.val(this.value);

		this.btnWapper = $("<div style='display: inline;'/>");  
        this.saveBtn = $("<input type='button' value='保存'/>");  
        this.cancelBtn = $("<input type='button' value='取消'/>");  
        this.btnWapper.append(this.saveBtn).append(this.cancelBtn);  
  
        this.parentEle.append(this.txtEle).append(this.textEle).append(this.btnWapper);  
        this.convertToReadable();
	},
	initEvents : function(){
		var that = this;
		this.txtEle.on("click",function(event){
			that.convertToEditable();
		});
		this.saveBtn.on("click",function(event){
			that.save();
		});
		this.cancelBtn.on("click",function(event){
			that.cancel();
		});
	},
	convertToEditable : function(){
		this.txtEle.hide();
		this.textEle.show();
		this.textEle.focus();
		if(this.getValue() == this.initValue )  
        {  
            this.textEle.val("");  
        } 
		this.btnWapper.show();
	},
	convertToReadable : function(){
		this.txtEle.show();
		this.textEle.hide();
		this.btnWapper.hide();
	},
	setValue : function(value){
		this.value = value;
	},
	getValue : function(){
		return this.value;
	},
	save : function(){
		this.setValue(this.textEle.val());
		this.txtEle.html(this.getValue().replace(/\n/g,"<br/>"));
		var url = "id=" + this.id + "&value=" + this.value;  
		this.convertToReadable();
	},
	cancel : function(){
		this.textEle.val(this.getValue());
		this.convertToReadable();
	}
}
