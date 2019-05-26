package bsu.exadelproject.postClasses;

import java.util.*;

public class Gallery {
    private ArrayList<Post> posts;

    Gallery(List<Post> posts) {
        this.posts = new ArrayList<Post>(posts);
        this.posts.sort(Post.cmpByDate);
    }
    Gallery() { this.posts = new ArrayList<Post>(); }

    Post get(String ID) {
        for (Post post : posts) {
            if (post.getID().equals(ID)) {
                return post;
            }
        }
        return null;
    }
}
