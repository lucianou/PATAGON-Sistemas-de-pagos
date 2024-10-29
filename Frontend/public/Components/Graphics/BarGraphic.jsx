import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

// Registra los componentes necesarios de Chart.js
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const BarGraphic = ({ labels, dataPoints, title = 'Ganancias', color = 'rgb(234, 184, 57)' }) => {
    const midata = {
        labels,
        datasets: [
            {
                label: title,
                data: dataPoints,
                borderColor: color,
                backgroundColor: `rgba(${color.slice(4)}, 0.3)`, // Fondo transparente para las barras
                pointRadius: 5,
            },
        ],
    };

    const misoptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgb(255,255,255, 0.8)',
                    font: { weight: 'bold' },
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tarjetas',
                    color: 'rgb(255,255,255, 0.8)',
                    font: { weight: 'bold' },
                },
                ticks: {
                    color: 'rgb(255,255,255, 0.8)',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Horas de uso',
                    color: 'rgb(255,255,255, 0.8)',
                    font: { weight: 'bold' },
                },
                ticks: {
                    color: 'rgb(255,255,255, 0.8)',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
                suggestedMin: 0,
            },
        },
    };

    return <Bar data={midata} options={misoptions} />;
};


export default BarGraphic;
