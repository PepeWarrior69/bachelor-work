1) Run container

2) add config to influx CLI
    - `influx config create --config-name db_config_prod --host-url http://172.17.173.99:5433 --org my-stock-org --token {token} --active`

3) Run sender script for influx to fill DB with data `InfluxDataSender.js`

