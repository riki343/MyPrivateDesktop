-- MySQL dump 10.13  Distrib 5.6.28, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: desktop
-- ------------------------------------------------------
-- Server version	5.6.28-0ubuntu0.15.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `UserDirectory`
--

DROP TABLE IF EXISTS `UserDirectory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserDirectory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `path` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `is_root` tinyint(1) NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_B9BA2CEC727ACA70` (`parent_id`),
  KEY `IDX_B9BA2CECA76ED395` (`user_id`),
  CONSTRAINT `FK_B9BA2CEC727ACA70` FOREIGN KEY (`parent_id`) REFERENCES `UserDirectory` (`id`),
  CONSTRAINT `FK_B9BA2CECA76ED395` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserDirectory`
--

LOCK TABLES `UserDirectory` WRITE;
/*!40000 ALTER TABLE `UserDirectory` DISABLE KEYS */;
INSERT INTO `UserDirectory` VALUES (1,2,'root','2016-02-19 20:01:26','/test/root',NULL,1,'0000-00-00 00:00:00'),(2,2,'music','2016-02-19 20:58:03','/test/root/music',1,0,'2016-02-19 20:58:03'),(5,2,'music1','2016-02-19 21:00:01','/test/root/music1',1,0,'2016-02-19 21:00:01'),(6,2,'new dir','2016-02-21 05:02:51','/test/root/new dir',1,0,'2016-02-21 05:02:51'),(7,2,'another one directory','2016-02-21 05:03:59','/test/root/another one directory',1,0,'2016-02-21 05:03:59'),(8,2,'some','2016-02-21 05:05:07','/test/root/some',1,0,'2016-02-21 05:05:07'),(9,2,'awdawd','2016-02-21 05:12:55','/test/root/awdawd',1,0,'2016-02-21 05:12:55'),(10,2,'asdadawdwd','2016-02-21 05:13:07','/test/root/new dir/asdadawdwd',6,0,'2016-02-21 05:13:07'),(11,2,'fvergerfrsf','2016-02-21 05:13:14','/test/root/new dir/asdadawdwd/fvergerfrsf',10,0,'2016-02-21 05:13:14'),(12,2,'sjchsjdf','2016-02-22 14:52:30','/test/root/sjchsjdf',1,0,'2016-02-22 14:52:30'),(13,2,'Windows must die','2016-02-22 15:42:14','/test/root/Windows must die',1,0,'2016-02-22 15:42:14');
/*!40000 ALTER TABLE `UserDirectory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserFile`
--

DROP TABLE IF EXISTS `UserFile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserFile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `directory_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `extension` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created` datetime NOT NULL,
  `size` double NOT NULL,
  `path` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_73A68309A76ED395` (`user_id`),
  KEY `IDX_73A683092C94069F` (`directory_id`),
  CONSTRAINT `FK_73A683092C94069F` FOREIGN KEY (`directory_id`) REFERENCES `UserDirectory` (`id`),
  CONSTRAINT `FK_73A68309A76ED395` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserFile`
--

