const moment = require('moment-timezone')

class ClickHouseFormatter {
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
        const ts = moment.unix(epoch).tz(this.timezone).format(this.timeFormat)
        const val = this.__getRandomFloat(low, high)

        return `${id},"${ts}",${val},${volume}`
    }

    __getRandomFloat(min, max) {
        return parseFloat( (Math.random() * (max - min) + min).toFixed(4) )
    }
}

module.exports = ClickHouseFormatter

