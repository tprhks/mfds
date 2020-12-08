(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Work");
            this.set_titletext("Form_Work");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"inputGbn\" type=\"STRING\" size=\"256\"/><Column id=\"inputTx\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"CHCK\" type=\"STRING\" size=\"256\"/><Column id=\"NO\" type=\"STRING\" size=\"256\"/><Column id=\"NUM\" type=\"STRING\" size=\"256\"/><Column id=\"SUBJECT\" type=\"STRING\" size=\"256\"/><Column id=\"CONTENTS\" type=\"STRING\" size=\"256\"/><Column id=\"REG_DT\" type=\"STRING\" size=\"256\"/><Column id=\"REG_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_detail", this);
            obj._setContents("<ColumnInfo><Column id=\"NO\" type=\"STRING\" size=\"256\"/><Column id=\"NUM\" type=\"STRING\" size=\"256\"/><Column id=\"SUBJECT\" type=\"STRING\" size=\"256\"/><Column id=\"CONTENTS\" type=\"STRING\" size=\"256\"/><Column id=\"REG_DT\" type=\"STRING\" size=\"256\"/><Column id=\"REG_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("Button00","890","150","92","25",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("검색");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","730","150","149","25",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","260","187","722","253",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_list");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"59\"/><Column size=\"80\"/><Column size=\"192\"/><Column size=\"261\"/><Column size=\"106\"/><Column size=\"93\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell/><Cell col=\"1\" text=\"순번\"/><Cell col=\"2\" text=\"제목\"/><Cell col=\"3\" text=\"내용\"/><Cell col=\"4\" text=\"등록일\"/><Cell col=\"5\" text=\"등록ID\"/></Band><Band id=\"body\"><Cell displaytype=\"checkboxcontrol\" edittype=\"checkbox\" expr=\"CHCK == &quot;Y&quot; ? 1 : 0\"/><Cell col=\"1\" text=\"bind:NUM\"/><Cell col=\"2\" text=\"bind:SUBJECT\"/><Cell col=\"3\" text=\"bind:CONTENTS\"/><Cell col=\"4\" text=\"bind:REG_DT\"/><Cell col=\"5\" text=\"bind:REG_ID\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Combo("Combo00","644","150","73","25",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            var Combo00_innerdataset = new nexacro.NormalDataset("Combo00_innerdataset", obj);
            Combo00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">제목</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">내용</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">등록자ID</Col></Row></Rows>");
            obj.set_innerdataset(Combo00_innerdataset);
            obj.set_text("제목");
            obj.set_value("0");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Button("Button01","888","443","92","25",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("등록");
            this.addChild(obj.name, obj);

            obj = new Button("Button02","794","443","92","25",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("삭제");
            this.addChild(obj.name, obj);

            obj = new Button("btn_gn","130","35","125","59",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("Go Nexacro");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Notice_list.xfdl", function() {
        this.Button01_onclick = function(obj,e) {
        	this.go("FrameBase::Notice_insert.xfdl");
        };

        this.Button00_no_onclick = function(obj,e) {
        	this.fnSearch();
        };

        this.Grid00_oncelldblclick = function(obj,e)
        {
        	if(e.col == 0) {return;}
        	this.fnDetail();
        };

        this.fnCallback = function(svcID,errorCode,errorMsg) {
        	if(errorCode != 0) {
        		this.alert(errorCode+"\n"+errorMsg);
        		return;
        	}

        	switch(svcID) {
        		case "search":
        			if(this.ds_list.rowcount < 1) {
        				this.alert("조회된 결과가 없습니다.");
        			}
        		break;
        		case "detail":
        			if(this.ds_list.rowcount < 1) {
        				this.alert("조회된 결과가 없습니다.");
        			}
        		break;
        		case "delete":
        			this.alert("삭제 되었습니다.");
        		break;
        	}
        };

        this.fnSearch = function() {

        	this.ds_search.setColumn(0, "inputGbn", this.Combo00.value);
        	this.ds_search.setColumn(0, "inputTx", this.Edit00.text);

        	var strSvcId    = "search";
        	var strSvcUrl   = "svc::selectNotice.do";
        	var inData      = "input1=ds_search";
        	var outData     = "ds_list=output1";
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

        this.fnDetail = function() {

        	nexacro.getApplication().noticeKey = this.ds_list.getColumn(this.ds_list.rowposition, "NO");
        	this.go("FrameBase::Notice_detail.xfdl");

        };

        this.Grid00_oncellclick = function(obj,e)
        {
        	if(e.col == 0) {
        		if(this.ds_list.getColumn(e.row, "CHCK") == 'Y') {
        			this.ds_list.setColumn(e.row, "CHCK", "N");
        		} else if(this.ds_list.getColumn(e.row, "CHCK") == 'N') {
        			this.ds_list.setColumn(e.row, "CHCK", "Y");
        		}
        	}
        };

        this.Button02_onclick = function(obj,e) {

        	for(var i=this.ds_list.rowcount-1; i>=0; i--) {
        		trace(i);
        		trace(this.ds_list.getColumn(i, "CHCK") + '   ' + i);
        		if(this.ds_list.getColumn(i, "CHCK") == 'Y') {
        			this.ds_list.deleteRow(i);
        		}
        	}

        	this.fnDelete();
        };

        this.fnDelete = function() {
        	var strSvcId    = "delete";
        	var strSvcUrl   = "svc::deleteNotice.do";
        	var inData      = "input1=ds_list:U";
        	var outData     = "";
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
        }
        this.btn_gn_onclick = function(obj,e)
        {
        	this.go("FrameBase::FileUpload.xfdl");
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button00.addEventHandler("onclick",this.Button00_no_onclick,this);
            this.Grid00.addEventHandler("oncelldblclick",this.Grid00_oncelldblclick,this);
            this.Grid00.addEventHandler("onheadclick",this.Grid00_onheadclick,this);
            this.Grid00.addEventHandler("oncellclick",this.Grid00_oncellclick,this);
            this.Button01.addEventHandler("onclick",this.Button01_onclick,this);
            this.Button02.addEventHandler("onclick",this.Button02_onclick,this);
            this.btn_gn.addEventHandler("onclick",this.btn_gn_onclick,this);
        };

        this.loadIncludeScript("Notice_list.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
