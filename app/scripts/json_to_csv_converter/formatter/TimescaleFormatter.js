const moment = require('moment-timezone')



class TimescaleFormatter {
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
        return {
            id,
            ts: moment.unix(epoch).tz(this.timezone).format(this.timeFormat),
            value: this.__getRandomFloat(low, high),
            volume
        }
    }

    __getRandomFloat(min, max) {
        return parseFloat( (Math.random() * (max - min) + min).toFixed(4) )
    }
}

module.exports = TimescaleFormatter

