
export const timescaleDbMeasurements = {
    chartOptions: {
        label: 'TimescaleDB',
        borderColor: "#699eca",
        backgroundColor: "#699eca"
    },
    storageSizeMb: 6064,
    insertTestAVG: {
        datasize_1000: {
            executionTime: 0.169,
            cpuPeakUsage_of_400_percent: 6.006,
            ramPeakUsage_Mb: 117.44
        },
        datasize_10000: {
            executionTime: 0.5692,
            cpuPeakUsage_of_400_percent: 30.946,
            ramPeakUsage_Mb: 124.06
        },
        datasize_100000: {
            executionTime: 3.0534,
            cpuPeakUsage_of_400_percent: 102.406,
            ramPeakUsage_Mb: 464.66
        }
    },
    selectionTestAVG: {
        recordsByExactId: {
            executionTime: 1.1656,
            cpuPeakUsage_of_400_percent: 124.86,
            ramPeakUsage_Mb: 202.96
        },
        recordsByTimeRange: {
            executionTime: 4.0528,
            cpuPeakUsage_of_400_percent: 302.722,
            ramPeakUsage_Mb: 554.24
        },
        aggregateAll: {
            executionTime: 44.154,
            cpuPeakUsage_of_400_percent: 306.178,
            ramPeakUsage_Mb: 1141.8
        }
    }
}
