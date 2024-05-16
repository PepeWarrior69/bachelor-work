-- https://clickhouse.com/blog/working-with-time-series-data-and-functions-ClickHouse

create table stock_db.stock_data (
	`stock_id` Int32,
	`ts` DateTime64(3),
	`value` Float32,
	`volume` Int32
)
engine = MergeTree
order by (stock_id, ts);

