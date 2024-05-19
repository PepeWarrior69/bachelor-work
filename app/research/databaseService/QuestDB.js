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

    async exec_selection(query) {
        const url = `http://${process.env.DB_HOST}:${process.env.QUEST_PORT}/exec?query=${encodeURIComponent(query)}`

        console.time('query_execution_time')
        const response = await fetch(url)
        console.timeEnd('query_execution_time')

        const res = await response.json()

        console.log('QuestDB response = ', res);
    }

    async exactSelectionById(id) {
        const query = `
            select 
                count(*) as records_count
            from stock_data
            where stock_id = ${id}
        `

        await this.exec_selection(query)
    }

    async timeRangeSelection(from, to) {
        const query = `
            select 
                stock_id,
                count(*) as records_count
            from stock_data
            where ts between '${from}' and '${to}'
            group by stock_id
            order by records_count desc
        `

        await this.exec_selection(query)
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

        await this.exec_selection(query)
    }
}

module.exports = QuestDB
