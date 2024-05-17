1) Run container

<!-- https://docs.machbase.com/neo/import-export/ -->
2) Import CSV data (from neo shell)
`
curl -o - https://docs.machbase.com/assets/example/example.csv.gz | \
machbase-neo shell import   \
    --input -               \
    --timeformat s          \
    stock_data
`