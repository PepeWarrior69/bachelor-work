create table stock_data (
	stock_id int4 not null,
	ts timestamptz not null,
	value decimal(10, 4) not null,
	volume bigint not null
--	constraint fk_stock foreign key(stock_id) references stock(id)
);


select create_hypertable('stock_data', by_range('ts'));


CREATE INDEX ON stock_data(stock_id, ts)
    WITH (timescaledb.transaction_per_chunk);

ALTER TABLE stock_data SET (timescaledb.compress,
   timescaledb.compress_orderby = 'ts desc',
   timescaledb.compress_segmentby = 'stock_id',
   timescaledb.compress_chunk_time_interval='1 day'
);


SELECT add_compression_policy('stock_data', compress_after => INTERVAL '1 week');

