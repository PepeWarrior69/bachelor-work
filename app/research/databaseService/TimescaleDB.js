const { Client } = require('pg')
const DatabaseService = require('.')

require('dotenv').config()



class TimescaleDB extends DatabaseService {
    constructor() {
        super()

        this.__client = new Client({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.TIMESCALE_PORT,
            database: process.env.DB_NAME
        })
    }

    /**
     * @param {string} query 
    */
    async execute(query) {
        try {
            await this.__client.connect()

            console.time('query_execution_time')
            const res = await this.__client.query(query)
            console.timeEnd('query_execution_time')

            return res
        } catch (err) {
            console.log('Error during query execution for Timescale: err = ', err)
        } finally {
            await this.__client.end()
        }
    }

    /**
     * @param {Array<object>} data 
     */
    async insert(data) {
        const values = data.map(el => {
            return `(${el.stock_id}, to_timestamp(${el.ts}), ${el.value}, ${el.volume})`
        }).join(',')

        const query = `insert into stock_data (stock_id, ts, value, volume) values ${values}`

        await this.execute(query)
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
            order by stock_id asc
        `

        const res = await this.execute(query)

        console.log('Timescale response = ', res.rows)
    }
}

module.exports = TimescaleDB
