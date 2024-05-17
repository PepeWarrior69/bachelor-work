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
            // Base data
            baseData = from(bucket: "stock_db")
            |> range(start: -7y)
            |> filter(fn: (r) => r._measurement == "stock_data")
            
            // Calculate min value
            minVal = baseData
            |> filter(fn: (r) => r._field == "value")
            |> group(columns: ["stock_id"])
            |> min()
            |> rename(columns: {_value: "min_val"})
            
            // Calculate max value
            maxVal = baseData
            |> filter(fn: (r) => r._field == "value")
            |> group(columns: ["stock_id"])
            |> max()
            |> rename(columns: {_value: "max_val"})
            
            // Calculate avg value
            avgVal = baseData
            |> filter(fn: (r) => r._field == "value")
            |> group(columns: ["stock_id"])
            |> mean()
            |> rename(columns: {_value: "avg_val"})
            
            // Calculate total volume
            totalVolume = baseData
            |> filter(fn: (r) => r._field == "volume")
            |> group(columns: ["stock_id"])
            |> sum()
            |> rename(columns: {_value: "total_volume"})
            
            // Join min and max values
            minMaxJoin = join(tables: {minVal: minVal, maxVal: maxVal}, on: ["stock_id"])
            
            // Join with avg values
            minMaxAvgJoin = join(tables: {minMaxJoin: minMaxJoin, avgVal: avgVal}, on: ["stock_id"])
            
            // Join with total volume
            finalResult = join(tables: {minMaxAvgJoin: minMaxAvgJoin, totalVolume: totalVolume}, on: ["stock_id"])
            
            // Keep necessary columns
            finalResult
            |> keep(columns: ["stock_id", "min_val", "max_val", "avg_val", "total_volume"])
            |> sort(columns: ["stock_id"])
        `

        console.time('query_execution_time')
        this.__queryClient.queryRows(query, {
            next: (row, tableMeta) => {
                console.timeEnd('query_execution_time')
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
