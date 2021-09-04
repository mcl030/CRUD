DROP TABLE IF EXISTS todo cascade;
CREATE TABLE todo (
  _id SERIAL PRIMARY KEY ,
  name varchar NOT NULL
);
 
DROP TABLE IF EXISTS task;
CREATE TABLE task ( 
  _id SERIAL PRIMARY KEY ,
  name varchar NOT NULL ,
  status boolean NOT NULL ,
  parent bigint NOT NULL
);

ALTER TABLE task ADD CONSTRAINT "parent_fk" FOREIGN KEY ("parent") REFERENCES todo("_id");
