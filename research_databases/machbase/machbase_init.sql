-- https://docs.machbase.com/neo/import-export/

CREATE TAG TABLE IF NOT EXISTS stock_data (
  stock_id varchar(50) primary key,
  ts datetime basetime,
  value float,
  volume float
);

