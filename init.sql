CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES user(id),
    title VARCHAR(255),
    content TEXT
) 


