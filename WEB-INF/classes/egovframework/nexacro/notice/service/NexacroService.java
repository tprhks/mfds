package egovframework.nexacro.notice.service;

import java.util.List;
import java.util.Map;

public interface NexacroService {
	List<Map<String, Object>> selectNotice(Map<String, String> param);
	Map<String, Object> selectNoticeDetail(String param);
	int insertNotice(Map<String, String> param);
	int updateNotice(Map<String, String> param);
	int deleteNotice(Map<String, String> param);
}
