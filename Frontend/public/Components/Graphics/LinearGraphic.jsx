import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// Datos del gráfico
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const ganancias = [0, 10, 20, 30, 40, 50, 40, 30, 20, 10, 10, 10];

const midata = {
    labels: meses,
    datasets: [ //si pongo "," puedo agregar otra línea
        {
            label: 'Ganancias',
            data: ganancias,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(126, 178, 109)',
            backgroundColor: 'rgb(126, 178, 109, 0.3)',
            pointRadius: 5,
            pointBorderColor: 'rgb(142, 207, 121)',
            pointBackgroundColor: 'rgb(142, 207, 121)',
        },
    ],
};

// Opciones del gráfico
const misoptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: 'rgb(255,255,255, 0.8)', // Color blanco para la leyenda
                font: {
                    weight: 'bold',
                },
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
                text: 'Meses',
                color: 'rgb(255,255,255, 0.8)', // Color blanco para el título del eje X
                font: {
                    weight: 'bold',
                },
            },
            ticks: {
                color: 'rgb(255,255,255, 0.8)', // Color blanco para las etiquetas del eje X
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)', // Color de la cuadrícula del eje X
            },
        },
        y: {
            title: {
                display: true,
                text: 'Ganancias',
                color: 'rgb(255,255,255, 0.8)', // Color blanco para el título del eje Y
                font: {
                    weight: 'bold',
                },
            },
            ticks: {
                color: 'rgb(255,255,255, 0.8)', // Color blanco para las etiquetas del eje Y
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)', // Color de la cuadrícula del eje Y
            },
            suggestedMin: 0,
        },
    },
};

export default function LinearGraphic() {
    return <Line data={midata} options={misoptions}></Line>
}