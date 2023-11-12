create database `sprint_dating`;
use `sprint_dating`;
create table `relationship_status`(
	`id` int primary key auto_increment,
    `name` varchar(100),
    `is_deleted` bit(1) default 0
);
create table `privacy_posts`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `is_deleted` bit(1) default 0
);
create table `account_types`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `is_deleted` bit(1) default 0
);
create table `roles`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `is_deleted` bit(1) default 0
);
create table `package_types`(
	`id` int primary key auto_increment,
	`name` varchar(100),
	`price` double,
    `days` int,
    `account_type_id` int,
	foreign key (`account_type_id`) references `account_types`(`id`),  
    `is_deleted` bit(1) default 0
);
create table `hobbies`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `is_deleted` bit(1) default 0
);
create table `location`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `is_deleted` bit(1) default 0
);
create table `genders`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `is_deleted` bit(1) default 0
);
create table `jobs`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `is_deleted` bit(1) default 0
);
create table `message_status`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `offline_moment` datetime,
    `is_deleted` bit(1) default 0
);
create table `warning`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `is_deleted` bit(1) default 0
);
create table `accounts`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `user_name` varchar(100),
    `password` varchar(100),
    `birthday` date,
    `email` varchar(100),
    `phone_number` varchar(15),
    `money` double,
    `regis_date` datetime,
    `avatar` varchar(100),
    `expire` date,
    `message_status_id` int,
    `marital_status` varchar(100),
    `point` int,
    `role_id` int,
    `gender_id` int,
    `location_id` int,
    `job_id` int,
	foreign key (`message_status_id`) references `message_status`(`id`),
   	foreign key (`role_id`) references `roles`(`id`),   
  	foreign key (`gender_id`) references `genders`(`id`),
    foreign key (`location_id`) references `location`(`id`),  
	foreign key (`job_id`) references `jobs`(`id`),
    `is_deleted` bit(1) default 0
);
create table `hobby_detail`(
	`id` int primary key auto_increment,
    `account_id` int,
    `hobby_id` int,
	foreign key (`account_id`) references `accounts`(`id`), 
    foreign key (`hobby_id`) references `hobbies`(`id`), 
    `is_deleted` bit(1) default 0
);
create table `gifts`(
	`id` int primary key auto_increment,
	`name` varchar(100),
    `image` longtext,
    `price` int,
    `is_deleted` bit(1) default 0
);
create table `gift_record`(
	`id` int primary key auto_increment,
    `quantity` int,
    `time` datetime,
    `receiver_account_id` int,
    `sender_account_id` int,
    `gift_id` int,
    foreign key (`receiver_account_id`) references `accounts`(`id`),
	foreign key (`sender_account_id`) references `accounts`(`id`),
    foreign key (`gift_id`) references `gifts`(`id`),
	`is_deleted` bit(1) default 0
);
create table `relationships`(
	`id` int primary key auto_increment,
    `date_request` datetime,
    `receiver_account_id` int,
    `sender_account_id` int,
    `relationship_status_id` int,
	foreign key (`receiver_account_id`) references `accounts`(`id`),
	foreign key (`sender_account_id`) references `accounts`(`id`),
    foreign key (`relationship_status_id`) references `relationship_status`(`id`),
    `is_deleted` bit(1) default 0
);
create table `warning_details`(
	`id` int primary key auto_increment,
    `date` datetime,
    `description` longtext,
    `warning_id` int,
    `account_id` int,
	foreign key (`warning_id`) references `warning`(`id`),  
	foreign key (`account_id`) references `accounts`(`id`),   
    `is_deleted` bit(1) default 0
);
create table `posts`(
	`id` int primary key auto_increment,
    `date` datetime,
    `content` longtext,
    `image` varchar(255),
    `account_id` int,
    `privacy_post_id` int,
	foreign key (`account_id`) references `accounts`(`id`), 
    foreign key (`privacy_post_id`) references `privacy_posts`(`id`), 
    `is_deleted` bit(1) default 0
);
create table `like_detail`(
	`id` int primary key auto_increment,
    `date` datetime,
    `account_id` int,
    `post_id` int,
	foreign key (`account_id`) references `accounts`(`id`), 
    foreign key (`post_id`) references `posts`(`id`), 
    `is_deleted` bit(1) default 0
);
create table `comments`(
	`id` int primary key auto_increment,
    `date` datetime,
    `content` longtext,
    `account_id` int,
    `post_id` int,
	foreign key (`account_id`) references `accounts`(`id`), 
    foreign key (`post_id`) references `posts`(`id`), 
    `is_deleted` bit(1) default 0
);
create table `package_detail`(
	`id` int primary key auto_increment,
    `account_id` int,
    `account_type_id` int,
	foreign key (`account_id`) references `accounts`(`id`), 
    foreign key (`account_type_id`) references `account_types`(`id`), 
    `is_deleted` bit(1) default 0
);
create table `message`(
	`id` int primary key auto_increment,
	`sender_account_id` int,
	`receiver_account_id` int,
    `path` varchar(100),
	foreign key (`sender_account_id`) references `accounts`(`id`), 
    foreign key (`receiver_account_id`) references `accounts`(`id`), 
	`is_deleted` bit(1) default 0
);