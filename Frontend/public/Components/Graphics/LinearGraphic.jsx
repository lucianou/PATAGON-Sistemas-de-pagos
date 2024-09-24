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
            labels: {
                font: {
                    weight: 'bold', // Negrita para la leyenda
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
                font: {
                    weight: 'bold', // Negrita para el título del eje X
                },
            },
            ticks: {
                font: {
                    weight: 'bold', // Negrita para las etiquetas del eje X
                },
            },
        },
        y: {
            title: {
                display: true,
                text: 'Ganancias',
                font: {
                    weight: 'bold', // Negrita para el título del eje Y
                },
            },
            ticks: {
                font: {
                    weight: 'bold', // Negrita para las etiquetas del eje Y
                },
            },
            suggestedMin: 0,
        },
    },
};

export default function LinearGraphic() {
    return <Line data={midata} options={misoptions}></Line>
}