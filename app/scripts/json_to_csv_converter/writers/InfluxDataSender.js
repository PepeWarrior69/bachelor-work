const InfluxDB = require('../../../research/databaseService/InfluxDB')

class InfluxDataSender {
    /**
     * @param {string} outputPath 
     * @param {Array<object>} header 
     */
    constructor(outputPath, header) {
        this.__influx = new InfluxDB()
    }
    
    /**
     * 
     * @param {Array<string>} data 
     */
    writeData(data) {
        const chunkSize = 10_000

        const promises = Array(10).fill(null).map((_, i) => {
            const payload = data.slice(i, i - 1 + chunkSize)

            return this.__influx.insert(payload)
        })

        return Promise.all(promises)
    }
}

module.exports = InfluxDataSender

