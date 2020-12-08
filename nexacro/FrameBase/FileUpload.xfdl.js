(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("sample_fileuptransfer_01");
            this.set_titletext("New Form");
            this.set_border("");
            this.set_background("");
            this.getSetter("enctype").set("multipart/form-data");
            if (Form == this.constructor)
            {
                this._setFormPosition(1024,768);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsFileList", this);
            obj._setContents("<ColumnInfo><Column id=\"fileName\" type=\"STRING\" size=\"256\"/><Column id=\"fileSize\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new FileUpTransfer("FileUpTransfer00", this);
            this.addChild(obj.name, obj);


            obj = new FileDialog("FileDialog00", this);
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("Button00","454","50","148","60",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("Button00");
            this.addChild(obj.name, obj);

            obj = new Button("Button01","454","125","148","60",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("Button01");
            this.addChild(obj.name, obj);

            obj = new Button("Button02","454","200","148","60",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("Button02");
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","20","187","410","367",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_readonly("true");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","15","32","417","138",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_binddataset("dsFileList");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"fileName\"/><Cell col=\"1\" text=\"fileSize\"/></Band><Band id=\"body\"><Cell text=\"bind:fileName\"/><Cell col=\"1\" text=\"bind:fileSize\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",this._adjust_width,this._adjust_height,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("FileUpload.xfdl", function() {
        this.sFileUrl = "http://localhost:8080/uploadFiles.do"; //파일전송 URL
        this.nMaxFileSize = 2000000;  //각 파일 최대사이즈 (2 Mbyte)

        //파일추가 버튼클릭
        this.Button00_no_onclick = function(obj,e)
        {
          this.FileDialog00.open( "파일선택", FileDialog.LOAD );
        };

        //파일선택창(FileDialog) 닫힐시
        //Web 은 e.reason 이 1(FileDialog.LOAD) 이나 3(FileDialog.MULTILOAD) 일경우에만 발생
        this.FileDialog00_onclose = function(obj,e)
        {
          if(e.reason == 0 ) {  //파일선택 취소
            return;
          }else{
            if(e.reason == 1) {    //FileDialog.LOAD 옵션의 파일선택
              var vFile = e.virtualfiles[0];
              var isExist = this.FileUpTransfer00.existFile(vFile);

              //파일중복체크
              if(isExist){
                alert("이미추가된 파일이 있습니다.");
                return;
              }

              //VirtualFile 이벤트 생성
              vFile.addEventHandler("onsuccess", this.Upload_VirtualFile_onsuccess, this);
              vFile.addEventHandler("onerror", this.Upload_VirtualFile_onerror, this);

              //File 사이즈 체크를 위해
              vFile.open(null,VirtualFile.openRead);
            }
          }
        };

        //업로드용 Virtual 파일 onsuccess 이벤트
        this.Upload_VirtualFile_onsuccess = function(obj, e)
        {
          if (e.reason == 1)  //open() callback
          {
            //파일사이즈 체크
            obj.getFileSize();
          }
          if (e.reason == 9) //getFileSize() callback
          {
            obj.close();

            var sFileName = obj.filename;
            var nFileSize = e.filesize;

            if(nFileSize > this.nMaxFileSize){
              alert("첨부파일 최대용량은 2 MByte 입니다.");
              return;
            }


            //FileUpTransfer 해당 파일추가
            var nIdx = this.FileUpTransfer00.addFile(sFileName,obj);

            //화면 파일정보 셋팅
            var nRow = this.dsFileList.insertRow(nIdx);
             this.dsFileList.setColumn(nRow, "fileName", sFileName);
             this.dsFileList.setColumn(nRow, "fileSize", nFileSize);
          }
        }

        //업로드용 Virtual 파일 oneroor 이벤트
        this.Upload_VirtualFile_onerror = function(obj, e)
        {
          var msg = ">>>>>>>>> VirtualFile event ERROR >>>>>>>>\n";
          msg += "errortype : "+e.errortype+"\n";
          msg += "errormsg : "+e.errormsg+"\n";
          msg += "statuscode : "+e.statuscode;

          alert(msg);
        }

        //그리드 삭제이미지 클릭시
        this.Grid00_onexpandup = function(obj,e)
        {
          var nRow = e.row;

          //FileUpTransfer 해당 파일삭제
          var nIdx = this.FileUpTransfer00.removeFileByIndex(nRow);

          //정상삭제 시 해당 데이터 삭제
          if(nIdx > -1) {
            obj.getBindDataset().deleteRow(nRow);
          }
        };

        //초기화 버튼 클릭시
        this.Button01_no_onclick = function(obj,e)
        {
          //파일정보 초기화
          this.fn_FileClear();
        };

        //파일전송 성공시
        this.FileUpTransfer00_onsuccess = function(obj,e)
        {
          var msg = ">>>>>>>>>>>>>>>>>>>>>>>>>>  SUCCESS >>>>>>>>>>>>>>>>>>>>>>>>>>\n";
          msg += "code :"+e.code+"\n";
          msg += "message :"+e.message+"\n";
          msg += "url :"+e.url+"\n";
          msg += "datasets[0].saveXML() :"+e.datasets[0].saveXML()+"\n";

          this.TextArea00.set_value(msg);

          //파일정보 초기화
          this.fn_FileClear();
        };

        //파일전송 중
        this.FileUpTransfer00_onprogress = function(obj,e)
        {
          trace(e.loaded +" / "+e.total +" Byte Uploading...");
        };

        //파일전송 실패시
        this.FileUpTransfer00_onerror = function(obj,e)
        {
          var msg = ">>>>>>>>>>>>>>>>>>>>>>>>>>  ERROR >>>>>>>>>>>>>>>>>>>>>>>>>>\n";
          msg += "statuscode: "+e.statuscode+"\n";
          msg += "requesturi: "+e.requesturi+"\n";
          msg += "locationuri: "+e.locationuri+"\n" ;
          msg += "errormsg: "+e.errormsg+"\n";

          this.TextArea00.set_value(msg);
        };

        //파일전송 버튼클릭
        this.Button02_no_onclick = function(obj,e)
        {
          //파일업로드시 파일저장 폴더경로 PostData 셋팅
          this.FileUpTransfer00.setPostData("filepath","sample");
          this.alert(this.FileUpTransfer00.getPostData("filepath"));
          //파일업로드 전송 URL 셋팅
          this.FileUpTransfer00.set_url(this.sFileUrl);

          if(this.FileUpTransfer00.filelist.length == 0) {
            alert("첨부한 파일이 없습니다.");
            return;
          }

          //파일전송
          this.FileUpTransfer00.upload();
        };
          //파일정보 초기화
          this.fn_FileClear = function (){
          //FileUpTransfer 파일 모두삭제
          this.FileUpTransfer00.clearFileList();
          //파일정보 모두삭제
          this.dsFileList.clearData();
        }
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button00.addEventHandler("onclick",this.Button00_no_onclick,this);
            this.Button01.addEventHandler("onclick",this.Button01_no_onclick,this);
            this.Button02.addEventHandler("onclick",this.Button02_no_onclick,this);
            this.Grid00.addEventHandler("onexpandup",this.Grid00_onexpandup,this);
            this.FileUpTransfer00.addEventHandler("onerror",this.FileUpTransfer00_onerror,this);
            this.FileUpTransfer00.addEventHandler("onprogress",this.FileUpTransfer00_onprogress,this);
            this.FileUpTransfer00.addEventHandler("onsuccess",this.FileUpTransfer00_onsuccess,this);
            this.FileDialog00.addEventHandler("onclose",this.FileDialog00_onclose,this);
        };

        this.loadIncludeScript("FileUpload.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
