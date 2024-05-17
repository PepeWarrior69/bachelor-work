const Machbase = require('../databaseService/Machbase');


const main = async (database) => {
    await machbase.importCSV()
}

const machbase = new Machbase()

main(machbase)
