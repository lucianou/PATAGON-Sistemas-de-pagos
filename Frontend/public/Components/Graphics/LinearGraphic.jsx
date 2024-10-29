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

export default function LinearGraphic({ labels = [], dataPoints = [], title = 'Título del Gráfico', color = 'rgb(75, 192, 192)' }) {
    // Configuración de los datos del gráfico
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "cantidad usuarios",
                data: dataPoints,
                tension: 0.5, // Suaviza la línea
                fill: false, // Rellena el área bajo la curva
                borderColor: color, // Color de la línea
                backgroundColor: `${color}33`, // Color del área bajo la línea con transparencia (33 para un 20% de opacidad)
                pointRadius: 5, // Radio de los puntos
                pointBorderColor: color, // Color del borde de los puntos
                pointBackgroundColor: color, // Color de fondo de los puntos
            },
        ],
    };

    // Configuración de las opciones del gráfico
    const chartOptions = {
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
            title: {
                display: true,
                text: title,
                color: 'rgb(255,255,255, 0.8)',
                font: {
                    size: 16,
                    weight: 'bold',
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
                    text: 'Fechas',
                    color: 'rgb(255,255,255, 0.8)', 
                    font: {
                        weight: 'bold',
                    },
                },
                ticks: {
                    color: 'rgb(255,255,255, 0.8)', // Color blanco para las etiquetas del eje X
                    // maxRotation: 45, // Rotación máxima de las etiquetas del eje X
                    // minRotation: 45, // Rotación mínima de las etiquetas del eje X
                    font: {
                        size: 10,
                    },
                    
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)', // Color de la cuadrícula del eje X
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Cantidad',
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
                suggestedMin: 0, // Mínimo sugerido en el eje Y
            },
        },
    };

    return <Line data={chartData} options={chartOptions} />;
}
