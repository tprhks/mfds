package egovframework.nexacro.notice.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.nexacro.notice.service.NexacroService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("nexacroService")
public class NexacroServiceImple extends EgovAbstractServiceImpl implements NexacroService {
	private Logger logger = LoggerFactory.getLogger(NexacroServiceImple.class);
	
	@Resource(name = "nexacroMapper")
	private NexacroMapper nexacroMapper;

	@Override
	public List<Map<String, Object>> selectNotice(Map<String, String> param) {
		return nexacroMapper.selectNotice(param);
	}

	@Override
	public Map<String, Object> selectNoticeDetail(String param) {
		return nexacroMapper.selectNoticeDetail(param); 
	}

	@Override
	public int insertNotice(Map<String, String> param) {
		return nexacroMapper.insertNotice(param);
	}

	@Override
	public int updateNotice(Map<String, String> param) {
		return nexacroMapper.updateNotice(param);
	}

	@Override
	public int deleteNotice(Map<String, String> param) {
		return nexacroMapper.deleteNotice(param);
	}
}
