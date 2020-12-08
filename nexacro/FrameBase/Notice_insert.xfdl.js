(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Notice_insert");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_info", this);
            obj._setContents("<ColumnInfo><Column id=\"no\" type=\"STRING\" size=\"256\"/><Column id=\"subject\" type=\"STRING\" size=\"256\"/><Column id=\"contents\" type=\"STRING\" size=\"256\"/><Column id=\"regId\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"regId\">invako</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_detail", this);
            obj._setContents("<ColumnInfo><Column id=\"NO\" type=\"STRING\" size=\"256\"/><Column id=\"NUM\" type=\"STRING\" size=\"256\"/><Column id=\"SUBJECT\" type=\"STRING\" size=\"256\"/><Column id=\"CONTENTS\" type=\"STRING\" size=\"256\"/><Column id=\"REG_DT\" type=\"STRING\" size=\"256\"/><Column id=\"REG_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("Static00","314","130","46","53",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("제목");
            obj.set_font("16px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","314","184","46","53",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("내용");
            obj.set_font("16px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","360","136","467","39",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","360","195","464","320",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            this.addChild(obj.name, obj);

            obj = new Button("Button00","729","541","95","39",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("등록");
            obj.set_font("14px/normal \"Gulim\"");
            obj.set_enable("true");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("Button01","729","541","95","39",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("수정");
            obj.set_font("14px/normal \"Gulim\"");
            obj.set_enable("true");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Notice_insert.xfdl", function() {

        this.Button00_onclick = function(obj,e)
        {
        	this.fnInsert();
        };

        this.Button01_onclick = function(obj,e)
        {
        	this.fnUpdate();
        };

        this.fnCallback = function(svcID,errorCode,errorMsg) {
        	if(errorCode != 0) {
        		this.alert(errorCode+"\n"+errorMsg);
        		return;
        	}

        	switch(svcID) {
        		case "insert":
        			this.alert("등록 되었습니다.");
        			this.go("FrameBase::Notice_list.xfdl");
        		break;
        		case "update":
        			this.alert("수정 되었습니다.");
        			this.go("FrameBase::Notice_list.xfdl");
        		break;
        		case "detail":
        			if(this.ds_detail.rowcount < 1) {
        				this.alert("조회된 결과가 없습니다.");
        			} else {
        				this.Edit00.set_value(this.ds_detail.getColumn(0, "SUBJECT"));
        				this.TextArea00.set_value(this.ds_detail.getColumn(0, "CONTENTS"));
        				this.ds_info.setColumn(0, "no", nexacro.getApplication().noticeKey);
        			}
        			nexacro.getApplication().noticeKey = "";
        		break;
        	}
        };

        this.fnInsert = function() {

        	this.ds_info.setColumn(0, "subject", this.Edit00.text);
        	this.ds_info.setColumn(0, "contents", this.TextArea00.text);

        	var strSvcId    = "insert";
        	var strSvcUrl   = "svc::insertNotice.do";
        	var inData      = "input1=ds_info";
        	var outData     = "result=result";
        	var strArg      = "";
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

        if(nexacro.getApplication().noticeKey != "") {
        	this.Button01.visible = true;
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
        } else {
        	this.Button00.visible = true;
        }

        this.fnUpdate = function() {

        	this.ds_info.setColumn(0, "subject", this.Edit00.text);
        	this.ds_info.setColumn(0, "contents", this.TextArea00.text);

        	var strSvcId    = "update";
        	var strSvcUrl   = "svc::updateNotice.do";
        	var inData      = "input1=ds_info";
        	var outData     = "result=result";
        	var strArg      = "";
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
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
            this.Button01.addEventHandler("onclick",this.Button01_onclick,this);
        };

        this.loadIncludeScript("Notice_insert.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
