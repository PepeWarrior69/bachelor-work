import { useMemo } from "react"
import LineChart from "../components/LineChart/LineChart"
import { getXYListFromMeasurement } from "../utils"



const MeasurementLineChart = ({ labels, dbMeasurements, measurementKey, property, ...args }) => {
    const chartData = useMemo(() => {
        return {
            labels,
            datasets: dbMeasurements.map(db => ({
                data: getXYListFromMeasurement(db[measurementKey], property),
                ...db.chartOptions
            }))
        }
    }, [dbMeasurements, labels, measurementKey, property])

    return (
        <LineChart
            data={chartData}
            {...args}
        />
    )
}

export default MeasurementLineChart
