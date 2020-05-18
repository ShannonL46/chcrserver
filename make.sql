DROP DATABASE IF EXISTS chcr;
DROP USER IF EXISTS chcr_user@localhost;

CREATE DATABASE chcr CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER chcr_user@localhost IDENTIFIED BY '@CARAMELmocha';
GRANT ALL PRIVILEGES ON chcr.* TO chcr_user@localhost;
