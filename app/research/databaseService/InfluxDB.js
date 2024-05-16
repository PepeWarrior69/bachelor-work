// const Influx = require('influx')

const { InfluxDB: Influx , Point } = require('@influxdata/influxdb-client')

const DatabaseService = require('.')

require('dotenv').config()



class InfluxDB extends DatabaseService {
    constructor() {
        super()

        this.__client = new Influx({
            url: `http://${process.env.DB_HOST}:${process.env.INFLUX_PORT}`,
            token: process.env.INFLUX_TOKEN,
        })

        let org = `my-stock-org`
        let bucket = `stock_db`

        this.__writeClient = this.__client.getWriteApi(org, bucket, 's')
        this.__queryClient = this.__client.getQueryApi(org)
    }

    /**
     * @param {string} query 
    */
    async execute(query=null) {
        try {
            await this.__client.connect()

            console.time('query_execution_time')
            const res = await this.__client.flush()
            console.timeEnd('query_execution_time')

            return res
        } catch (err) {
            console.log('Error during query execution for QuestDB: err = ', err)
        } finally {
            await this.__client.close()
        }
    }

    /**
     * @param {Array<object>} data 
     */
    async insert(data) {
        const payload = data.map(el => {
            return new Point('stock_data')
                .tag('stock_id', el.stock_id)
                .floatField('value', el.value)
                .intField('volume', el.volume)
                .timestamp(el.ts)
        })

        this.__writeClient.writePoints(payload)

        console.time('query_execution_time')
        const res = await this.__writeClient.flush()
        console.timeEnd('query_execution_time')

        console.log('InfluxDB response = ', res);
    }
    

    async selectionWithAggregation() {
        const query = `
            from(bucket: "stock_db")
            |> range(start: -10m)
            |> filter(fn: (r) => e._measurement == "stock_data")
            |> mean()
        `

        this.__queryClient.queryRows(query, {
            next: (row, tableMeta) => {
                const tableObject = tableMeta.toObject(row)
                console.log('row = ', row)
                console.log('tableObject = ', tableObject)
            },
            error: (err) => {
                console.error('\nError', err)
            },
            complete: () => {
                console.log('Success')
            }
        })
    }
}

module.exports = InfluxDB
