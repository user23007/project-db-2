mysql -u root -p

create database universidad;

use universidad;

create table usuarios(
    id integer not null auto_increment,
    nombre varchar(255),
    email varchar(200),
    genero varchar(150),
    primary key(id)
);

create user "dbuser"@"%" identified with mysql_native_password BY "Eafit2023.";

grant all privileges on universidad.* to "dbuser"@"%";
flush privileges;

insert into usuarios (nombre,email,genero) values("sebas","sebastiancano21@hotmail.es","fluide");

insert into usuarios (nombre,email,genero) values("ano","anoGrande21sea@gmail.com","hetere);
