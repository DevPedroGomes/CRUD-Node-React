\c crud

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(25) NOT NULL,
  user_email VARCHAR(40) NOT NULL UNIQUE,
  user_password VARCHAR(100) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE todos (
  todo_id UUID,
  description VARCHAR(200) NOT NULL,
  user_id UUID,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
