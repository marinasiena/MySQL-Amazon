drop database if exists bamazon;
create database bamazon;

use bamazon;
create table products (
	item_id int auto_increment not null,
    product_name varchar(100) not null,
    department_name varchar(100) not null,
    price decimal(10,2) not null,
    stock_quantity int not null,
    primary key (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("Banana", "Food", 200.00, 30);

insert into products(product_name, department_name, price, stock_quantity)
values ("Fish", "Food", 5.00, 2);

insert into products(product_name, department_name, price, stock_quantity)
values ("Leather Couch", "Home", 300.0, 10);

insert into products(product_name, department_name, price, stock_quantity)
values ("Literal Gerbil", "Pets", 666.69, 30);

insert into products(product_name, department_name, price, stock_quantity)
values ("Actual Gerbil Wheel", "Pets", 39.99, 10);

insert into products(product_name, department_name, price, stock_quantity)
values ("WeeGee Board", "Spiritual", 7.99, 80);

insert into products(product_name, department_name, price, stock_quantity)
values ("Animal Crossing Themed Suit", "Clothing", 70, 40);

insert into products(product_name, department_name, price, stock_quantity)
values ("Children's Xanax", "Entertainment", 60, 5);

insert into products(product_name, department_name, price, stock_quantity)
values ("Banana Peel", "Health & Beauty", 1000, 1);

insert into products(product_name, department_name, price, stock_quantity)
values ("Literal Scooby Doo", "Pets", 3000, 1);

insert into products(product_name, department_name, price, stock_quantity)
values ("All of the Crystals.", "Spiritual", 3500, 1);

select * from products;