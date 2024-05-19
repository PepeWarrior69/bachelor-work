const fs = require("fs")
const path = require("path")
const { parse } = require("csv-parse")


const DatabaseService = require('.')

require('dotenv').config()



class Machbase extends DatabaseService {
    // https://docs.machbase.com/neo/api-http/http-js/
    // https://docs.machbase.com/neo/api-http/write/
    constructor() {
        super()
    }

    // async importCSV() {
    //     const filePath = path.join(__dirname, '..', '..', 'data', 'MACHBASE_stocks_data.csv')
    //     let payload = ''

    //     fs.createReadStream(filePath)
    //         .pipe(parse({ delimiter: ",", from_line: 2, skip_empty_lines: true }))
    //         .on('data', (row) => {
    //             // console.log('payload = ', payload);
    //             payload += row + '\n'
    //         })
    //         .on('error', (err) => {
    //             console.log('err = ', err)
    //         })
    //         .on('end', async () => {
    //             console.log('finished')

    //             const res = await fetch(`http://${process.env.DB_HOST}:${process.env.MACHBASE_PORT}/db/write/stock_data?method=insert`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type':'text/csv'
    //                 },
    //                 body: JSON.stringify(payload)
    //             })

    //             const r = await res.json()

    //             console.log('res = ', r);
    //         })
    // }

    async execute(query) {
        const url = `http://${process.env.DB_HOST}:${process.env.MACHBASE_PORT}/db/query?timeformat=s&q=${query}`

        console.time('query_execution_time')
        const res = await fetch(url)
        console.timeEnd('query_execution_time')
        const parsedRes = await res.json()

        console.log('data = ', parsedRes)
    }

    /**
     * @param {Array<object>} data 
     */
    async insert(data) {
        const payload = {
            data: {
                columns: [ 'stock_id', 'ts', 'value', 'volume' ],
                rows: data.map(el => ([ `${el.stock_id}`, el.ts, el.value, el.volume ]))
            },
            date_format: 's'
        }

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

    async exactSelectionById(id) {
        const query = `
            select 
                count(*) as records_count
            from stock_data
            where stock_id = '${id}'
        `

        await this.execute(query)
    }

    async timeRangeSelection(from, to) {
        const query = `
            select 
                stock_id,
                count(*) as records_count
            from stock_data
            where ts between to_date('${from}') and to_date('${to}')
            group by stock_id
            order by records_count desc
        `

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

        await this.execute(query)
    }
}

module.exports = Machbase
