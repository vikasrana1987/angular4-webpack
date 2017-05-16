-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2017 at 07:40 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jobhunt`
--

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE IF NOT EXISTS `experiences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(300) NOT NULL,
  `designation` varchar(300) NOT NULL,
  `joining_date` timestamp NOT NULL,
  `relieving_date` timestamp NOT NULL,
  `address` int(11) NOT NULL,
  `joining_letter` enum('Y','N') NOT NULL DEFAULT 'N',
  `experience_letter` enum('Y','N') NOT NULL DEFAULT 'N',
  `sellary_slip` enum('Y','N') NOT NULL DEFAULT 'N',
  `date_added` timestamp NOT NULL,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE IF NOT EXISTS `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `operation` varchar(300) NOT NULL,
  `desctiption` text NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_message_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `message_from` enum('U','C') NOT NULL DEFAULT 'C',
  `message` text NOT NULL,
  `is_read` enum('Y','N') NOT NULL DEFAULT 'N',
  `date_read` timestamp NOT NULL,
  `date_sent` timestamp NOT NULL,
  `date_delete` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `my_skills`
--

CREATE TABLE IF NOT EXISTS `my_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_id` int(11) NOT NULL,
  `experience` int(11) NOT NULL,
  `self_rating` int(11) NOT NULL COMMENT 'Rating out of 10',
  `test_rating` int(11) NOT NULL COMMENT 'Rating out of 10',
  `knowledge_type` enum('E','K') NOT NULL DEFAULT 'E',
  `date_added` timestamp NOT NULL,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(300) NOT NULL,
  `company_name_permission` enum('Y','N') NOT NULL DEFAULT 'N',
  `skills_used` text NOT NULL,
  `skills_i_worked` text NOT NULL,
  `project_name` varchar(300) NOT NULL,
  `project_url` text NOT NULL,
  `project_url_permission` int(11) NOT NULL,
  `team_size` int(11) NOT NULL,
  `duration` int(11) NOT NULL COMMENT 'Project Duration',
  `worked_as` varchar(300) NOT NULL COMMENT 'Worded as developer like',
  `description` text NOT NULL COMMENT 'Project description',
  `date_added` timestamp NOT NULL,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `projects_assets`
--

CREATE TABLE IF NOT EXISTS `projects_assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `name` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `qualifications`
--

CREATE TABLE IF NOT EXISTS `qualifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course` varchar(300) NOT NULL,
  `university` varchar(300) NOT NULL,
  `durations` int(11) NOT NULL,
  `year_of_joining` varchar(100) NOT NULL,
  `year_of_passing` varchar(100) NOT NULL,
  `grade` varchar(100) NOT NULL,
  `relieving_date` timestamp NOT NULL,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(250) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`, `date_added`, `date_modified`) VALUES
(1, 'Administrator', '2016-08-09 17:13:30', '2016-08-09 17:13:30'),
(2, 'Company', '2016-08-09 17:13:30', '2016-08-09 17:13:30'),
(3, 'User', '2016-08-09 17:14:15', '2016-08-09 17:14:15');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE IF NOT EXISTS `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` int(11) NOT NULL,
  `date_added` timestamp NOT NULL,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `name` varchar(300) NOT NULL,
  `name_permission` int(11) DEFAULT '0' COMMENT '1: Public, 0: Private',
  `compay_name` text,
  `user_name` varchar(300) DEFAULT NULL,
  `email` varchar(300) NOT NULL,
  `email_permission` int(11) DEFAULT NULL,
  `password` varchar(300) NOT NULL,
  `country` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `address` text,
  `zip_code` varchar(300) DEFAULT NULL,
  `phone_number` varchar(300) DEFAULT NULL,
  `phone_number_permission` int(11) DEFAULT NULL,
  `skype` varchar(300) DEFAULT NULL,
  `skype_permission` int(11) DEFAULT NULL,
  `country_temprary` int(11) DEFAULT NULL,
  `state_temprary` int(11) DEFAULT NULL,
  `city_temprary` int(11) DEFAULT NULL,
  `address_temprary` text,
  `willing_to_change` int(11) DEFAULT NULL,
  `notice_period` int(11) DEFAULT NULL,
  `in_notice_period` int(11) DEFAULT NULL,
  `image` text,
  `passport` int(11) DEFAULT NULL,
  `experience` int(11) DEFAULT NULL COMMENT 'Numbers of years',
  `no_of_employees` text,
  `facebook_url` text,
  `twitter_url` text,
  `company_established` int(11) DEFAULT NULL,
  `date_added` timestamp NOT NULL,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `name_permission`, `compay_name`, `user_name`, `email`, `email_permission`, `password`, `country`, `state`, `city`, `address`, `zip_code`, `phone_number`, `phone_number_permission`, `skype`, `skype_permission`, `country_temprary`, `state_temprary`, `city_temprary`, `address_temprary`, `willing_to_change`, `notice_period`, `in_notice_period`, `image`, `passport`, `experience`, `no_of_employees`, `facebook_url`, `twitter_url`, `company_established`, `date_added`, `date_modified`) VALUES
(1, 1, 'vipin', 0, '', '', 'vipin@y.com', 0, '123456', 0, 0, 0, '', '', '', 0, '', 0, 0, 0, 0, '', 0, 0, 0, '', 0, 0, '', '', '', 0, '2016-08-11 19:21:03', '2016-08-11 19:21:03'),
(2, 1, 'Admin', 0, NULL, NULL, 'admin@jobhunt.com', NULL, '$2a$10$IuFSOyO6GSW9qUWexBeqcekz1EZ8WiT.IVmt3z9micp/57PnOEhKm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-08-16 17:46:04', '2016-08-13 14:37:49'),
(3, 3, 'b', 0, NULL, NULL, 'b@y.com', NULL, '$2a$10$wAgmvS2sS4FYGcv7c8qe4OAR9ZHx7781BkS069RHCqmVu7YQHfJHq', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2016-08-13 14:52:34'),
(4, 3, 'c', 0, NULL, NULL, 'c@y.com', NULL, '$2a$10$WAeKkBhTuLP6JprQuqPSyeTjbfPL/FbNkHoNwV8TTjao5XF0HeoV6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2016-08-13 14:54:52'),
(5, 3, 'a1', 0, NULL, NULL, 'a1@y.com', NULL, '$2a$10$fmBT1yPGU7fycp3jgnoY5OvJOuzpzfe1Z3jBH1uxUQqk8QSQCyAce', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2016-08-13 14:57:15'),
(6, 3, 'c', 0, NULL, NULL, 'c1@y.com', NULL, '$2a$10$Qr/DIcAT9m5m2T5ZYphdYelfXNFtzi13af8Rafyd9axF/SjDNwldi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', '2016-08-13 15:12:10');

-- --------------------------------------------------------

--
-- Table structure for table `vacancies`
--

CREATE TABLE IF NOT EXISTS `vacancies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `technology_id` int(11) NOT NULL,
  `sheats` int(11) NOT NULL,
  `experience` int(11) NOT NULL,
  `designation` varchar(300) NOT NULL,
  `expected_notice_period` int(11) NOT NULL,
  `position` enum('P','T','C') NOT NULL DEFAULT 'P' COMMENT 'Permanent, Temperary, Contract basies',
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
