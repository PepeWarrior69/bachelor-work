const fs = require('fs')
const path = require('path')

const axios = require('axios')
const moment = require('moment-timezone')

const stocksList = require('../source_data/stocksList')
const { months1, months2, months3 } = require('../source_data/months')

const months = months1

// https://www.alphavantage.co/documentation/
const baseUrl = 'https://www.alphavantage.co'

const apiKey = null
const stockSymbol = stocksList.TSM 

const interval = '1min'
const outputsize = 'full'


const url = `${baseUrl}/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=${interval}&apikey=${apiKey}&outputsize=${outputsize}`

function saveStockData(stockSymbol, payload) {
  const filePath = path.join(__dirname, `../data/stocks/${stockSymbol}.json`)

  fs.writeFile(filePath, JSON.stringify(payload, undefined, 2), (err) => {
    if (err) {
      console.log("Error in write func: ", err)
    }
  })
}

async function getData(m, i) {
  const result = { data: [], meta: {} }

  try {
    console.log(`Fetching ${i + 1} packet...`)

    const res = await axios.get(`${url}&month=${m}`)

    console.log(`Fetched ${i + 1} packet. Status: ${res.status}`)

    if (res.data.Information) {
      console.error("LIMIT of 25 requests exceeded - ", res.data)
    }

    const data = res.data[`Time Series (${interval})`]

    if (i === 0) result.meta = res.data['Meta Data']

    const timeZone = res.data['Meta Data']?.['6. Time Zone'] ?? 'US/Eastern'

    console.log(`TimeZone: ${timeZone}`)

    if (!data) {
      console.log("Data is empty: ", data);

      return result
    }

    console.log('Begin parsing...')

    result.data = Object.entries(data).map(([key, value]) => {
      value.epoch = moment.tz(key, timeZone).utc().unix()

      return Object.values(value)
    })

    console.log('Last item in result.data: ', result.data.at(-1))
  } catch (err) {
    console.log('Error in fetchData: ', err)
  }

  return result
}

const filepayload = {
  meta: {},
  columns: [ 'open', 'high', 'low', 'close', 'volume', 'epoch' ],
  data: []
}

const getAllData = async () => {
  const promises = months.map(async (m, i) => {
    try {
      const { meta, data } = await getData(m, i)

      if (i === 0) filepayload.meta = meta

      return data
    } catch (err) {
      console.log("FAILED IN getAllData ", i)

      return []
    }
  })

  return await Promise.all(promises)
}

const main = async () => {
  const allData = await getAllData()

  filepayload.data = filepayload.data.concat(...allData)

  console.log(`Saving ${filepayload.data.length} items...`);
  saveStockData(stockSymbol, filepayload)
  console.log(`Saving of ${filepayload.data.length} items FINISHED!`);
}

main()

