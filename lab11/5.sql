select user.name from User, PhotoPost where User.USER_ID = PhotoPost.USER_ID
group by USER.USER_ID
having count(PhotoPost.USER_ID) > 3