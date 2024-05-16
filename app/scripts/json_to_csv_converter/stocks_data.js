const fs = require('fs')
const path = require('path')


const DataComposer = require('./DataComposer')
const DataFormatter = require('./DataFormatter')
const DataWriter = require('./DataWriter')



const getDirectoryFiles = (directoryPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, async (err, files) => {
            if (err) {
                console.log(`Error occured during file system reading (${directoryPath}): err = `, err)
    
                reject(err)
            }
    
            resolve(files)
        })
    })
}

const getJSONFileData = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading the JSON file (${filePath}):`, err)
            
                reject(err)
            }
    
            resolve(JSON.parse(data))
        })
    })
}

const main = async (limit, dataFormatter, outputDataFilePath, dataMultiplier) => {
    console.time("totalExecutionTime")

    const stockMap = new Map()
    const csvHeader = [
        { id: 'id', title: 'stock_id' },
        { id: 'ts', title: 'ts' },
        { id: 'value', title: 'value' },
        { id: 'volume', title: 'volume' }
    ]

    const dataWriter = new DataWriter(outputDataFilePath, csvHeader)
    const dataComposer = new DataComposer(dataFormatter, dataWriter, dataMultiplier)

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

    const outputStockIdFilePath = path.join(__dirname, '..', '..', 'data', 'stocks.csv')
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


const timescaleDataFormatter = new DataFormatter('US/Eastern', 'YYYY-MM-DD HH:mm:ssZ')
// https://docs.machbase.com/dbms/feature-table/tag/manipulate/input/#csv-format-datacsv
const machbaseDataFormatter = new DataFormatter('US/Eastern', 'YYYY-MM-DD HH24:MI:SS mmm:uuu:nnn')


const outputDataFilePath = path.join(__dirname, '..', '..', 'data', 'stocks_data.csv')
const DATA_MULTIPLIER = 10

main(30_000_000, timescaleDataFormatter, outputDataFilePath, DATA_MULTIPLIER)

