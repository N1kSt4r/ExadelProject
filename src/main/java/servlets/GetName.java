package servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/get")
public class GetName extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String query = req.getQueryString();
        req.setAttribute(
                "context", query.matches("name=[(%20)\\w]{1,100}")
                        ? "Name is " + query.substring(5).replaceAll("[(%20)]+", " ").trim()
                        : "Invalid request"
        );
        req.getRequestDispatcher("myPage.jsp").forward(req, resp);
    }
}