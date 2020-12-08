package egovframework.thymleaf.notice.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.thymleaf.notice.service.ThymleafService;

@Service("thymleafService")
public class ThymleafServiceImple extends EgovAbstractServiceImpl implements ThymleafService {
	
	private Logger logger = LoggerFactory.getLogger(ThymleafServiceImple.class);
	
	@Resource(name = "thymleafMapper")
	private ThymleafMapper thymleafMapper;

	@Override
	public List<Map<String, Object>> selectNotice(Map<String, String> param) {
		return thymleafMapper.selectNotice(param);
	}

	@Override
	public Map<String, Object> selectNoticeDetail(String param) {
		return thymleafMapper.selectNoticeDetail(param);
	}

	@Override
	public int insertNotice(Map<String, String> param) {
		return thymleafMapper.insertNotice(param);
	}

	@Override
	public int updateNotice(Map<String, String> param) {
		return thymleafMapper.updateNotice(param);
	}

	@Override
	public int deleteNotice(Map<String, String> param) {
		return thymleafMapper.deleteNotice(param);
	}

	
}
