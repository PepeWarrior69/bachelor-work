import BarChart from "../components/BarChart/BarChart"



const MeasurementBarChart = ({ labels, dbMeasurements, measurementKey, testName, property, datasets = null, ...args }) => {
    const chartData = {
        labels,
        datasets: datasets ? datasets : dbMeasurements.map(db => ({
            data: [ db[measurementKey][testName][property] ],
            ...db.chartOptions,
            label: db.chartOptions.label
        }))
    }

    return (
        <BarChart
            data={chartData}
            {...args}
        />
    )
}

export default MeasurementBarChart
