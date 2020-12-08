package egovframework.nexacro.notice.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import egovframework.nexacro.notice.service.NexacroService;

@Controller
public class NexacroController {
	private Logger logger = LoggerFactory.getLogger(NexacroController.class);
	
	@Resource(name = "nexacroService")
	private NexacroService nexacroservice;
	
	@RequestMapping(value = "/nexacro/selectNotice.do")
	public NexacroResult selectNotice(@ParamDataSet(name = "input1", required = false) Map<String, String> param) {
		
		List<Map<String, Object>> list = nexacroservice.selectNotice(param);
		
		NexacroResult result = new NexacroResult();
		result.addDataSet("output1", list);
		
		return result;
	}
	
	@RequestMapping(value = "/nexacro/selectNoticeDetail.do")
	public NexacroResult selectNoticeDetail(@ParamVariable(name = "no", required = false) String param) {
		
		Map<String, Object> map = nexacroservice.selectNoticeDetail(param);
		
		NexacroResult result = new NexacroResult();
		result.addDataSet("noticeDetail", map);
		
		return result;
	}
	
	@RequestMapping(value = "/nexacro/insertNotice.do")
	public NexacroResult insertNotice(@ParamDataSet(name = "input1", required = false) Map<String, String> param) {
		
		int succes = nexacroservice.insertNotice(param);
		
		NexacroResult result = new NexacroResult();
		result.addDataSet("result", succes);
		
		return result;
	}
	
	@RequestMapping(value = "/nexacro/updateNotice.do")
	public NexacroResult updateNotice(@ParamDataSet(name = "input1", required = false) Map<String, String> param) {
		
		int succes = nexacroservice.updateNotice(param);
		
		NexacroResult result = new NexacroResult();
		result.addDataSet("result", succes);
		
		return result;
	}
	
	@RequestMapping(value = "/nexacro/deleteSingleNotice.do")
	public NexacroResult deleteSingleNotice(@ParamDataSet(name = "input1", required = false) Map<String, String> param) {
		
		param.put("USE_YN", "N");
		int succes = nexacroservice.deleteNotice(param);
		
		NexacroResult result = new NexacroResult();
		result.addDataSet("result", succes);
		
		return result;
	}
	
	@RequestMapping(value = "/nexacro/deleteNotice.do")
	public NexacroResult deleteNotice(@ParamDataSet(name = "input1", required = false) List<Map<String, String>> param) {
		
		int succes = 0;
		try {
			
			for(int i=0; i<param.size(); i++) {
				
				param.get(i).put("USE_YN", "N");
				succes = nexacroservice.deleteNotice(param.get(i));
				
				logger.debug("sucees : " + succes);
				logger.debug("mapString : " + param.get(i).toString());
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		NexacroResult result = new NexacroResult();
		result.addDataSet("result", succes);
		
		return result;
	}
}
