const { Sender } = require("@questdb/nodejs-client")
const DatabaseService = require('.')

require('dotenv').config()



class QuestDB extends DatabaseService {
    constructor() {
        super()

        this.__client = Sender.fromConfig(`http::addr=${process.env.DB_HOST}:${process.env.QUEST_PORT}`)
    }

    /**
     * @param {string} query 
    */
    async execute(query=null) {
        try {
            // await this.__client.connect()

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
        for (let i = 0; i < data.length; i++) {
            const el = data[i]
         
            await this.__client
                .table('stock_data')
                .intColumn('stock_id', el.stock_id)
                .floatColumn('value', el.value)
                .intColumn('volume', el.volume)
                .at(el.ts * 1000, 'ms') // sec => ms
        }

        await this.execute()
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

        const url = `http://${process.env.DB_HOST}:${process.env.QUEST_PORT}/exec?query=${encodeURIComponent(query)}`

        console.time('query_execution_time')
        const response = await fetch(url)
        console.timeEnd('query_execution_time')

        const res = await response.json()

        console.log('QuestDB response = ', res);
    }
}

module.exports = QuestDB
