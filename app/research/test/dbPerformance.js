
const DatabaseService = require('../databaseService');

const ClickHouse = require('../databaseService/ClickHouse');
const InfluxDB = require('../databaseService/InfluxDB');
const Machbase = require('../databaseService/Machbase');
const QuestDB = require('../databaseService/QuestDB');
const TimescaleDB = require('../databaseService/TimescaleDB')


/**
 * 
 * @param {DatabaseService} database 
 */
const main = async (database, payload) => {
    // await database.insert(payload)
    console.log('------------------------------------------------------');
    await database.selectionWithAggregation()
}

// const machbase = new Machbase()
// const payloadMachbase = [
//     { stock_id: '1', ts: 1715867263, value: 525.333, volume: 12 },
//     { stock_id: '1', ts: 1715866263, value: 535.333, volume: 1267 },
//     { stock_id: '1', ts: 1715868263, value: 545.333, volume: 12 },
// ]

// const timescale = new TimescaleDB()
// const payloadTimescale = [
//     { stock_id: 1, ts: 1715867263, value: 525.3333, volume: 12 },
//     { stock_id: 1, ts: 1715866263, value: 535.3333, volume: 1267 },
//     { stock_id: 1, ts: 1715868263, value: 545.3333, volume: 12 },
// ]

// const clickhouse = new ClickHouse()
// const payloadClickHouse = [
//     { stock_id: 1, ts: '2022-12-27 12:51:15.329', value: 525.3333, volume: 12 },
//     { stock_id: 1, ts: '2022-12-27 12:51:15.329', value: 535.3333, volume: 1267 },
//     { stock_id: 1, ts: '2022-12-27 12:51:15.329', value: 545.3333, volume: 12 },
// ]

// const quest = new QuestDB()
// const payloadQuest = [
//     { stock_id: 1, ts: 1715867263, value: 525.3333, volume: 12 },
//     { stock_id: 1, ts: 1715866263, value: 535.3333, volume: 1267 },
//     { stock_id: 1, ts: 1715868263, value: 545.3333, volume: 12 },
// ]

const influx = new InfluxDB()
const payloadInflux = [
    { stock_id: 1, ts: 1715867263, value: 525.3333, volume: 12 },
    { stock_id: 1, ts: 1715866263, value: 535.3333, volume: 1267 },
    { stock_id: 1, ts: 1715868263, value: 545.3333, volume: 12 },
]

main(influx, payloadInflux)
