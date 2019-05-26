create schema if not exists ExadelProject;
use ExadelProject;

create table if not exists USER (
	USER_ID int auto_increment not null,
    NAME varchar(40) not null,
    unique(USER_ID),
    primary key (USER_ID)
);

create table if not exists PhotoPost (
	POST_ID int auto_increment not null,
	DESCRIPTION varchar(255) default '',
	CREATION_DATE datetime default now(),
	PHOTO_LINK varchar(255) not null,
	LIKES int default 0,
	HASHTAGS varchar(80) default '',
	USER_ID int not null,
	primary key (POST_ID)
);


