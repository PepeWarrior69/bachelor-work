const { createClient } = require('@clickhouse/client')
const DatabaseService = require('.')

require('dotenv').config()



class ClickHouse extends DatabaseService {
    constructor() {
        super()

        // https://clickhouse.com/docs/en/integrations/language-clients/javascript
        this.__client = createClient({
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            url: `http://${process.env.DB_HOST}:${process.env.CLICKHOUSE_PORT}`,
            database: 'stock_db'
        })
    }

    /**
     * @param {string} query 
    */
    async execute(query) {

    }

    /**
     * @param {Array<object>} data 
     */
    async insert(data) {
        console.time('query_execution_time')
        const res = await this.__client.insert({
            table: 'stock_data',
            values: data.map(el => ({ stock_id: el.stock_id, ts: el.ts, value: el.value, volume: el.volume })),
            format: 'JSONEachRow'
        })
        console.timeEnd('query_execution_time')

        console.log("Inser response from ClickHouse: ", res)
    }


    async selectionWithAggregation() {
        const query = `
            select 
                stock_id,
                min(value) as min_val,
                max(value) as max_val,
                avg(value) as avg_val,
                sum(volume) as total_volume
            from stock_data
            group by stock_id
        `

        console.time('query_execution_time')
        const resultSet = await this.__client.query({
            query,
            format: 'JSONEachRow'
        })
        console.timeEnd('query_execution_time')

        const result = await resultSet.json()

        console.log("ClickHouse dataset result = ", result);
    }
}

module.exports = ClickHouse
