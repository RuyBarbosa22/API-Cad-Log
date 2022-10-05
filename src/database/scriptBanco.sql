create database APILOGCAD;
use APILOGCAD;

drop table Usuario;

create table Usuario (
id int primary key auto_increment,
nome varchar (30) not null,
email varchar (30) not null unique,
tel varchar (11) not null unique,
senha varchar (20) not null
)auto_increment=1;

select * from Usuario;