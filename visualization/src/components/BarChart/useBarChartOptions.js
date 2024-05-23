

export const useBarChartOptions = ({ title, xMin, xMax, yMin, yMax, xLabel, yLabel }) => {
    return {
        responsive: true,
        elements: {
            line: {
                tension: 0.1,
                borderWidth: 1
            },
            point: {
                radius: 3,
                // hoverBackgroundColor: "white",
                hoverRadius: 6,
                hitRadius: 100
            },
            title: {

            }
        },
        scales: {
            x: {
                min: xMin,
                max: xMax,
                title: {
                    display: true,
                    text: xLabel
                },
                ticks: {
                    padding: 25
                }
            },
            y: {
                min: yMin,
                max: yMax,
                grace: '20%',
                title: {
                    display: true,
                    text: yLabel
                }
            }
        },
        plugins: {
            title: {
                text: title,
                display: true
            },
            datalabels: {
                // Position of the labels 
                // (start, end, center, etc.)
                anchor: 'end',
                // Alignment of the labels 
                // (start, end, center, etc.)
                align: 'end',
                // Color of the labels
                color: 'black',
                font: {
                    weight: 'bold',
                    size: 16
                },
                formatter: function (value, context) {
                    // Display the actual data value
                    return value;
                }
            }
        }
    }
}

