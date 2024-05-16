create table stock (
	id serial primary key,
	symbol varchar(10) not null unique
);


create table stock_data (
	stock_id int4 not null,
	ts timestamptz not null,
	value decimal(10, 4) not null,
	volume bigint not null
--	constraint fk_stock foreign key(stock_id) references stock(id)
);

-- default interval is set to 7 days and can be override passing specific interval as a second arg
select create_hypertable('stock_data', by_range('ts'));

