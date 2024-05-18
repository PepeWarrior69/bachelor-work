const moment = require('moment-timezone')

class InfluxFormatter {
    /**
     * @param {string} timezone 
     * @param {string} timeFormat 
     */
    constructor(timezone, timeFormat) {
        this.timezone = timezone
        this.timeFormat = timeFormat
    }

    /**
     * @param {Integer} id 
     * @param {Integer} epoch 
     * @param {number} low 
     * @param {number} high 
     * @param {number} volume 
     * @returns {Object} Record
     */
    composeRecord(id, epoch, low, high, volume) {
        // const ts = moment.unix(epoch).tz(this.timezone).format(this.timeFormat)
        // const val = this.__getRandomFloat(low, high)

        // return `${id},"${ts}",${val},${volume}`

        // const start = '2014-05-19T05:37:32.761697927Z'
        // const stop = '2024-05-18T17:37:32.761697927Z'
        // const time = moment.unix(epoch).tz(this.timezone).format(this.timeFormat) + 'Z'
        // const value = volume
        // const field = 'volume'
        // const measurement = 'stock_data'

        // return `,,0,${start},${stop},${time},${value},${field},${measurement},${id}`

        // return `stock_data_666,stock_id=${id} value=${val},volume=${volume} ${epoch}`

        return {
            stock_id: id,
            ts: epoch,
            value: this.__getRandomFloat(low, high),
            volume
        }
    }

    __getRandomFloat(min, max) {
        return parseFloat( (Math.random() * (max - min) + min).toFixed(4) )
    }
}

module.exports = InfluxFormatter

