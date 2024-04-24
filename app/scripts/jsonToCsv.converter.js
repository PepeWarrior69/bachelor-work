const fs = require('fs')
const path = require('path')

const moment = require('moment-timezone')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const stocksList = require('../source_data/stocksList')

const MULTIPLIER = 10

const selectedStock = stocksList.AAPL
const sourceFilePath = path.join(__dirname, `../source_data/stocks2/${selectedStock}.json`)
const outputFilePath = path.join(__dirname, `../data/${selectedStock}.csv`)


function getRandomFloat(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(4));
}

const csvWriter = createCsvWriter({
  path: outputFilePath,
  header: [
    { id: 'id', title: 'stock_id' },
    { id: 'ts', title: 'ts' },
    { id: 'value', title: 'value' },
    { id: 'volume', title: 'volume' },
  ]
})


fs.readFile(sourceFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err)

    return
  }

  const jsonData = JSON.parse(data)

  // console.log("meta = ", jsonData.meta)
  // console.log("columns = ", jsonData.columns)
  // console.log("data = ", jsonData.data[0])
  // console.log("data typeof = ", typeof jsonData.data[0][0])

  

  const test = [ jsonData.data[0], jsonData.data[1] ]

  var timezone = jsonData.meta['6. Time Zone']
  const TS_FORMAT = 'YYYY-MM-DD HH:mm:ssZ'

  var finalRecords = Array(jsonData.data.length * MULTIPLIER).fill({})

  jsonData.data.forEach((el, recordIdx) => {
    const open = parseFloat(el[0])
    const high = parseFloat(el[1])
    const low = parseFloat(el[2])
    const close = parseFloat(el[3])
    const volume = parseInt(parseInt(el[4]) / MULTIPLIER)
    const epoch = parseInt(el[5])

    var initialIndex = recordIdx * MULTIPLIER
    var index = initialIndex

    for (let i = 0; i < MULTIPLIER; i++) {
      finalRecords[index] = {
        id: 1,
        ts: moment.unix(epoch - i * 2).tz(timezone).format(TS_FORMAT),
        value: getRandomFloat(low, high),
        volume
      }

      index++
    }

    // console.log("index = ", index)

    finalRecords[initialIndex].value = close
    finalRecords.at(index - 1).value = open
  })

  console.log("Starting writing...")
  
  csvWriter.writeRecords(finalRecords).then(() => {
    console.log("finished")
  })
})

