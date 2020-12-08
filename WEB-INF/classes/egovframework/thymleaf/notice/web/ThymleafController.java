package egovframework.thymleaf.notice.web;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import egovframework.thymleaf.notice.service.ThymleafService;

@Controller
public class ThymleafController {
	
	@Resource(name = "thymleafService")
	private ThymleafService  thymeleafService;
	
	@RequestMapping(value = "/thymleaf/")
	public String thymleaIndex(Model model, @RequestParam Map<String, String> param) {
		
		List<Map<String, Object>> list = thymeleafService.selectNotice(param);
		
		model.addAttribute("noticeList", list);
		model.addAttribute("inputTx", param.get("inputTx"));
		model.addAttribute("inputGbn", param.get("inputGbn"));
		return "notice/noticeList.html";
	}
	
	@RequestMapping(value = "/thymleaf/deleteNotice.th")
	public String deleteNotice(Model model, @RequestParam(name = "no", required = false) String[] param) {
		
		int succes = 0;
		try {
			
			for(int i=0; i<param.length; i++) {
				
				Map<String, String> map = new HashMap<>();
				
				map.put("NO", param[i]);
				map.put("USE_YN", "N");
				map.put("REG_ID", "invako");
				succes = thymeleafService.deleteNotice(map);
				
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		model.addAttribute("result", succes);
		
		return "forward:/thymleaf/";
	}
	
	@RequestMapping(value = "/thymleaf/insertNoticeEmpty.th")
	public String insertNoticeEmpty(Model model, @RequestParam(name = "no", required = false) String param) {
		
		Map<String, Object> detail = null;
		
		if(null != param && !"".equals(param)) {
			detail = thymeleafService.selectNoticeDetail(param);
		}
		
		model.addAttribute("notice", detail);
		return "notice/noticeInsert.html";
	}
	
	@RequestMapping(value = "/thymleaf/insertNotice.th")
	public String insertNotice(Model model, @RequestParam Map<String, String> param) {
		
		int succes = 0; 
		
		try {
			
			if(null != param.get("no") && !"".equals(param.get("no"))) {
				succes = thymeleafService.updateNotice(param);
			} else {
				succes = thymeleafService.insertNotice(param);
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		model.addAttribute("result", succes);
		return "forward:/thymleaf/";
	}
	
	@RequestMapping(value = "/thymleaf/updateNotice.th")
	public String updateNotice(Model model, @RequestParam Map<String, String> param) {
		
		int succes = thymeleafService.updateNotice(param);
		
		model.addAttribute("result", succes);
		
		return "forward:/thymleaf/";
	}

	@RequestMapping(value = "/thymleaf/detailNotice.th")
	public String detailNotice(Model model, @RequestParam(name = "no", required = false) String param) {
		
		Map<String, Object> detail = null;	
		
		if(null != param && !"".equals(param)) {
			detail = thymeleafService.selectNoticeDetail(param);
		}
		
		model.addAttribute("notice", detail);
		
		return "notice/noticeDetail.html";
	}
}