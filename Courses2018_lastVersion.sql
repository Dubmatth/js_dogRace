-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 26 Novembre 2018 à 19:56
-- Version du serveur :  10.1.19-MariaDB
-- Version de PHP :  5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `courses2018`
--
DROP DATABASE IF EXISTS `courses2018`;
CREATE DATABASE IF NOT EXISTS `courses2018` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `courses2018`;

-- --------------------------------------------------------

--
-- Structure de la table `animal`
--

CREATE TABLE `animal` (
  `idA` bigint(20) UNSIGNED NOT NULL,
  `nomA` varchar(30) NOT NULL,
  `descA` varchar(100) DEFAULT NULL,
  `espA` char(10) DEFAULT NULL,
  `nationA` char(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `animal`
--

INSERT INTO `animal` (`idA`, `nomA`, `descA`, `espA`, `nationA`) VALUES
(1, 'Bill', 'ami de Boule', 'CHIEN', 'BE'),
(2, 'Milou', 'fidèle compagnon de Tintin', 'CHIEN', 'BE'),
(3, 'Idefix', 'le gaulois', 'CHIEN', 'FR'),
(4, 'Garfield', NULL, 'CHAT', NULL),
(5, 'José', 'la tornade', 'CHAT', 'BE'),
(6, 'Irma', 'une tornade courte sur patte', 'CHAT', 'BE'),
(7, 'Pif', NULL, 'CHIEN', 'FR'),
(8, 'Snoopy', NULL, 'CHIEN', 'US'),
(9, 'Aglaé', 'l''araignée', 'ARACHN', NULL),
(10, 'Rantanplan', 'plus bête que son ombre', 'CHIEN', 'BE'),
(11, 'Pluto', 'chien d''une souris', 'CHIEN', 'US'),
(12, 'Lassie', NULL, 'CHIEN', NULL),
(13, 'Crockdur', NULL, 'CHIEN', 'UK'),
(14, 'Kaa', 'python sorti d''un livre', 'SERPENT', 'UK'),
(15, 'Ungoliant', 'araignée de la Terre du Milieu', 'ARACHN', 'UK'),
(16, 'Gai-Luron', NULL, 'CHIEN', 'FR'),
(17, 'Mortimer', 'serpent à sornettes', 'SERPENT', 'FR'),
(18, 'Asti', 'ver de terrre refusant de servir d''appât pour la pêche', 'VER', 'FR'),
(19, 'Slim', NULL, 'LIMACE', NULL),
(20, 'Nestor', 'petit noir', 'SCORPION', 'IT');

-- --------------------------------------------------------

--
-- Structure de la table `course`
--

CREATE TABLE `course` (
  `idC` int(5) UNSIGNED ZEROFILL NOT NULL,
  `nomC` varchar(30) NOT NULL,
  `descC` varchar(100) DEFAULT NULL,
  `dateC` date DEFAULT NULL,
  `lieuC` char(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `course`
--

INSERT INTO `course` (`idC`, `nomC`, `descC`, `dateC`, `lieuC`) VALUES
(00001, 'Du C204 au C313', 'ascenceur obligatoire', '2018-01-10', 'BE'),
(00002, 'Paris en motocrotte', 'course réservée aux chiens', '2018-05-25', 'FR'),
(00003, 'Trophée du Père Noël', 'pour les chiens courageux', '2017-12-25', 'BE');

-- --------------------------------------------------------

--
-- Structure de la table `espece`
--

CREATE TABLE `espece` (
  `codeE` char(10) NOT NULL,
  `nomE` varchar(30) NOT NULL,
  `nbPattesE` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `espece`
--

INSERT INTO `espece` (`codeE`, `nomE`, `nbPattesE`) VALUES
('ARACHN', 'Araignée', 8),
('CHAT', 'Chat', 4),
('CHIEN', 'Chien', 4),
('INSECTRAMP', 'Insecte rampant', 6),
('INSECTVOL', 'Insecte volant', 6),
('LIMACE', 'Limace', 0),
('PIEUVRE', 'Pieuvre', 8),
('SCORPION', 'Scorpion', 8),
('SERPENT', 'Serpent', 0),
('VER', 'Ver', 0);

-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

CREATE TABLE `pays` (
  `codeP` char(2) NOT NULL,
  `nomP` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `pays`
--

INSERT INTO `pays` (`codeP`, `nomP`) VALUES
('BE', 'Belgique'),
('US', 'Etats-Unis'),
('FR', 'France'),
('IT', 'Italie'),
('UK', 'Royaume-Uni');

-- --------------------------------------------------------

--
-- Structure de la table `resultat`
--

CREATE TABLE `resultat` (
  `idC` int(5) UNSIGNED ZEROFILL NOT NULL,
  `idA` bigint(20) UNSIGNED NOT NULL,
  `temps` time DEFAULT NULL,
  `statut` enum('I','C','T','A') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `resultat`
--

INSERT INTO `resultat` (`idC`, `idA`, `temps`, `statut`) VALUES
(00002, 1, '00:05:35', 'T'),
(00001, 3, '00:01:37', 'T'),
(00002, 3, '01:00:00', 'A'),
(00002, 4, '00:04:12', 'T'),
(00001, 5, '00:01:04', 'T'),
(00002, 5, '00:03:59', 'T'),
(00001, 7, '00:02:03', 'T'),
(00002, 7, '01:00:00', 'A'),
(00001, 8, '00:02:31', 'T'),
(00002, 8, '00:04:26', 'T'),
(00001, 10, '00:01:25', 'T'),
(00002, 10, '00:04:10', 'T');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`idA`),
  ADD UNIQUE KEY `NomA_UNIQUE` (`nomA`),
  ADD KEY `fk_EspA_idx` (`espA`),
  ADD KEY `fk_nationA_idx` (`nationA`);

--
-- Index pour la table `course`
--
ALTER TABLE `course`
  MODIFY idC int(5) UNSIGNED ZEROFILL NOT NULL auto_increment PRIMARY KEY,
  ADD KEY `fk_lieuC_idx` (`lieuC`);

--
-- Index pour la table `espece`
--
ALTER TABLE `espece`
  ADD PRIMARY KEY (`codeE`);

--
-- Index pour la table `pays`
--
ALTER TABLE `pays`
  ADD PRIMARY KEY (`codeP`),
  ADD UNIQUE KEY `nomP` (`nomP`);

--
-- Index pour la table `resultat`
--
ALTER TABLE `resultat`
  ADD PRIMARY KEY (`idA`,`idC`),
  ADD KEY `idC` (`idC`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `animal`
--
ALTER TABLE `animal`
  MODIFY `idA` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `animal`
--
ALTER TABLE `animal`
  ADD CONSTRAINT `fk_espA` FOREIGN KEY (`espA`) REFERENCES `espece` (`codeE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_nationA` FOREIGN KEY (`nationA`) REFERENCES `pays` (`codeP`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `fk_lieuC` FOREIGN KEY (`lieuC`) REFERENCES `pays` (`codeP`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `resultat`
--
ALTER TABLE `resultat`
  ADD CONSTRAINT `fk_animal` FOREIGN KEY (`idA`) REFERENCES `animal` (`idA`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_course` FOREIGN KEY (`idC`) REFERENCES `course` (`idC`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
