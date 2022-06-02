use testeaula;
CREATE TABLE meteoritos(
name varchar(255),
id int,
nametype varchar(20),
recclass varchar(5),
mass int,
fall varchar(20),
year timestamp,
reclat float,
reclong float
);

SELECT * FROM meteoritos;

DELETE FROM meteoritos WHERE true;

