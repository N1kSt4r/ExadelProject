package bsu.exadelproject.postClasses;

import java.util.ArrayList;

public class Filter {
    String[] keywords;
    Filter(String pattern) {
        keywords = pattern
                .trim()
                .replaceAll("[.,!?:#-]+", "")
                .split("[\\s]+");
    }
    class EstimatePost {
        Post post;
        int estimate;
    }
    ArrayList<Post> doFilter(ArrayList<Post> posts) {
        ArrayList<Post> res = new ArrayList<>();
        for (Post post : posts) {

        }
        return res;
    }
}
