CREATE TABLE IF NOT EXISTS `emails` (
  `idemails`      INT(11)         NOT NULL AUTO_INCREMENT,
  `emailaddress`  VARCHAR(45)     DEFAULT NULL,
  `referrals`     INT(11)         DEFAULT '0',
  `datetime`      DATETIME        DEFAULT CURRENT_TIMESTAMP,
  `referralcode`  VARCHAR(45)     DEFAULT NULL,
  `verified`      VARCHAR(45)     DEFAULT 'false',
  `referredby`    VARCHAR(45)     DEFAULT NULL,
  PRIMARY KEY (`idemails`),
  UNIQUE KEY `emailaddress_UNIQUE` (`emailaddress`)
) ENGINE =INNODB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8;
