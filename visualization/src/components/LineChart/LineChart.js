import React, { useEffect, useRef } from "react"
import { Line } from "react-chartjs-2"
import { useLineChartOptions } from "./useLineChartOptions"
// import Chart from 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const LineChart = ({ data, width = '100rem', height = '30rem', ...args }) => {
    const chartRef = useRef({})

    const options = useLineChartOptions(args)

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
            <Line
                ref={chartRef}
                redraw={true}
                options={options}
                data={data}
            />
        </div>
    )
}

export default React.memo(LineChart)
