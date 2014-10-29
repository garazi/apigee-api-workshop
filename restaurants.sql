# ************************************************************
# Sequel Pro SQL dump
# Version 4315
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.29)
# Database: sample
# Generation Time: 2014-10-29 00:01:42 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table restaurants
# ------------------------------------------------------------

DROP TABLE IF EXISTS `restaurants`;

CREATE TABLE `restaurants` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` text,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT '',
  `phone` text,
  `category` text,
  `restID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;

INSERT INTO `restaurants` (`id`, `name`, `address`, `city`, `state`, `location`, `phone`, `category`, `restID`)
VALUES
	(1,'Pomegranate Cafe','4025 E Chandler Blvd','Phoenix','AZ','{\"latitude\":33.3044612,\"longitude\":-111.9945753}','+1-480-706-7472','Coffee & Tea',1),
	(2,'Los Taquitos','4747 E Elliot Rd','Phoenix','AZ','{\"latitude\": 33.3480616,\"longitude\": -111.9820214}','+1-480-753-4370','Mexican',2),
	(3,'Spring Roll Factory','6165 W Chandler Blvd','Chandler','AZ','{\"latitude\":33.3044272,\"longitude\":-111.9479565}','+1-480-785-0625','Vietnamese',3),
	(4,'Ezekiel\'s Restaurant','4825 E Warner Rd','Phoenix','AZ','{\"latitude\":33.3293584260744,\"longitude\":-111.979372836649}','+1-480-785-4886','American (New)',4),
	(5,'Great Wok','3646 E Ray Rd','Phoenix','AZ','{ \"latitude\": 33.3165959,\"longitude\": -112.0036214}','+1-480-706-5000','Chinese',5),
	(6,'Thailicious','5865 W Ray Rd','Chandler','AZ','{\"latitude\":33.3186906,\"longitude\":-111.9437771}','+1-480-306-6792','Thai',6),
	(7,'Kai','5594 W Wild Horse Pass Blvd','Chandler','AZ','{ \"latitude\": 33.2664769, \"longitude\": -111.9918702 }','+1-602-225-0100','American (New)',7),
	(8,'CK\'s Tavern & Grill','4142 E Chandler Blvd','Phoenix','AZ','{ \"latitude\": 33.3057628, \"longitude\": -111.9933802 }','+1-480-706-5564','American (Traditional)',8),
	(9,'Crêpe Bar','7520 S Rural Rd','Tempe','AZ','{\"latitude\":33.3497113609575,\"longitude\":-111.929925579031}','+1-480-247-8012','Creperies',9),
	(10,'In-N-Out Burger','7050 W Ray Rd','Chandler','AZ','{\"latitude\": 33.3204548, \"longitude\": -111.9641591}','+1-800-786-1000','Burgers',10),
	(11,'Farm At South Mountain','6106 S 32nd St','Phoenix','AZ','{\"latitude\":33.3906771,\"longitude\":-112.0129108}','+1-602-276-6360','Fruits & Veggies',11),
	(12,'Hillside Spot','4740 E Warner Rd','Phoenix','AZ','{\"latitude\": 33.3204548, \"longitude\": -111.9641591 }','+1-480-705-7768','Breakfast & Brunch',12),
	(13,'Mr Chao\'s Asian Bistro','4232 E Chandler Blvd','Phoenix','AZ','{\"latitude\":33.305945,\"longitude\":-111.99117}','+1-480-759-2899','Chinese',13),
	(14,'Tott\'s Asian Diner','4030 W Ray Rd','Chandler','AZ','{ \"latitude\": 33.3203454, \"longitude\": -111.9970792 }','+1-480-897-7928','Chinese',14),
	(15,'Panda Garden','4730 E Warner Rd','Phoenix','AZ','{\"latitude\":33.333182,\"longitude\":-111.983142}','+1-480-598-9018','Chinese',15),
	(16,'Va Bene','4647 E Chandler Blvd','Phoenix','AZ','{\"latitude\":33.304026,\"longitude\":-111.980951}','+1-480-706-4070','Italian',16),
	(17,'Star of India','4025 E Chandler Blvd','Phoenix','AZ','{\"latitude\": 33.304667, \"longitude\": -111.9945819 }','+1-480-706-1700','Indian',17),
	(18,'Biscuits','4623 E Elliott Rd','Phoenix','AZ','{\"latitude\":33.3487055477927,\"longitude\":-111.983256340027}','+1-480-209-1850','Breakfast & Brunch',18),
	(19,'Chanpen Thai Cuisine','2727 E Broadway Rd','Phoenix','AZ','{ \"latitude\": 33.4067006, \"longitude\": -112.0224394 }','+1-602-276-3778','Thai',19),
	(20,'AZ Bread Company','315 W Elliot Rd','Tempe','AZ','{\"latitude\":33.348763010085996,\"longitude\":-111.94435105010001}','+1-480-831-1300','Breakfast & Brunch',20);

