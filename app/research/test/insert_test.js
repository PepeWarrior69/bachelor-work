const fs = require('fs')
const path = require('path')

const ClickHouse = require("../databaseService/ClickHouse")
const InfluxDB = require("../databaseService/InfluxDB")
const Machbase = require("../databaseService/Machbase")
const QuestDB = require("../databaseService/QuestDB")
const TimescaleDB = require("../databaseService/TimescaleDB")

const { getJSONFileData } = require("../../scripts/utils/file.utils")



const main = async (db, srcFolder, payloadNumber) => {
    const sourceFilePath = path.join(__dirname, '..', '..', 'data', srcFolder, `insert_${payloadNumber}.json`)
    const payload = await getJSONFileData(sourceFilePath)

    await db.insert(payload)
}



const influx = new InfluxDB()

const machbase = new Machbase()
const clickHouse = new ClickHouse()
const quest = new QuestDB()
const timescale = new TimescaleDB()

const SOURCE_FOLDER = 'insert_10000_payload'
const PAYLOAD_NUMBER = 1

main(machbase, SOURCE_FOLDER, PAYLOAD_NUMBER)
