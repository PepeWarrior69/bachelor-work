
export const questDbMeasurements = {
    chartOptions: {
        label: 'QuestDB',
        borderColor: "#b73c6f",
        backgroundColor: "#b73c6f"
    },
    storageSizeMb: 2015,
    insertTestAVG: {
        datasize_1000: {
            executionTime: 0.1706,
            cpuPeakUsage_of_400_percent: 56.304,
            ramPeakUsage_Mb: 248.68
        },
        datasize_10000: {
            executionTime: 1.0028,
            cpuPeakUsage_of_400_percent: 141.566,
            ramPeakUsage_Mb: 260.46
        },
        datasize_100000: {
            executionTime: 2.258,
            cpuPeakUsage_of_400_percent: 317.824,
            ramPeakUsage_Mb: 275.68
        }
    },
    selectionTestAVG: {
        recordsByExactId: {
            executionTime: 0.558,
            cpuPeakUsage_of_400_percent: 162.744,
            ramPeakUsage_Mb: 262.52,
            cpuAll: [ 270.65, 164.58, 136.56, 127.46, 114.47 ]
        },
        recordsByTimeRange: {
            executionTime: 0.3042,
            cpuPeakUsage_of_400_percent: 114.29,
            ramPeakUsage_Mb: 272.32
        },
        aggregateAll: {
            executionTime: 2.3492,
            cpuPeakUsage_of_400_percent: 395.456,
            ramPeakUsage_Mb: 286.18
        }
    }
}

