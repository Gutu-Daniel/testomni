-- MariaDB dump 10.17  Distrib 10.4.13-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: sosmed
-- ------------------------------------------------------
-- Server version	10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apps`
--

DROP TABLE IF EXISTS `apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `key` int(11) DEFAULT NULL,
  `route` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apps`
--

LOCK TABLES `apps` WRITE;
/*!40000 ALTER TABLE `apps` DISABLE KEYS */;
INSERT INTO `apps` VALUES (1,'points',0,'public-ledger'),(2,'office',1,'office'),(3,'linkstore',2,'linkstore'),(4,'interview',3,'interview'),(5,'storage',4,'storage'),(6,'crm',5,'onlineoffice'),(7,'ecrm',6,'office'),(8,'blog',7,'blog'),(9,'process',8,'opportunity');
/*!40000 ALTER TABLE `apps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backoffice_intro`
--

DROP TABLE IF EXISTS `backoffice_intro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `backoffice_intro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secondary_title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `intro_summary` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mission_summary` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `about_summary` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backoffice_intro`
--

LOCK TABLES `backoffice_intro` WRITE;
/*!40000 ALTER TABLE `backoffice_intro` DISABLE KEYS */;
INSERT INTO `backoffice_intro` VALUES (1,'this is some title','this is second title','this is intro summary','this is mission summary','and this is about summary');
/*!40000 ALTER TABLE `backoffice_intro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backoffice_setup`
--

DROP TABLE IF EXISTS `backoffice_setup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `backoffice_setup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secondary_title` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `steps_summary` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `step1_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `step1_description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `step2_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `step2_description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `step3_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `step3_description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `step4_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `step4_description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backoffice_setup`
--

LOCK TABLES `backoffice_setup` WRITE;
/*!40000 ALTER TABLE `backoffice_setup` DISABLE KEYS */;
INSERT INTO `backoffice_setup` VALUES (1,'Setup Page','the purpose of this page is to create another apps','after step site instructions','this section is to enter the app code','Lorem ipsum dolor sit amet, consectetur adipiscing elit','Lorem ipsum dolor sit amet','Class aptent taciti sociosqu ad litora torquent per conubia nostra','In semper viverra turpis eget lobortis.','Suspendisse eu aliquet sapien. Mauris sed sapien orci.','Interdum et malesuada fames ac ante ipsum primis in faucibus.','sit amet lobortis leo hendrerit ut. Integer sed nibh pretium, ');
/*!40000 ALTER TABLE `backoffice_setup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_comments`
--

DROP TABLE IF EXISTS `blog_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_comments` (
  `blog_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_comments`
--

LOCK TABLES `blog_comments` WRITE;
/*!40000 ALTER TABLE `blog_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (8,3,'a blog title','this is the body content','2020-07-09 19:58:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_calendar_users`
--

DROP TABLE IF EXISTS `crm_calendar_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_calendar_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `invited_id` int(11) DEFAULT NULL,
  `events` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `calender_owner` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_calendar_users`
--

LOCK TABLES `crm_calendar_users` WRITE;
/*!40000 ALTER TABLE `crm_calendar_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_calendar_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_candidates`
--

DROP TABLE IF EXISTS `crm_candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_candidates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pipeline_id` int(11) DEFAULT NULL,
  `leader_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_candidates`
--

LOCK TABLES `crm_candidates` WRITE;
/*!40000 ALTER TABLE `crm_candidates` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_community_tasks`
--

DROP TABLE IF EXISTS `crm_community_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_community_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_community_tasks`
--

LOCK TABLES `crm_community_tasks` WRITE;
/*!40000 ALTER TABLE `crm_community_tasks` DISABLE KEYS */;
INSERT INTO `crm_community_tasks` VALUES (1,'someName','crm community tasks is some tasks'),(2,NULL,NULL),(3,NULL,NULL),(4,NULL,NULL),(5,NULL,NULL);
/*!40000 ALTER TABLE `crm_community_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_community_users_tasks`
--

DROP TABLE IF EXISTS `crm_community_users_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_community_users_tasks` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) DEFAULT NULL,
  `completed` char(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_community_users_tasks`
--

LOCK TABLES `crm_community_users_tasks` WRITE;
/*!40000 ALTER TABLE `crm_community_users_tasks` DISABLE KEYS */;
INSERT INTO `crm_community_users_tasks` VALUES (1,2,NULL,'7/07/2020'),(2,2,NULL,'7/07/2020'),(3,3,NULL,NULL),(4,2,NULL,'7/07/2020'),(5,2,NULL,'7/07/2020');
/*!40000 ALTER TABLE `crm_community_users_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_contacts`
--

DROP TABLE IF EXISTS `crm_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_contacts` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` char(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_street` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_city` char(18) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_state` char(18) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_zip` char(18) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_country` char(18) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `background_info` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_contacts`
--

LOCK TABLES `crm_contacts` WRITE;
/*!40000 ALTER TABLE `crm_contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_events`
--

DROP TABLE IF EXISTS `crm_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_events` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_time` date DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_events`
--

LOCK TABLES `crm_events` WRITE;
/*!40000 ALTER TABLE `crm_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_inbox`
--

DROP TABLE IF EXISTS `crm_inbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_inbox` (
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `subject` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sender_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_inbox`
--

LOCK TABLES `crm_inbox` WRITE;
/*!40000 ALTER TABLE `crm_inbox` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_inbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_org`
--

DROP TABLE IF EXISTS `crm_org`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_org` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_org`
--

LOCK TABLES `crm_org` WRITE;
/*!40000 ALTER TABLE `crm_org` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_org` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_pipelines`
--

DROP TABLE IF EXISTS `crm_pipelines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_pipelines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_pipelines`
--

LOCK TABLES `crm_pipelines` WRITE;
/*!40000 ALTER TABLE `crm_pipelines` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_pipelines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_posts`
--

DROP TABLE IF EXISTS `crm_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pipeline_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `post` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_time` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_posts`
--

LOCK TABLES `crm_posts` WRITE;
/*!40000 ALTER TABLE `crm_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_projects`
--

DROP TABLE IF EXISTS `crm_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `leader_id` int(11) DEFAULT NULL,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_projects`
--

LOCK TABLES `crm_projects` WRITE;
/*!40000 ALTER TABLE `crm_projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_storage`
--

DROP TABLE IF EXISTS `crm_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_storage` (
  `storage_id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`storage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_storage`
--

LOCK TABLES `crm_storage` WRITE;
/*!40000 ALTER TABLE `crm_storage` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_storage_files`
--

DROP TABLE IF EXISTS `crm_storage_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_storage_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `file` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_storage_files`
--

LOCK TABLES `crm_storage_files` WRITE;
/*!40000 ALTER TABLE `crm_storage_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_storage_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_storage_folders`
--

DROP TABLE IF EXISTS `crm_storage_folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_storage_folders` (
  `owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `storage_id` int(11) DEFAULT NULL,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_storage_folders`
--

LOCK TABLES `crm_storage_folders` WRITE;
/*!40000 ALTER TABLE `crm_storage_folders` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_storage_folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_storage_folders_users`
--

DROP TABLE IF EXISTS `crm_storage_folders_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_storage_folders_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_storage_folders_users`
--

LOCK TABLES `crm_storage_folders_users` WRITE;
/*!40000 ALTER TABLE `crm_storage_folders_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_storage_folders_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_storage_users_storage`
--

DROP TABLE IF EXISTS `crm_storage_users_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_storage_users_storage` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_storage_users_storage`
--

LOCK TABLES `crm_storage_users_storage` WRITE;
/*!40000 ALTER TABLE `crm_storage_users_storage` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_storage_users_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_tasks`
--

DROP TABLE IF EXISTS `crm_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_tasks` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `pipeline_id` int(11) DEFAULT NULL,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_time` date DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_tasks`
--

LOCK TABLES `crm_tasks` WRITE;
/*!40000 ALTER TABLE `crm_tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_uploads`
--

DROP TABLE IF EXISTS `crm_uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candidate_id` int(11) DEFAULT NULL,
  `file_name` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_uploads`
--

LOCK TABLES `crm_uploads` WRITE;
/*!40000 ALTER TABLE `crm_uploads` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_uploads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_users`
--

DROP TABLE IF EXISTS `crm_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `referrer_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_users`
--

LOCK TABLES `crm_users` WRITE;
/*!40000 ALTER TABLE `crm_users` DISABLE KEYS */;
INSERT INTO `crm_users` VALUES (3,'H1y1nO11w');
/*!40000 ALTER TABLE `crm_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_users_cadidates`
--

DROP TABLE IF EXISTS `crm_users_cadidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_users_cadidates` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `candidate_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_users_cadidates`
--

LOCK TABLES `crm_users_cadidates` WRITE;
/*!40000 ALTER TABLE `crm_users_cadidates` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_users_cadidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_users_org`
--

DROP TABLE IF EXISTS `crm_users_org`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_users_org` (
  `org_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`org_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_users_org`
--

LOCK TABLES `crm_users_org` WRITE;
/*!40000 ALTER TABLE `crm_users_org` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_users_org` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_users_projects`
--

DROP TABLE IF EXISTS `crm_users_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_users_projects` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_users_projects`
--

LOCK TABLES `crm_users_projects` WRITE;
/*!40000 ALTER TABLE `crm_users_projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_users_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_voicemail`
--

DROP TABLE IF EXISTS `crm_voicemail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_voicemail` (
  `owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voicemail_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_voicemail`
--

LOCK TABLES `crm_voicemail` WRITE;
/*!40000 ALTER TABLE `crm_voicemail` DISABLE KEYS */;
INSERT INTO `crm_voicemail` VALUES (1,'nyobi',6);
/*!40000 ALTER TABLE `crm_voicemail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_voicemail_files`
--

DROP TABLE IF EXISTS `crm_voicemail_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_voicemail_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) DEFAULT NULL,
  `file` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_voicemail_files`
--

LOCK TABLES `crm_voicemail_files` WRITE;
/*!40000 ALTER TABLE `crm_voicemail_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_voicemail_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_voicemail_folder_files`
--

DROP TABLE IF EXISTS `crm_voicemail_folder_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_voicemail_folder_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_voicemail_folder_files`
--

LOCK TABLES `crm_voicemail_folder_files` WRITE;
/*!40000 ALTER TABLE `crm_voicemail_folder_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_voicemail_folder_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_voicemail_folders`
--

DROP TABLE IF EXISTS `crm_voicemail_folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_voicemail_folders` (
  `owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voicemail_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_voicemail_folders`
--

LOCK TABLES `crm_voicemail_folders` WRITE;
/*!40000 ALTER TABLE `crm_voicemail_folders` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_voicemail_folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_voicemail_folders_users`
--

DROP TABLE IF EXISTS `crm_voicemail_folders_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_voicemail_folders_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_voicemail_folders_users`
--

LOCK TABLES `crm_voicemail_folders_users` WRITE;
/*!40000 ALTER TABLE `crm_voicemail_folders_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_voicemail_folders_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_voicemail_users`
--

DROP TABLE IF EXISTS `crm_voicemail_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_voicemail_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `source_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_voicemail_users`
--

LOCK TABLES `crm_voicemail_users` WRITE;
/*!40000 ALTER TABLE `crm_voicemail_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_voicemail_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crm_wall_users`
--

DROP TABLE IF EXISTS `crm_wall_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_wall_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `invited_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crm_wall_users`
--

LOCK TABLES `crm_wall_users` WRITE;
/*!40000 ALTER TABLE `crm_wall_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `crm_wall_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_contacts`
--

DROP TABLE IF EXISTS `ecrm_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `company_name` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_title` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_street` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_city` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_state` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_zip` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_country` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `background_info` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_contacts`
--

LOCK TABLES `ecrm_contacts` WRITE;
/*!40000 ALTER TABLE `ecrm_contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecrm_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_events`
--

DROP TABLE IF EXISTS `ecrm_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_events` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_events`
--

LOCK TABLES `ecrm_events` WRITE;
/*!40000 ALTER TABLE `ecrm_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecrm_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_folders`
--

DROP TABLE IF EXISTS `ecrm_folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_folders` (
  `title` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pipeline_id` int(11) NOT NULL,
  PRIMARY KEY (`pipeline_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_folders`
--

LOCK TABLES `ecrm_folders` WRITE;
/*!40000 ALTER TABLE `ecrm_folders` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecrm_folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_inbox`
--

DROP TABLE IF EXISTS `ecrm_inbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_inbox` (
  `sender_id` int(11) NOT NULL AUTO_INCREMENT,
  `receiver_id` int(11) DEFAULT NULL,
  `subject` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`sender_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_inbox`
--

LOCK TABLES `ecrm_inbox` WRITE;
/*!40000 ALTER TABLE `ecrm_inbox` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecrm_inbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_org`
--

DROP TABLE IF EXISTS `ecrm_org`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_org` (
  `contact_id` int(11) NOT NULL AUTO_INCREMENT,
  `leader_id` int(11) DEFAULT NULL,
  `position` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_org`
--

LOCK TABLES `ecrm_org` WRITE;
/*!40000 ALTER TABLE `ecrm_org` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecrm_org` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_pipelines`
--

DROP TABLE IF EXISTS `ecrm_pipelines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_pipelines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `title` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_pipelines`
--

LOCK TABLES `ecrm_pipelines` WRITE;
/*!40000 ALTER TABLE `ecrm_pipelines` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecrm_pipelines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_posts`
--

DROP TABLE IF EXISTS `ecrm_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_posts` (
  `pipeline_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `post` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_time` date DEFAULT NULL,
  PRIMARY KEY (`pipeline_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_posts`
--

LOCK TABLES `ecrm_posts` WRITE;
/*!40000 ALTER TABLE `ecrm_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecrm_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_projects`
--

DROP TABLE IF EXISTS `ecrm_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `leader_id` int(11) DEFAULT NULL,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_projects`
--

LOCK TABLES `ecrm_projects` WRITE;
/*!40000 ALTER TABLE `ecrm_projects` DISABLE KEYS */;
INSERT INTO `ecrm_projects` VALUES (1,3,'ths is ecrm titles'),(2,3,'some awesome project');
/*!40000 ALTER TABLE `ecrm_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_tasks`
--

DROP TABLE IF EXISTS `ecrm_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_tasks` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `pipeline_id` int(11) DEFAULT NULL,
  `title` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_time` date DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_tasks`
--

LOCK TABLES `ecrm_tasks` WRITE;
/*!40000 ALTER TABLE `ecrm_tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecrm_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_uploads`
--

DROP TABLE IF EXISTS `ecrm_uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_uploads` (
  `folder_id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`folder_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_uploads`
--

LOCK TABLES `ecrm_uploads` WRITE;
/*!40000 ALTER TABLE `ecrm_uploads` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecrm_uploads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_users`
--

DROP TABLE IF EXISTS `ecrm_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `referrer_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_users`
--

LOCK TABLES `ecrm_users` WRITE;
/*!40000 ALTER TABLE `ecrm_users` DISABLE KEYS */;
INSERT INTO `ecrm_users` VALUES (3,'H1y1nO11w');
/*!40000 ALTER TABLE `ecrm_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_users_folders`
--

DROP TABLE IF EXISTS `ecrm_users_folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_users_folders` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `folder_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_users_folders`
--

LOCK TABLES `ecrm_users_folders` WRITE;
/*!40000 ALTER TABLE `ecrm_users_folders` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecrm_users_folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_users_pipelines`
--

DROP TABLE IF EXISTS `ecrm_users_pipelines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_users_pipelines` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `pipeline_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_users_pipelines`
--

LOCK TABLES `ecrm_users_pipelines` WRITE;
/*!40000 ALTER TABLE `ecrm_users_pipelines` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecrm_users_pipelines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecrm_users_projects`
--

DROP TABLE IF EXISTS `ecrm_users_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecrm_users_projects` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecrm_users_projects`
--

LOCK TABLES `ecrm_users_projects` WRITE;
/*!40000 ALTER TABLE `ecrm_users_projects` DISABLE KEYS */;
INSERT INTO `ecrm_users_projects` VALUES (3,2);
/*!40000 ALTER TABLE `ecrm_users_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedbacks` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `app_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (2,2),(3,3);
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends_list`
--

DROP TABLE IF EXISTS `friends_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friends_list` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) DEFAULT NULL,
  `friend_id` int(11) DEFAULT NULL,
  `approved` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends_list`
--

LOCK TABLES `friends_list` WRITE;
/*!40000 ALTER TABLE `friends_list` DISABLE KEYS */;
INSERT INTO `friends_list` VALUES (1,NULL,4,1),(2,NULL,6,1),(3,NULL,5,1),(4,NULL,1,1),(5,NULL,3,1),(6,NULL,2,1),(7,NULL,2,1),(8,NULL,9,1),(9,NULL,8,1),(10,NULL,8,1),(11,NULL,8,1);
/*!40000 ALTER TABLE `friends_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inbox`
--

DROP TABLE IF EXISTS `inbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inbox` (
  `owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) DEFAULT NULL,
  `message` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `message_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inbox`
--

LOCK TABLES `inbox` WRITE;
/*!40000 ALTER TABLE `inbox` DISABLE KEYS */;
/*!40000 ALTER TABLE `inbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview_accesscodes`
--

DROP TABLE IF EXISTS `interview_accesscodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interview_accesscodes` (
  `code` int(11) NOT NULL AUTO_INCREMENT,
  `accesscode_title` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accesscode_summary` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview_accesscodes`
--

LOCK TABLES `interview_accesscodes` WRITE;
/*!40000 ALTER TABLE `interview_accesscodes` DISABLE KEYS */;
/*!40000 ALTER TABLE `interview_accesscodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview_pages`
--

DROP TABLE IF EXISTS `interview_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interview_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `summary` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instruction` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview_pages`
--

LOCK TABLES `interview_pages` WRITE;
/*!40000 ALTER TABLE `interview_pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `interview_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview_questions`
--

DROP TABLE IF EXISTS `interview_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interview_questions` (
  `page_id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview_questions`
--

LOCK TABLES `interview_questions` WRITE;
/*!40000 ALTER TABLE `interview_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `interview_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview_users`
--

DROP TABLE IF EXISTS `interview_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interview_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `referrer_code` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview_users`
--

LOCK TABLES `interview_users` WRITE;
/*!40000 ALTER TABLE `interview_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `interview_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ledger`
--

DROP TABLE IF EXISTS `ledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ledger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `to_user` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_user_amount` int(11) DEFAULT NULL,
  `from_user` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ledger`
--

LOCK TABLES `ledger` WRITE;
/*!40000 ALTER TABLE `ledger` DISABLE KEYS */;
INSERT INTO `ledger` VALUES (1,'pndx',1,'nyobi');
/*!40000 ALTER TABLE `ledger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linkstore_folders`
--

DROP TABLE IF EXISTS `linkstore_folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linkstore_folders` (
  `title` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `leader_id` int(11) NOT NULL,
  PRIMARY KEY (`leader_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linkstore_folders`
--

LOCK TABLES `linkstore_folders` WRITE;
/*!40000 ALTER TABLE `linkstore_folders` DISABLE KEYS */;
/*!40000 ALTER TABLE `linkstore_folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linkstore_link`
--

DROP TABLE IF EXISTS `linkstore_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linkstore_link` (
  `folder_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`folder_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linkstore_link`
--

LOCK TABLES `linkstore_link` WRITE;
/*!40000 ALTER TABLE `linkstore_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `linkstore_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linkstore_users`
--

DROP TABLE IF EXISTS `linkstore_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linkstore_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `referrer_code` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linkstore_users`
--

LOCK TABLES `linkstore_users` WRITE;
/*!40000 ALTER TABLE `linkstore_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `linkstore_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linkstore_users_folders`
--

DROP TABLE IF EXISTS `linkstore_users_folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linkstore_users_folders` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `folder_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linkstore_users_folders`
--

LOCK TABLES `linkstore_users_folders` WRITE;
/*!40000 ALTER TABLE `linkstore_users_folders` DISABLE KEYS */;
/*!40000 ALTER TABLE `linkstore_users_folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process_multiplechoices`
--

DROP TABLE IF EXISTS `process_multiplechoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `process_multiplechoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mc_question` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `a` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `b` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `c` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `d` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correct_answer` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process_multiplechoices`
--

LOCK TABLES `process_multiplechoices` WRITE;
/*!40000 ALTER TABLE `process_multiplechoices` DISABLE KEYS */;
INSERT INTO `process_multiplechoices` VALUES (1,'how many legs does spider have?','4','6','8','10','c',3);
/*!40000 ALTER TABLE `process_multiplechoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process_pages`
--

DROP TABLE IF EXISTS `process_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `process_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `summary` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instruction` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process_pages`
--

LOCK TABLES `process_pages` WRITE;
/*!40000 ALTER TABLE `process_pages` DISABLE KEYS */;
INSERT INTO `process_pages` VALUES (3,'introduction','TI','SOME GUY with it background','all about computer stuff','some awesome content');
/*!40000 ALTER TABLE `process_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process_prospects`
--

DROP TABLE IF EXISTS `process_prospects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `process_prospects` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `referrer_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latest_unlock_page_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process_prospects`
--

LOCK TABLES `process_prospects` WRITE;
/*!40000 ALTER TABLE `process_prospects` DISABLE KEYS */;
INSERT INTO `process_prospects` VALUES (1,'H1y1nO11w',1),(3,'H1y1nO11w',3);
/*!40000 ALTER TABLE `process_prospects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process_questions`
--

DROP TABLE IF EXISTS `process_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `process_questions` (
  `page_id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process_questions`
--

LOCK TABLES `process_questions` WRITE;
/*!40000 ALTER TABLE `process_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `process_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `profile_img` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_img_status` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'IMG_20190415_145658.jpg','1'),(2,'merryChristmasDude.jpeg','-1'),(3,'white_ace.jpg','-1'),(4,NULL,NULL),(5,NULL,NULL),(6,NULL,NULL),(7,NULL,NULL),(9,NULL,NULL),(10,NULL,NULL),(11,NULL,NULL);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_media_photos`
--

DROP TABLE IF EXISTS `profile_media_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_media_photos` (
  `owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `migrated` int(11) DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_media_photos`
--

LOCK TABLES `profile_media_photos` WRITE;
/*!40000 ALTER TABLE `profile_media_photos` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile_media_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_media_videos`
--

DROP TABLE IF EXISTS `profile_media_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_media_videos` (
  `owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `video` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `migrated` int(11) DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_media_videos`
--

LOCK TABLES `profile_media_videos` WRITE;
/*!40000 ALTER TABLE `profile_media_videos` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile_media_videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_personal_info`
--

DROP TABLE IF EXISTS `profile_personal_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_personal_info` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `birthday` date DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `eye_color` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hair_color` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `religion` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `smoke` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `drink` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_title` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nationality` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `children` int(11) DEFAULT NULL,
  `description` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `favorite` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hobby` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skill` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dream` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quote` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `family` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group` char(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `education` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `like` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `philosophy` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `question` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `career` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `real_me` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `my_life` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `goal` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `life_line` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pet` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_personal_info`
--

LOCK TABLES `profile_personal_info` WRITE;
/*!40000 ALTER TABLE `profile_personal_info` DISABLE KEYS */;
INSERT INTO `profile_personal_info` VALUES (3,NULL,NULL,'black',NULL,NULL,'heavily',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'guitar play','writing code for fun','Golang DEvOps',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `profile_personal_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prospect`
--

DROP TABLE IF EXISTS `prospect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prospect` (
  `referrer_code` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`referrer_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prospect`
--

LOCK TABLES `prospect` WRITE;
/*!40000 ALTER TABLE `prospect` DISABLE KEYS */;
/*!40000 ALTER TABLE `prospect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `referrer`
--

DROP TABLE IF EXISTS `referrer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `referrer` (
  `username` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referrer`
--

LOCK TABLES `referrer` WRITE;
/*!40000 ALTER TABLE `referrer` DISABLE KEYS */;
INSERT INTO `referrer` VALUES ('Portgaz D ace');
/*!40000 ALTER TABLE `referrer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage`
--

DROP TABLE IF EXISTS `storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage` (
  `owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `storage_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage`
--

LOCK TABLES `storage` WRITE;
/*!40000 ALTER TABLE `storage` DISABLE KEYS */;
/*!40000 ALTER TABLE `storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage_files`
--

DROP TABLE IF EXISTS `storage_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage_files` (
  `source_id` int(11) NOT NULL AUTO_INCREMENT,
  `file` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`source_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage_files`
--

LOCK TABLES `storage_files` WRITE;
/*!40000 ALTER TABLE `storage_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `storage_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage_folders`
--

DROP TABLE IF EXISTS `storage_folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage_folders` (
  `owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `storage_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage_folders`
--

LOCK TABLES `storage_folders` WRITE;
/*!40000 ALTER TABLE `storage_folders` DISABLE KEYS */;
/*!40000 ALTER TABLE `storage_folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage_folders_files`
--

DROP TABLE IF EXISTS `storage_folders_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage_folders_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` char(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage_folders_files`
--

LOCK TABLES `storage_folders_files` WRITE;
/*!40000 ALTER TABLE `storage_folders_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `storage_folders_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage_folders_users`
--

DROP TABLE IF EXISTS `storage_folders_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage_folders_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage_folders_users`
--

LOCK TABLES `storage_folders_users` WRITE;
/*!40000 ALTER TABLE `storage_folders_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `storage_folders_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage_users`
--

DROP TABLE IF EXISTS `storage_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `referrer_code` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage_users`
--

LOCK TABLES `storage_users` WRITE;
/*!40000 ALTER TABLE `storage_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `storage_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage_users_storage`
--

DROP TABLE IF EXISTS `storage_users_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage_users_storage` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage_users_storage`
--

LOCK TABLES `storage_users_storage` WRITE;
/*!40000 ALTER TABLE `storage_users_storage` DISABLE KEYS */;
/*!40000 ALTER TABLE `storage_users_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_superAdmin` tinyint(1) DEFAULT NULL,
  `first_name` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `is_teamadmin` tinyint(1) DEFAULT NULL,
  `referrer` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `user_code` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'trewelu','ta','theloiagj@ja.com','zoro','thelogok',NULL,1,NULL,16,NULL),(2,NULL,'pndx','ace','pndxDace@gmail.com','pndx','$2a$10$JWdQ9N7SD96wjKRWSWW.res4xKDK/q5YCyXpmE26GDURCWH94s5cm',1,1,'zoro',3,'ryL_iOJyw'),(3,1,'nyobi','ntt','nyobi@gmail.com','nyobi','$2a$10$ugdNT9WGumX8LtnYV0wVR.ZyXS7V52APnCpoYrQyzQu0pyOFEAyLK',NULL,NULL,'pndx',0,'H1y1nO11w'),(4,NULL,'edgar','fer','feredagar@gmail.com','edgar','$2a$10$HBfGXwLgMvSVGy/BatAPFOG/JuHRFWCCc625J5.77fyoqby7yxu5W',NULL,NULL,'pndx',NULL,'SyBHpdkJP'),(5,NULL,'asut','lonlon','citra.anggyx@gmail.com','cita','$2a$10$GiCSBQBDf3qTUo8jYag07OtB.ARHyb2zOrl0fn5qQul/ztd23rZpG',NULL,NULL,'nyobi',NULL,'ryps03JkD');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_apps`
--

DROP TABLE IF EXISTS `users_apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_apps` (
  `app_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`app_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_apps`
--

LOCK TABLES `users_apps` WRITE;
/*!40000 ALTER TABLE `users_apps` DISABLE KEYS */;
INSERT INTO `users_apps` VALUES (3,3);
/*!40000 ALTER TABLE `users_apps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wall`
--

DROP TABLE IF EXISTS `wall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wall` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `post_user_id` int(11) DEFAULT NULL,
  `post_media` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` date DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wall`
--

LOCK TABLES `wall` WRITE;
/*!40000 ALTER TABLE `wall` DISABLE KEYS */;
/*!40000 ALTER TABLE `wall` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-10  2:58:36
