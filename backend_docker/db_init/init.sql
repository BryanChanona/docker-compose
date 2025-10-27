CREATE DATABASE IF NOT EXISTS briyan_chanona_db;
USE briyan_chanona_db;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(256),
    description VARCHAR(256)
);

INSERT INTO books (title,description) VALUES ("Nuevo libro", "Libro de hadas");