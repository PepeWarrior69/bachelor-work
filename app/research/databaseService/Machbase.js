
const DatabaseService = require('.')

require('dotenv').config()



class Machbase extends DatabaseService {
    // https://docs.machbase.com/neo/api-http/http-js/
    constructor() {
        super()
    }

    /**
     * @param {Array<object>} data 
     */
    async insert(data) {
        const payload = {
            data: {
                columns: [ 'stock_id', 'ts', 'value', 'volume' ],
                rows: data.map(el => ([ el.stock_id, el.ts, el.value, el.volume ]))
            },
            date_format: 's'
        }

        console.log('payload = ', payload.data);

        console.time('query_execution_time')
        const res = await fetch(`http://${process.env.DB_HOST}:${process.env.MACHBASE_PORT}/db/write/stock_data?timeformat=s&method=insert`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(payload)
        })
        console.timeEnd('query_execution_time')

        const parsed = await res.json()

        console.log("Machbase res = ", parsed)
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

        const url = `http://${process.env.DB_HOST}:${process.env.MACHBASE_PORT}/db/query?timeformat=s&q=${query}`

        console.time('query_execution_time')
        const res = await fetch(url)
        console.timeEnd('query_execution_time')
        const parsedRes = await res.json()

        console.log('data = ', parsedRes)
        console.log('data columns = ', parsedRes.data.columns)
        console.log('data types = ', parsedRes.data.types)
        console.log('data rows = ', parsedRes.data.rows)
        console.log('data elapse: = ', parsedRes.elapse)
    }
}

module.exports = Machbase
