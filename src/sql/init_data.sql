BEGIN TRANSACTION;
CREATE TABLE `region` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`name`	TEXT NOT NULL
);
INSERT INTO `region` VALUES (1,'Краснодарский край');
INSERT INTO `region` VALUES (2,'Ростовская область');
INSERT INTO `region` VALUES (3,'Ставропольский край');
CREATE TABLE "comments" (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`first_name`	TEXT NOT NULL,
	`last_name`	TEXT NOT NULL,
	`middle_name`	TEXT,
	`city_id`	INTEGER,
	`phone`	TEXT,
	`email`	TEXT,
	`comment`	TEXT NOT NULL
);
CREATE TABLE "city" (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`region_id`	INTEGER NOT NULL,
	`name`	TEXT NOT NULL
);
INSERT INTO `city` VALUES (1,1,'Краснодар');
INSERT INTO `city` VALUES (2,1,'Кропоткин');
INSERT INTO `city` VALUES (3,1,'Славянск');
INSERT INTO `city` VALUES (4,2,'Ростов');
INSERT INTO `city` VALUES (5,2,'Шахты');
INSERT INTO `city` VALUES (6,2,'Батайск');
INSERT INTO `city` VALUES (7,3,'Ставрополь');
INSERT INTO `city` VALUES (8,3,'Пятигорск');
INSERT INTO `city` VALUES (9,3,'Кисловодск');
COMMIT;
