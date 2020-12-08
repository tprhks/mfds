package egovframework.thymleaf.notice.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("thymleafMapper")
public interface ThymleafMapper {
	List<Map<String, Object>> selectNotice(Map<String, String> param);
	Map<String, Object> selectNoticeDetail(String param);
	int insertNotice(Map<String, String> param);
	int updateNotice(Map<String, String> param);
	int deleteNotice(Map<String, String> param);
}