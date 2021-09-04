-- https://www.postgresql.org/docs/current/sql-createtable.html
-- https://www.postgresql.org/docs/9.1/datatype-numeric.html
-- https://www.postgresqltutorial.com/postgresql-serial/
-- https://www.postgresql.org/docs/12/sql-altertable.html

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

--uploading a table 
--psql -d 'postgres://bqqdneki:b9Gdl_cTf8dPgftZNsQJ3nw2SCJKqAX7@kashin.db.elephantsql.com/bqqdneki' -f todo.sql
-- ALTER TABLE distributors ADD CONSTRAINT distfk FOREIGN KEY (address) REFERENCES addresses (address);
--https://stackoverflow.com/questions/6842393/import-sql-dump-into-postgresql-database
--  -h hostname -U username
-- 'postgres://bqqdneki:b9Gdl_cTf8dPgftZNsQJ3nw2SCJKqAX7@kashin.db.elephantsql.com/bqqdneki'
-- psql -d databasename -f file.sql

