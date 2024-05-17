const createCsvWriter = require('csv-writer').createObjectCsvWriter

const fs = require('fs')

class NodeDataWriter {
    /**
     * @param {string} outputPath 
     * @param {Array<object>} header 
     */
    constructor(outputPath, header) {
        // this.__csvWriter = createCsvWriter({
        //     path: outputPath,
        //     header
        // })

        this.__writeStream = fs.createWriteStream(outputPath)

        this.__writeStream.on('error', (err) => {
            console.log("err  = ", err);
        })

        this.__writeStream.on('finish', () => {
            console.log("Finished write stream");
        })

        const line = header.map(el => `"${el.title}"`).join(',')
        this.__writeStream.write(`${line}\n`)
    }
    
    /**
     * 
     * @param {Array<string>} data 
     */
    writeData(data) {
        // console.log('Starting write data...')
        // this.__csvWriter.writeRecords(data)

        return new Promise((res, rej) => {
            try {
                data.forEach(el => {
                    this.__writeStream.write(`${el}\n`)
                })

                res()
            } catch (err) {
                rej(err)
            }
        })
    }

    finish() {
        this.__writeStream.end()
    }
}

module.exports = NodeDataWriter

