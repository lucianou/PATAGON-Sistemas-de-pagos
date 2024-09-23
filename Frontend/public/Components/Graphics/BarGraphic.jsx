
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


const cards = ["RTX01", "RTX02", "RTX03", "RTX04", "RTX05", "RTX06", "RTX07", "RTX08", "RTX09", "RTX10", "RTX11", "RTX12"];
const horas_uso = [40, 10, 20, 30, 40, 50, 40, 30, 20, 10, 10, 10];

const midata = {
    labels: cards,
    datasets: [ //si pongo "," puedo agregar otra línea
        {
            label: 'Ganancias',
            data: horas_uso,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(255,255,255)',
            backgroundColor: 'rgba(255,99,132,0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255,99,132)',
            pointBackgroundColor: 'rgba(255,99,132)',
        },
    ],
};

// Opciones del gráfico
const misoptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
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
            },
        },
        y: {
            title: {
                display: true,
                text: 'Horas de uso',
            },
            suggestedMin: 0,
        },
    },
};

export default function BarGraphic() {
    return <Bar data={midata} options={misoptions}></Bar>
}