CREATE TABLE 'stock_data' (
  stock_id INT, 
  ts TIMESTAMP, 
  value FLOAT, 
  volume INT
) timestamp (ts) PARTITION BY DAY WAL;

-- curl \
--   -F schema='[ \
--     {"name":"stock_id", "type": "INT"}, \
--     {"name":"ts", "type": "TIMESTAMP", "pattern": "YYYY-MM-DD HH:mm:ssZ"}, \
--     {"name":"value", "type": "FLOAT"}, \
--     {"name":"volume", "type": "INT"} \
--   ]' \
--   -F data=@/mnt/c/studyProjects/BAKA/bachelor_work/app/data/TIMESCALE_stocks_data.csv 'http://172.17.173.99:5434/imp'


