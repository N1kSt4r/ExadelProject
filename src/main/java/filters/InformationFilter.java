package filters;

import servlets.CheckServlet;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter("/status")
public class InformationFilter implements Filter {
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
            IOException, ServletException {
        HttpServletRequest hreq = (HttpServletRequest)request;
        HttpServletResponse hres = (HttpServletResponse)response;

        String query = hreq.getQueryString();
        if (query == null || !query.contains("methodType")) {
            long start = System.currentTimeMillis();
            chain.doFilter(request, response);
            long end = System.currentTimeMillis();

            StringBuilder newURL = new StringBuilder(hreq.getRequestURL());
            newURL.append("?");
            if (query != null && !query.equals("")) {
                newURL.append(query);
                newURL.append("&");
            }
            newURL.append(String.format("methodType=%s&time=%s", hreq.getMethod(),
                    Long.toString(end - start)));

            hres.sendRedirect(newURL.toString());
        } else {
            chain.doFilter(request, response);
        }
    }
}
