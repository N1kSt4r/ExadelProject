package bsu.exadelproject.postClasses;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.*;

public class Post {
    private String ID;
    private String description;
    private Date date;
    private Set<String> hashtags;
    private Set<String> likes;
    private String authorID;

    Post(String ID, String authorID, String description, final String hashtags) {
        this.ID = ID;
        this.authorID = authorID;
        this.date = new Date();
        this.description = description;
        this.likes = new HashSet<String>();
        this.setHashtags(hashtags);
    }

    public String getID() { return ID; }
    public String getAuthorID() { return authorID; }
    public Date getDate() { return date; }
    public String getDescription() { return description; }
    public Set<String> getHashtags() { return hashtags; }
    public Set<String> getLikes() { return likes; }

    public void setDescription(String description) {
        this.description = description;
    }
    public void setHashtags(String hashtags) {
        this.hashtags = new HashSet<String>(
                Arrays.asList(hashtags
                        .trim()
                        .replaceAll("#", "")
                        .split("[ ]+")
                )
        );
    }
    public void setLike(String ID) {
        if(this.likes.contains(ID)) {
            this.likes.remove(ID);
        } else {
            this.likes.add(ID);
        }
    }

    @Override
    public String toString() {
        Gson jsonBuilder = new GsonBuilder().setPrettyPrinting().create();
        return jsonBuilder.toJson(this);
    }
    static public Comparator<Post> cmpByDate = new Comparator<Post>() {
        public int compare(Post o1, Post o2) {
            return o1.date.compareTo(o2.date);
        }
    };
}
