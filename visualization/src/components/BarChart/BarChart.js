import React, { useEffect, useRef } from "react"
import { Bar } from "react-chartjs-2"
import { useBarChartOptions } from "./useBarChartOptions"
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    Chart as ChartJS,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    BarElement
  } from "chart.js"

ChartJS.register(
    CategoryScale,
    BarElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend,
);

const BarChart = ({ data, width = '100rem', height = '30rem', ...args }) => {
    const chartRef = useRef({})

    const options = useBarChartOptions(args)

    useEffect(() => {
        const ref = chartRef.current

        return () => {
            if (ref) {
                ref?.destroy?.()
            }
        }
    }, [])

    return (
        <div
            style={{ maxHeight: height, maxWidt: width, padding: '2rem' }}
        >
            <Bar
                ref={chartRef}
                redraw={true}
                options={options}
                data={data}
            />
        </div>
    )
}

export default React.memo(BarChart)
