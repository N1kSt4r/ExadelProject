package bsu.exadelproject.filters;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(urlPatterns = {"/", "/status", "/get", "/check", "/page", "/test1", "/test2"})
public class TestFilter implements Filter {
    public void destroy() {}
    public void init(FilterConfig filterConfig) {}

    public void doFilter(ServletRequest req, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest)req;
        long workTime = System.currentTimeMillis();

        chain.doFilter(req, response);
        System.out.format("%s - %s - %dms\n",
                request.getMethod(),
                request.getRequestURL(),
                System.currentTimeMillis() - workTime
        );
    }
}
