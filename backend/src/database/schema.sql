-- Database creation query
CREATE DATABASE rshrtly_db;
USE rshrtly;
CREATE TABLE urls (
    id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    long_url VARCHAR(2048) NOT NULL,
    url_hash VARCHAR(8) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    times_clicked INTEGER DEFAULT 0
);

-- Delete all elements and restore id count
DELETE FROM urls;
ALTER TABLE urls AUTO_INCREMENT = 1;