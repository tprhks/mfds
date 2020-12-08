package egovframework.thymleaf.config;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;

public class SpringWebInitializer implements WebApplicationInitializer {

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		FilterRegistration charEncodingFilterReg = servletContext.addFilter("CharacterEncodingFilter", CharacterEncodingFilter.class);
		charEncodingFilterReg.setInitParameter("encoding", "UTF-8");
		charEncodingFilterReg.setInitParameter("forceEncoding", "true");
		charEncodingFilterReg.addMappingForUrlPatterns(null, true, "/thymleaf/*");
		
		AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
		context.register(ThymeleafConfig.class);
		context.setServletContext(servletContext);
		
		Dynamic servlet = servletContext.addServlet("dispatcher", new DispatcherServlet(context));
		servlet.addMapping("*.th");
		servlet.addMapping("/thymleaf/");
		servlet.setLoadOnStartup(2);
	}
}
