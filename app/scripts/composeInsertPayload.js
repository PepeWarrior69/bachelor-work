const fs = require('fs')
const path = require('path')

const { getJSONFileData } = require('./utils/file.utils')



const main = async (size, skip=0) => {
    const sourceFile = path.join(__dirname, '..', 'source_data', 'stocks', 'AAPL.json')
    const jsonData = await getJSONFileData(sourceFile)


    for (let i = 0; i < 10; i++) {
        const payload = []

        for (let k = skip + i * size; k < skip + (i + 1) * size; k++) {
            const el = jsonData.data[k]
            const open = parseFloat(el[0])
            const volume = parseInt(el[4])
            const epoch = parseInt(el[5])

            payload.push({ stock_id: 1, ts: epoch, value: open, volume })
        }

        const filePath = path.join(__dirname, `../data/insert_${size}_payload/insert_${i + 1}.json`)

        fs.writeFile(filePath, JSON.stringify(payload, undefined, 2), (err) => {
            if (err) {
                console.log("Error in write func: ", err)
            }
        })
    }
}

main(10_000, 10_000)