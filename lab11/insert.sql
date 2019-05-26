truncate table User;
truncate table PhotoPost;

INSERT USER(name)
VALUES
('Valentin Dytin'), ('Vladimir Pytin'), ('Vladislav Nytin'), ('Eclair'), 
('Pavel'), ('Pasha'), ('Pavlik'), ('Pahan'), ('Python4'), ('Pashtet');

INSERT PhotoPost(Description, Photo_Link, Hashtags, User_id, Creation_Date)
VALUES
("Lorem ipsum dolor sit amet consectetur, adipisicing elit.", ".img/userM.svg", '', 2, now()),
("Maxime magnam libero similique.", ".img/userM.svg", 'iwanttoeat', 3, '2019.05.01'),
("aaa", ".img/a.png", "a A aaa", 6, now()),
("bbb", ".img/b.png", "b B", 6, now()),
("ccc", ".img/c.png", "c", 6, now()),
("ddd", ".img/d.png", "d D", 6, now()),
("eee hello", ".img/e.png", "e eee", 6, now()),
("fff", ".img/f.png", "f F fff", 6, now()),
("Ne ymeu schitat' do 10", ".img/1.png", '', 9, '2019.05.01');