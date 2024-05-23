
export const clickHouseMeasurements = {
    chartOptions: {
        label: 'ClickHouse',
        borderColor: "#faff69",
        backgroundColor: "#faff69"
    },
    storageSizeMb: 1076,
    insertTestAVG: {
        datasize_1000: {
            executionTime: 0.1712,
            cpuPeakUsage_of_400_percent: 5.496,
            ramPeakUsage_Mb: 101.924
        },
        datasize_10000: {
            executionTime: 0.355,
            cpuPeakUsage_of_400_percent: 7.042,
            ramPeakUsage_Mb: 116.86
        },
        datasize_100000: {
            executionTime: 0.8484,
            cpuPeakUsage_of_400_percent: 30.752,
            ramPeakUsage_Mb: 137
        }
    },
    selectionTestAVG: {
        recordsByExactId: {
            executionTime: 0.101,
            cpuPeakUsage_of_400_percent: 5.064,
            ramPeakUsage_Mb: 101.584
        },
        recordsByTimeRange: {
            executionTime: 0.4002,
            cpuPeakUsage_of_400_percent: 112.094,
            ramPeakUsage_Mb: 141.88
        },
        aggregateAll: {
            executionTime: 0.6384,
            cpuPeakUsage_of_400_percent: 169.016,
            ramPeakUsage_Mb: 130.48
        }
    }
}