LOCK TABLES `UserFile` WRITE;
/*!40000 ALTER TABLE `UserFile` DISABLE KEYS */;
INSERT INTO `UserFile` VALUES (1,2,1,'new-file.txt','txt','2016-02-19 20:54:11',0,'/test/root//new-file.txt','2016-02-19 20:54:11'),(2,2,1,'new-file1.txt','txt','2016-02-19 20:54:41',0,'/test/root//new-file1.txt','2016-02-19 20:54:41'),(3,2,1,'new-file2.txt','txt','2016-02-19 20:55:26',0,'/test/root/new-file2.txt','2016-02-19 20:55:26'),(4,2,1,'new-file3.txt','txt','2016-02-19 20:57:02',0,'/test/root/new-file3.txt','2016-02-19 20:57:02'),(5,2,2,'music1.mp3','mp3','2016-02-19 21:10:19',0,'/test/root/music/music1.mp3','2016-02-19 21:10:19'),(6,2,5,'music1.mp3','mp3','2016-02-19 21:12:32',0,'/test/root/music1/music1.mp3','2016-02-19 21:12:32');
/*!40000 ALTER TABLE `UserFile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audio_player_playlist`
--

DROP TABLE IF EXISTS `audio_player_playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audio_player_playlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_31C17AD7A76ED395` (`user_id`),
  CONSTRAINT `FK_31C17AD7A76ED395` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audio_player_playlist`
--

LOCK TABLES `audio_player_playlist` WRITE;
/*!40000 ALTER TABLE `audio_player_playlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `audio_player_playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desktop_items`
--

DROP TABLE IF EXISTS `desktop_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `desktop_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desktop_id` int(11) NOT NULL,
  `row` int(11) NOT NULL,
  `col` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `item` varchar(1024) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desktop_items`
--

LOCK TABLES `desktop_items` WRITE;
/*!40000 ALTER TABLE `desktop_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `desktop_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desktop_settings`
--

DROP TABLE IF EXISTS `desktop_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `desktop_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desktop_id` int(11) DEFAULT NULL,
  `background_image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `background_position` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `background_size` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_30E32EB8FFF2950E` (`desktop_id`),
  CONSTRAINT `FK_30E32EB8FFF2950E` FOREIGN KEY (`desktop_id`) REFERENCES `desktops` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desktop_settings`
--

LOCK TABLES `desktop_settings` WRITE;
/*!40000 ALTER TABLE `desktop_settings` DISABLE KEYS */;
INSERT INTO `desktop_settings` VALUES (1,1,'/images/1.jpg','center','cover','2016-02-22 23:23:26','2016-02-22 23:23:28');
/*!40000 ALTER TABLE `desktop_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desktops`
--

DROP TABLE IF EXISTS `desktops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `desktops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `grid` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desktops`
--

LOCK TABLES `desktops` WRITE;
/*!40000 ALTER TABLE `desktops` DISABLE KEYS */;
INSERT INTO `desktops` VALUES (1,1,'a:0:{}','2015-10-24 15:20:13','2015-10-24 15:20:16');
/*!40000 ALTER TABLE `desktops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ext_log_entries`
--

DROP TABLE IF EXISTS `ext_log_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ext_log_entries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `logged_at` datetime NOT NULL,
  `object_id` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `object_class` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `version` int(11) NOT NULL,
  `data` longtext COLLATE utf8_unicode_ci COMMENT '(DC2Type:array)',
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `log_class_lookup_idx` (`object_class`),
  KEY `log_date_lookup_idx` (`logged_at`),
  KEY `log_user_lookup_idx` (`username`),
  KEY `log_version_lookup_idx` (`object_id`,`object_class`,`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ext_log_entries`
--

LOCK TABLES `ext_log_entries` WRITE;
/*!40000 ALTER TABLE `ext_log_entries` DISABLE KEYS */;
/*!40000 ALTER TABLE `ext_log_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ext_translations`
--

DROP TABLE IF EXISTS `ext_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ext_translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `object_class` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `field` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `foreign_key` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lookup_unique_idx` (`locale`,`object_class`,`field`,`foreign_key`),
  KEY `translations_lookup_idx` (`locale`,`object_class`,`foreign_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ext_translations`
--

LOCK TABLES `ext_translations` WRITE;
/*!40000 ALTER TABLE `ext_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ext_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userfile_audioplayerplaylist`
--

DROP TABLE IF EXISTS `userfile_audioplayerplaylist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userfile_audioplayerplaylist` (
  `userfile_id` int(11) NOT NULL,
  `audioplayerplaylist_id` int(11) NOT NULL,
  PRIMARY KEY (`userfile_id`,`audioplayerplaylist_id`),
  KEY `IDX_15819574FAA85D2` (`userfile_id`),
  KEY `IDX_158195746E16BDE9` (`audioplayerplaylist_id`),
  CONSTRAINT `FK_158195746E16BDE9` FOREIGN KEY (`audioplayerplaylist_id`) REFERENCES `audio_player_playlist` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_15819574FAA85D2` FOREIGN KEY (`userfile_id`) REFERENCES `UserFile` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userfile_audioplayerplaylist`
--

LOCK TABLES `userfile_audioplayerplaylist` WRITE;
/*!40000 ALTER TABLE `userfile_audioplayerplaylist` DISABLE KEYS */;
/*!40000 ALTER TABLE `userfile_audioplayerplaylist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username_canonical` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email_canonical` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `salt` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `locked` tinyint(1) NOT NULL,
  `expired` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  `confirmation_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password_requested_at` datetime DEFAULT NULL,
  `roles` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `credentials_expired` tinyint(1) NOT NULL,
  `credentials_expire_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_1483A5E992FC23A8` (`username_canonical`),
  UNIQUE KEY `UNIQ_1483A5E9A0D96FBF` (`email_canonical`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'test','test','test@example.com','test@example.com',1,'kg912v1qjlwgwck4sgsckcwk00ggsw4','$2y$13$kg912v1qjlwgwck4sgsckOoTBsp0LeNAhHAHsV9d0kbqc01CMvvFq',NULL,0,0,NULL,NULL,NULL,'a:1:{i:0;s:10:\"ROLE_ADMIN\";}',0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-22 23:24:39
