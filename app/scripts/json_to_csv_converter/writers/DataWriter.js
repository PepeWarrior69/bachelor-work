const createCsvWriter = require('csv-writer').createObjectCsvWriter

class DataWriter {
    /**
     * @param {string} outputPath 
     * @param {Array<object>} header 
     */
    constructor(outputPath, header) {
        this.__csvWriter = createCsvWriter({
            path: outputPath,
            header
        })
    }
    
    /**
     * 
     * @param {Array<object>} data 
     */
    writeData(data) {
        console.log('Starting write data...')
        return this.__csvWriter.writeRecords(data)
    }
}

module.exports = DataWriter