/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table reviews
# ------------------------------------------------------------

DROP TABLE IF EXISTS `reviews`;

CREATE TABLE `reviews` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `reviewer` varchar(255) DEFAULT NULL,
  `restID` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `body` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;

INSERT INTO `reviews` (`id`, `title`, `reviewer`, `restID`, `rating`, `body`)
VALUES
	(1,'Best Tacos in town','TJ',2,4,'You have to try the Baja tacos! The fish is amazing and so fresh, and the sauce is just spicy enough.'),
	(2,'Burrito was a bit tough','benny',2,2,'We stopped by close to 9pm for a burrito and a margarita. The margarita was awesome, but the burrito was tough. It seemed like it might\'ve been sitting out for a couple of hours.'),
	(3,'Great spot for happy hour','scooby',2,5,'This is one of our favorite spots for drinks after work. The patio is generally packed during good weather, so it\'s best to get there early. And the house tequila better than top shelf stuff elsewhere.'),
	(4,'Taco Tuesdays are the bomb','captkirk',2,4,'The kids love taco Tuesdays! It\'s the perfect place to avoid cooking - and you can\'t beat the fact that all the tacos are only 2 bucks a piece.'),
	(5,'The namesake tea is delicious','luke',1,5,'Whether you are looking for a spot to start your day or end your day, this is a great spot.'),
	(6,'Tea, tea, tea','wileycoyote',1,4,'Love the huge selection of teas - can\'t miss!'),
	(7,'Best food this side of Hong Kong','bugsy',3,4,'Having lived and worked in Asia for many years, I can attest to just how good this food is. Very authentic.'),
	(8,'Lousy service','houdini',4,2,'The servers were walking in slow motion and brought the wrong order - twice!'),
	(9,'Forget the spring rolls - go for the noodles','johnnyapples',3,5,'Went for the spring rolls, which were good. But I\'ll be going back for the amazing noodle bowls.'),
	(10,'Double Double - Animal Style','TJ',10,5,'Seriously, is there any better burger in the entire world?!'),
	(11,'Spices that are off the chart','benny',6,4,'When they say hot, they really, really, really mean it! Better bring a fire hose with you.'),
	(12,'Great find, in a great neighborhood','scooby',9,4,'Breakfast, lunch or dinner, you can\'t go wrong here. They are even open late if you want to swing by for dessert.'),
	(13,'Try the chocolate and strawberries','captkirk',9,5,'Is it wrong to crave these for breakfast?'),
	(14,'These guys make it wok!','luke',5,4,'Fresh, fresh, fresh. Great lunch spot.'),
	(15,'Always a pleasure!','wileycoyote',7,5,'Simply amazing from the cocktails to appetizers to entrees and, of course, the dessert!'),
	(16,'Lots of taps, but skip the food','bugsy',8,3,'If it\'s beer that you\'re after, it\'s a great place. But eat before you go (or after), cause the food is nothing to write home about.'),
	(17,'Good lunch menu','houdini',8,4,'I love stopping in for a quick business lunch on the outdoor patio. Good prices, too.'),
	(18,'Try the Double Double - protein style','fredflint',10,4,'Mix it up and drop the bread. It\'s a double double wrapped in crispy lettuce. Grab some extra napkins though, it drips a lot.'),
	(19,'All around good food','johnnyapples',5,4,'Can\'t complain about a very consistent joint. Get there early on a Friday though, because it tends to fill up quickly.'),
	(20,'This place is great','Greg',3,5,'I eat here all the time');

/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `username`, `email`)
VALUES
	(1,'Thomas Jefferson','TJ','tj@monticello.com'),
	(2,'Benjamin Franklin','benny','benny@philly.gov'),
	(3,'Scooby Doo','scooby','scooby@mysterymachine.biz'),
	(4,'James T Kirk','captkirk','jim@enterprise.us'),
	(5,'Luke Skywalker','luke','luke@skywalker.me'),
	(6,'Wiley Coyote','wileycoyote','wileycoyote@acme.com'),
	(7,'Bugs Bunny','bugsy','bugs@wb.com'),
	(8,'Harry Weiss','houdini','harry@escapesr.us'),
	(9,'Jonathon Appleseed','johnnyapples','j@appleseed.com'),
	(10,'Fred Flintstone','fredflint','fred@flintstones.us');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
