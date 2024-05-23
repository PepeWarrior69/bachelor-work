import { useMemo } from "react"

import MeasurementLineChart from "./chart/MeasurementLineChart.js"
import MeasurementBarChart from "./chart/MeasurementBarChart.js"

import { timescaleDbMeasurements } from "./data/timescale.js"
import { questDbMeasurements } from "./data/quest.js"
import { clickHouseMeasurements } from "./data/clickHouse.js"
import { machbaseMeasurements } from "./data/machbase.js"


const App = () => {
    const labels = useMemo(() => [ 1000, 10000, 100000 ], [])
    const dbMeasurements = useMemo(() => {
        return [
            timescaleDbMeasurements,
            questDbMeasurements,
            clickHouseMeasurements,
            machbaseMeasurements
        ]
    }, [])

    const dbNames = useMemo(() => {
        // return dbMeasurements.map(el => el.chartOptions.label)
        return ['']
    }, [])

    return (
        <div>
            <h1>Storage Space Usage (100 million records)</h1>

            <MeasurementBarChart
                labels={dbNames}
                dbMeasurements={dbMeasurements}
                datasets={dbMeasurements.map(db => ({
                    data: [ db.storageSizeMb ],
                    ...db.chartOptions,
                    label: db.chartOptions.label
                }))}
                title={'Storage Usage of saving 100 million records'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Database'}
                yLabel={'Storage Usage (Mb)'}
            />

            <h1>Insert Executions Results</h1>

            <MeasurementBarChart
                labels={labels}
                dbMeasurements={dbMeasurements}
                datasets={dbMeasurements.map(db => ({
                    data: Object.values(db.insertTestAVG).map(el => el.executionTime),
                    ...db.chartOptions,
                    label: db.chartOptions.label
                }))}
                title={'Insert Execution Time'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Dataset Size (records count)'}
                yLabel={'Time (Seconds)'}
            />

            <MeasurementBarChart
                labels={labels}
                dbMeasurements={dbMeasurements}
                datasets={dbMeasurements.map(db => ({
                    data: Object.values(db.insertTestAVG).map(el => el.cpuPeakUsage_of_400_percent),
                    ...db.chartOptions,
                    label: db.chartOptions.label
                }))}
                title={'CPU Peak Usage (%/400%)'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Dataset Size (records count)'}
                yLabel={'CPU Usage (%/400%)'}
            />

            <MeasurementBarChart
                labels={labels}
                dbMeasurements={dbMeasurements}
                datasets={dbMeasurements.map(db => ({
                    data: Object.values(db.insertTestAVG).map(el => el.ramPeakUsage_Mb),
                    ...db.chartOptions,
                    label: db.chartOptions.label
                }))}
                title={'RAM Peak Usage (Mb)'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Dataset Size (records count)'}
                yLabel={'RAM Usage (Mb)'}
            />

            <MeasurementLineChart
                labels={labels}
                dbMeasurements={dbMeasurements}
                measurementKey="insertTestAVG"
                property="executionTime"
                title={'Insert Execution Time'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={15}
                xLabel={'Dataset Size (records count)'}
                yLabel={'Time (Seconds)'}
            />

            <MeasurementLineChart
                labels={labels}
                dbMeasurements={dbMeasurements}
                measurementKey="insertTestAVG"
                property="cpuPeakUsage_of_400_percent"
                title={'CPU Peak Usage (%/400%)'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Dataset Size (records count)'}
                yLabel={'CPU Usage (%/400%)'}
            />

            <MeasurementLineChart
                labels={labels}
                dbMeasurements={dbMeasurements}
                measurementKey="insertTestAVG"
                property="ramPeakUsage_Mb"
                title={'RAM Peak Usage (Mb)'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Dataset Size (records count)'}
                yLabel={'RAM Usage (Mb)'}
            />

            <h1>Records Count Selection By Exact ID</h1>

            <MeasurementBarChart
                labels={dbNames}
                dbMeasurements={dbMeasurements}
                measurementKey="selectionTestAVG"
                testName="recordsByExactId"
                property="executionTime"
                title={'Execution Time of Records Count Selection By Exact ID'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Database'}
                yLabel={'Time (Seconds)'}
            />

            <MeasurementBarChart
                labels={dbNames}
                dbMeasurements={dbMeasurements}
                measurementKey="selectionTestAVG"
                testName="recordsByExactId"
                property="cpuPeakUsage_of_400_percent"
                title={'CPU Usage of Records Count Selection By Exact ID'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Database'}
                yLabel={'CPU Usage (%/400%)'}
            />

            <MeasurementBarChart
                labels={dbNames}
                dbMeasurements={dbMeasurements}
                measurementKey="selectionTestAVG"
                testName="recordsByExactId"
                property="ramPeakUsage_Mb"
                title={'RAM Usage of Records Count Selection By Exact ID'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Database'}
                yLabel={'RAM Usage (Mb)'}
            />

            <h1>Records Count Selection By Time Range</h1>

            <MeasurementBarChart
                labels={dbNames}
                dbMeasurements={dbMeasurements}
                measurementKey="selectionTestAVG"
                testName="recordsByTimeRange"
                property="executionTime"
                title={'Execution Time of Records Count Selection By Time Range'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Database'}
                yLabel={'Time (Seconds)'}
            />

            <MeasurementBarChart
                labels={dbNames}
                dbMeasurements={dbMeasurements}
                measurementKey="selectionTestAVG"
                testName="recordsByTimeRange"
                property="cpuPeakUsage_of_400_percent"
                title={'CPU Usage of Records Count Selection By Time Range'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Database'}
                yLabel={'CPU Usage (%/400%)'}
            />

            <MeasurementBarChart
                labels={dbNames}
                dbMeasurements={dbMeasurements}
                measurementKey="selectionTestAVG"
                testName="recordsByTimeRange"
                property="ramPeakUsage_Mb"
                title={'RAM Usage of Records Count Selection By Time Range'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Database'}
                yLabel={'RAM Usage (Mb)'}
            />

            <h1>Aggregated Selection of All Data (100 million records)</h1>

            <MeasurementBarChart
                labels={dbNames}
                dbMeasurements={dbMeasurements}
                measurementKey="selectionTestAVG"
                testName="aggregateAll"
                property="executionTime"
                title={'Execution Time of Aggregated Selection of All Data'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Database'}
                yLabel={'Time (Seconds)'}
            />

            <MeasurementBarChart
                labels={dbNames}
                dbMeasurements={dbMeasurements}
                measurementKey="selectionTestAVG"
                testName="aggregateAll"
                property="cpuPeakUsage_of_400_percent"
                title={'CPU Usage of Aggregated Selection of All Data'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Database'}
                yLabel={'CPU Usage (%/400%)'}
            />

            <MeasurementBarChart
                labels={dbNames}
                dbMeasurements={dbMeasurements}
                measurementKey="selectionTestAVG"
                testName="aggregateAll"
                property="ramPeakUsage_Mb"
                title={'RAM Usage of Aggregated Selection of All Data'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Database'}
                yLabel={'RAM Usage (Mb)'}
            />

            <h1>QuestDB CPU Usage of Records Count Selection By Exact ID</h1>

            <MeasurementBarChart
                labels={['execution 1', 'execution 2', 'execution 3', 'execution 4', 'execution 5']}
                dbMeasurements={dbMeasurements}
                datasets={[
                    {
                        data: questDbMeasurements.selectionTestAVG.recordsByExactId.cpuAll,
                        ...questDbMeasurements.chartOptions,
                        label: questDbMeasurements.chartOptions.label
                    }
                ]}
                title={'CPU Usage of Records Count Selection By Exact ID'}
                xMin={0}
                xMax={100}
                yMin={0}
                // yMax={400}
                xLabel={'Database'}
                yLabel={'CPU Usage (%/400%)'}
            />
        </div>
    )
}

export default App
