1) Run container

<!-- https://docs.machbase.com/neo/import-export/ -->
2) Import CSV data (from data folder)
`
curl -X POST "http://172.17.173.99:5435/db/write/stock_data?timeformat=s&heading=true" \
    -H "Content-Type: text/csv" \
    --data-binary "@MACHBASE_stocks_data.csv"
`


- Send file 
`
curl -T "MACHBASE_stocks_data.csv" -X POST "http://167.99.140.157:5654/db/write/stock_data?timeformat=s&heading=true" -H "Content-Type: text/csv"
`