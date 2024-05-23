
export const getXYListFromMeasurement = (measurement, prop) => {
    return Object.keys(measurement).map(key => ({ x: parseInt(key.split('_')[1]), y: measurement[key][prop] }))
}