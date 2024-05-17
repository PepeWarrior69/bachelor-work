const fs = require('fs')
const path = require('path')

const getDirectoryFiles = (directoryPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, async (err, files) => {
            if (err) {
                console.log(`Error occured during file system reading (${directoryPath}): err = `, err)
    
                reject(err)
            }
    
            resolve(files)
        })
    })
}


const getJSONFileData = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading the JSON file (${filePath}):`, err)
            
                reject(err)
            }
    
            resolve(JSON.parse(data))
        })
    })
}


module.exports = {
    getDirectoryFiles,
    getJSONFileData
}