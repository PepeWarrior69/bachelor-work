const DataFormatter = require('./DataFormatter')
const DataWriter = require('./DataWriter')

const PACKET_LIMIT = 100_000
const MAX_ATTEMPTS_COUNT = 3

class DataComposer {
    /**
     * @param {DataFormatter} formatter 
     * @param {DataWriter} writer 
     * @param {Integer} dataMultiplier 
     */
    constructor(formatter, writer, dataMultiplier) {
        this.formatter = formatter
        this.writer = writer
        this.dataMultiplier = dataMultiplier

        this.finalDataLength = 0

        this.__resetDataPacket()
    }

    /**
     * @param {Integer} id
     * @param {Object} json
     */
    async processData(id, json, limit) {
        console.log("Started data processor...")

        let isLimitReached = false

        for (let k = 0; k < json.data.length; k++) {
            const el = json.data[k]

            // const open = parseFloat(el[0])
            const high = parseFloat(el[1])
            const low = parseFloat(el[2])
            // const close = parseFloat(el[3])
            const volume = parseInt(parseInt(el[4]) / this.dataMultiplier)
            const epoch = parseInt(el[5])
            
            for (let i = 0; i < this.dataMultiplier; i++) {
                await this.__addRecordToPacket(
                    this.formatter.composeRecord(id, epoch - i * 2, low, high, volume)
                )

                if (this.finalDataLength + this.tailIndex + 1 >= limit) {
                    isLimitReached = true
                    break
                }
            }
        }

        await this.__handleWrite()

        return isLimitReached
    }

    async __addRecordToPacket(record) {
        this.dataPacket[this.tailIndex] = record
        this.tailIndex++

        if (this.tailIndex >= PACKET_LIMIT - 1) {
            console.log("Packet limit is reached.")
            
            await this.__handleWrite()
        }
    }

    async __handleWrite() {
        try {
            await this.__writePacket()

            this.finalDataLength += this.tailIndex + 1
        } catch (err) {
            console.log("[__handleWrite] Error during write")
        }

        console.log('Total records count = ', this.finalDataLength)

        this.__resetDataPacket()
    }

    async __writePacket(attempt = 1) {
        console.log("Executing packet write...")

        try {
            console.time("writeDataTimer")
            await this.writer.writeData(this.dataPacket.filter(el => !!el))
            console.timeEnd("writeDataTimer")

            console.log("Packet write is finished successfully!")
        } catch (err) {
            console.log(`Attempt: ${attempt}. Error during packet write. err = `, err)

            if (attempt < MAX_ATTEMPTS_COUNT) {
                await this.__writePacket(attempt++)
            }
            else {
                console.log(`Max attempts count reached: ${attempt}. Error during packet write. err = `, err)
            }
        }
    }

    __resetDataPacket() {
        this.tailIndex = 0
        this.dataPacket = Array(PACKET_LIMIT).fill(null)
    }
}

module.exports = DataComposer

