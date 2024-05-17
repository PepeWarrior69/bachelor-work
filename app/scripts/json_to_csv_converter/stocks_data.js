const fs = require('fs')
const path = require('path')

const { getDirectoryFiles, getJSONFileData } = require('../utils/file.utils')

const DataComposer = require('./DataComposer')
const DataWriter = require('./writers/DataWriter')

const TimescaleFormatter = require('./formatter/TimescaleFormatter')
const MachbaseFormatter = require('./formatter/MachbaseFormatter')
const ClickHouseFormatter = require('./formatter/ClickHouseFormatter')
const QuestFormatter = require('./formatter/QuestFormatter')
const NodeDataWriter = require('./writers/NodeDataWriter')



const main = async (limit, dataComposer) => {
    console.time("totalExecutionTime")

    const stockMap = new Map()

    const sourceDataDirectories = [
        path.join(__dirname, '..', '..', 'source_data', 'stocks2'),
        path.join(__dirname, '..', '..', 'source_data', 'stocks3')
    ]

    for (let i = 0; i < sourceDataDirectories.length; i++) {
        const dir = sourceDataDirectories[i]
        let isLimitReached = false
        
        try {
            const files = await getDirectoryFiles(dir)
            const jsonFiles = files.filter(f => f.includes('.json'))

            for (let k = 0; k < jsonFiles.length; k++) {
                const filename = jsonFiles[k]
                const stockSymbol = filename.split('.')[0]

                if (!stockMap.get(stockSymbol)) {
                    stockMap.set(stockSymbol, k + 1)
                }
                
                console.log('Starting process: ', filename);

                const jsonData = await getJSONFileData(path.join(dir, filename))

                if (!Object.keys(jsonData).length) {
                    console.log("JSON data is missing: jsonData = ", jsonData)
                    
                    continue
                }

                console.log(`Original file (${filename}) records count = ${jsonData.data.length}`)
        
                isLimitReached = await dataComposer.processData(stockMap.get(stockSymbol), jsonData, limit)

                if (isLimitReached) break
            }
        } catch (err) {
            console.log('Error during read directory: ', err)
        }

        if (isLimitReached) break
    }

    console.log("Saving stocks reference file...")

    const outputStockIdFilePath = path.join(__dirname, '..', '..', 'data', '__stocks.csv')
    const stockIdHeader = [
        { id: 'id', title: 'id' },
        { id: 'symbol', title: 'symbol' }
    ]
    const writer = new DataWriter(outputStockIdFilePath, stockIdHeader)

    const data = []

    stockMap.forEach((id, symbol) => {
        data.push({ id, symbol })
    })

    writer.writeData(data)

    console.timeEnd("totalExecutionTime")
}


const DATA_MULTIPLIER = 5
const csvHeader = [
    { id: 'id', title: 'stock_id' },
    { id: 'ts', title: 'ts' },
    { id: 'value', title: 'value' },
    { id: 'volume', title: 'volume' }
]

const timescaleDataFormatter = new TimescaleFormatter('US/Eastern', 'YYYY-MM-DD HH:mm:ssZ')
// https://docs.machbase.com/dbms/feature-table/tag/manipulate/input/#csv-format-datacsv
const machbaseDataFormatter = new MachbaseFormatter('US/Eastern', '')
const clickhouseDataFormatter = new ClickHouseFormatter('US/Eastern', 'YYYY-MM-DD HH:mm:ss')
const questDataFormatter = new QuestFormatter('US/Eastern', 'YYYY-MM-DDTHH:mm:ss.000000Z')


const outputDataFilePath = path.join(__dirname, '..', '..', 'data', 'TIMESCALE_stocks_data.csv')


// Timescale 
const dataWriter = new DataWriter(outputDataFilePath, csvHeader)

// ClickHouse | QuestDB
const nodeDataWriter = new NodeDataWriter(outputDataFilePath, csvHeader)



const dataComposer = new DataComposer(timescaleDataFormatter, dataWriter, DATA_MULTIPLIER)

main(30_000_000, dataComposer)

