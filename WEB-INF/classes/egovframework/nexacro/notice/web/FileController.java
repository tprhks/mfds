package egovframework.nexacro.notice.web;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.WebApplicationContext;

import com.nexacro.uiadapter17.spring.core.NexacroException;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.nexacro17.xapi.data.DataSet;
import com.nexacro17.xapi.data.datatype.PlatformDataType;

import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.FileCopyUtils;

@Controller
public class FileController {
	
	private Logger logger = LoggerFactory.getLogger(FileController.class);
    private static final String SP = File.separator;
    private static final String PATH = "WEB-INF"+SP+"attachFile";  //서버 첨부파일 경로
    private static String sUserPath = "";   //사용자 폴더경로

    @Autowired
    private WebApplicationContext appContext; 
    
    /*
      파일 저장 후 저장파일 정보 반환 (화면에서 호출)
     */     
    @RequestMapping(value = "/uploadFiles.do" )
    public NexacroResult uploadFiles(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	
    	//MultipartHttpServletRequest 체크
        if(!(request instanceof MultipartHttpServletRequest)) {
            if(logger.isDebugEnabled()) {
              logger.debug("Request is not a MultipartHttpServletRequest");
            }
            return new NexacroResult();
        }
        
        logger.debug("-------------------- nexacro platform uploadFiles ---------------------------");
        
        //반환될 파일저장 정보 Dataset 생성 
        DataSet resultDs = createDataSet4UploadResult();
        
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;

        //파라미터 처리
        uploadParameters(multipartRequest);
        //파일저장 및 파일정보 반환 Dagaset 셋팅처리
        uploadMultipartFiles(multipartRequest, resultDs);
        
        NexacroResult nexacroResult = new NexacroResult();
        nexacroResult.addDataSet(resultDs);
        nexacroResult.setErrorCode(0);
        nexacroResult.setErrorMsg("File Save Success!");

        return nexacroResult;
    }//uploadFiles
    
    /*
       파라미터 셋팅
     */
    private void uploadParameters(MultipartHttpServletRequest multipartRequest) throws NexacroException {
        // parameter and multipart parameter
        Enumeration<String> parameterNames = multipartRequest.getParameterNames();

        while(parameterNames.hasMoreElements()) {
            
            String parameterName = parameterNames.nextElement();
            if(parameterName == null || parameterName.length() == 0) {
                continue;
            }
            
            String value = multipartRequest.getParameter(parameterName);
            
            //화면 FileUpTransfer 의 setPostData 로 셋팅한 저장될 파일경로 String을 셋팅한다. ("file")
            if("filepath".equals(parameterName)) {
              if(value != null && !value.equals("")) {
                // "WEB-INF/attachFile/" + "sample"
                sUserPath = SP + value;
              }
              continue;                
            }
        }//while
    }//uploadParameters
   
    /*
      실제파일 저장 및 저장파일정보 셋팅
     */
    private void uploadMultipartFiles(MultipartHttpServletRequest multipartRequest, DataSet resultDs) throws IOException {
        
        Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
        String filePath = getFilePath();
        
        Set<String> keySet = fileMap.keySet();
        for(String name: keySet) {
            
            MultipartFile multipartFile = fileMap.get(name);

            String originalFilename = multipartFile.getOriginalFilename();

            // IE에서 파일업로드 시 DataSet 파라매터의 Content-Type이 설정되지 않아 여기로 옴. 무시.
            if(originalFilename == null || originalFilename.length() == 0) {
                continue;
            }
            
            File destination = new File(filePath);
            
            if( destination.exists() == false) {
              boolean mkdirs = destination.mkdirs();
              destination.setWritable(true);
              
              logger.debug("-------------- create directory ----------------------" + mkdirs);
            }
            
            File targetFile = new File(filePath+SP+originalFilename);

            InputStream inputStream = multipartFile.getInputStream();
            FileCopyUtils.copy(inputStream, new FileOutputStream(targetFile));
            
            int row = resultDs.newRow();
            resultDs.set(row, "fileid", originalFilename);
            resultDs.set(row, "filename", originalFilename);
            resultDs.set(row, "filesize", targetFile.length());
            
            logger.debug("uploaded file write success. file="+originalFilename);
        }//for
    }//uploadMultipartFiles
    
    /*
    파일을 저장할 절대경로 반환    
     */
    private String getFilePath() {
        ServletContext sc = appContext.getServletContext();
        String realPath = sc.getRealPath("/");
        String uploadPath = realPath + PATH + sUserPath;
        return uploadPath;
    }//getFilePath
    
    /*
    반환용 파일정보 데이터셋 생성
     */
    private DataSet createDataSet4UploadResult() {
        
        DataSet ds = new DataSet("ds_output");
        ds.addColumn("fileid", PlatformDataType.STRING);
        ds.addColumn("filename", PlatformDataType.STRING);
        ds.addColumn("filesize", PlatformDataType.INT);
        
        return ds;
    }//createDataSet4UploadResult

}
