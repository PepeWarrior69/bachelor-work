const ClickHouse = require("../databaseService/ClickHouse")
const InfluxDB = require("../databaseService/InfluxDB")
const Machbase = require("../databaseService/Machbase")
const QuestDB = require("../databaseService/QuestDB")
const TimescaleDB = require("../databaseService/TimescaleDB")



const main = async (db) => {
    await db.timeRangeSelection('2019-01-05', '2020-10-05')
}


const influx = new InfluxDB()

const machbase = new Machbase()
const clickHouse = new ClickHouse()
const quest = new QuestDB()
const timescale = new TimescaleDB()

main(clickHouse)