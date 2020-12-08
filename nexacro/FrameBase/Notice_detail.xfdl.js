(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Notice_detail");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_detail", this);
            obj._setContents("<ColumnInfo><Column id=\"NO\" type=\"STRING\" size=\"256\"/><Column id=\"NUM\" type=\"STRING\" size=\"256\"/><Column id=\"SUBJECT\" type=\"STRING\" size=\"256\"/><Column id=\"CONTENTS\" type=\"STRING\" size=\"256\"/><Column id=\"REG_DT\" type=\"STRING\" size=\"256\"/><Column id=\"REG_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Edit("Edit00","360","136","467","39",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_readonly("true");
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","360","195","464","320",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_readonly("true");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","314","130","46","53",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("제목");
            obj.set_font("16px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","314","184","46","53",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("내용");
            obj.set_font("16px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Button("Button00","737","530","87","25",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("확인");
            this.addChild(obj.name, obj);

            obj = new Button("Button01","643","530","87","25",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("수정");
            this.addChild(obj.name, obj);

            obj = new Button("Button02","550","530","87","25",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("삭제");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","Edit00","value","ds_detail","SUBJECT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","TextArea00","value","ds_detail","CONTENTS");
            this.addChild(obj.name, obj);
            obj.bind();
        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Notice_detail.xfdl", function() {
        this.fnCallback = function(svcID,errorCode,errorMsg) {
        	if(errorCode != 0) {
        		this.alert(errorCode+"\n"+errorMsg);
        		return;
        	}

        	switch(svcID) {
        		case "detail":
        			if(this.ds_detail.rowcount < 1) {
        				this.alert("조회된 결과가 없습니다.");
        			} else {
        				this.Edit00.text = this.ds_detail.getColumn(0, "SUBJECT");
        				this.TextArea00.text = this.ds_detail.getColumn(0, "CONTENS");
        			}
        			nexacro.getApplication().noticeKey = "";
        		break;
        		case "delete":
        			this.alert("삭제 되었습니다.");
        			this.go("FrameBase::Notice_list.xfdl");
        		break;
        	}
        };

        this.fnDetail = function() {

        	var strSvcId    = "detail";
        	var strSvcUrl   = "svc::selectNoticeDetail.do";
        	var inData      = "";
        	var outData     = "ds_detail=noticeDetail";
        	var strArg      = "no=" + nexacro.getApplication().noticeKey;
        	var callBackFnc = "fnCallback";
        	var isAsync     = true;

        	this.transaction(strSvcId ,     // transaction을 구분하기 위한 svc id값
                    strSvcUrl ,   // trabsaction을 요청할 주소
                    inData ,     // 입력값으로 보낼 dataset id , a=b형태로 실제이름과 입력이름을 매칭
                    outData ,     // 처리결과값으로 받을 dataset id, a=b형태로 실제이름과 입력이름을 매칭
                    strArg,     // 입력값으로 보낼 arguments, a=b
                    callBackFnc,   // transaction의 결과를 받을 Function 이름
                    isAsync);     // 비동기통신 여부 [생략가능]
        };

        this.fnDetail();

        this.Button00_onclick = function(obj,e)
        {
        	this.go("FrameBase::Notice_list.xfdl");
        };

        this.Button01_onclick = function(obj,e)
        {
        	nexacro.getApplication().noticeKey = this.ds_detail.getColumn(0, "NO");
        	this.go("FrameBase::Notice_insert.xfdl");
        };

        this.Button02_onclick = function(obj,e)
        {
        	var strSvcId    = "delete";
        	var strSvcUrl   = "svc::deleteSingleNotice.do";
        	//var inData      = "input1=ds_detail";
        	var inData      = "";
        	var outData     = "";
        	var strArg      = "input1=" + this.ds_detail.getColumn(0, "NO");
        	var callBackFnc = "fnCallback";
        	var isAsync     = true;

        	this.transaction(strSvcId ,     // transaction을 구분하기 위한 svc id값
                    strSvcUrl ,   // trabsaction을 요청할 주소
                    inData ,     // 입력값으로 보낼 dataset id , a=b형태로 실제이름과 입력이름을 매칭
                    outData ,     // 처리결과값으로 받을 dataset id, a=b형태로 실제이름과 입력이름을 매칭
                    strArg,     // 입력값으로 보낼 arguments, a=b
                    callBackFnc,   // transaction의 결과를 받을 Function 이름
                    isAsync);     // 비동기통신 여부 [생략가능]
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.TextArea00.addEventHandler("onchanged",this.TextArea00_onchanged,this);
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
            this.Button01.addEventHandler("onclick",this.Button01_onclick,this);
            this.Button02.addEventHandler("onclick",this.Button02_onclick,this);
        };

        this.loadIncludeScript("Notice_detail.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
