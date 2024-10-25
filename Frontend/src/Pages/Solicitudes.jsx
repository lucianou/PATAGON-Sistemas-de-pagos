import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard';
import styles from '../styles/requests.module.css';
import styles1 from '../styles/DashboardGeneral.module.css';
import refreshAccessToken from '../../public/Components/RefreshToken';
import logo from '../assets/SoloLogo_Patagon.png';
import TableComponent from '../../public/Components/Table/Table';

const Solicitudes = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [solicitudes, setSolicitudes] = useState([]);
    const [filter, setFilter] = useState('pendiente');
    const ipserver = import.meta.env.VITE_IP;
    const port = import.meta.env.VITE_PORT;

    useEffect(() => {
        const fetchSolicitudes = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`http://${ipserver}:${port}/api/command/requests`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 403) {
                    return refreshAccessToken().then(newToken => {
                        return fetch(`http://${ipserver}:${port}/api/command/requests`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${newToken}`
                            }
                        });
                    });
                }

                if (!response.ok) {
                    throw new Error('Error en la red al obtener las solicitudes');
                }

                const data = await response.json();
                setSolicitudes(data);
            } catch (error) {
                console.error('Error al obtener las solicitudes:', error);
            }
        };

        fetchSolicitudes();
    }, []);

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
        XLSX.writeFile(workbook, 'Solicitudes.xlsx');
    };

    const handleExport = () => {
        exportToExcel(solicitudes);
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Nombre', accessor: 'nombre' , id: 'nombre'},
            { Header: 'Email', accessor: 'email' },
            { Header: 'Institución', accessor: 'institucion' },
            { Header: 'Estado', accessor: 'estado' },
            { Header: 'Fecha', accessor: 'fecha' },
            {
                Header: 'Documentos',
                accessor: 'documentos',
                Cell: ({ row }) => (
                    <div className={styles.files}>
                        <button className={styles.fileButton} onClick={() => handleViewPDF(row.original.ID_request)}>
                            <img src="/icons/pdf-icon.svg" alt="Ver PDF" style={{ width: '20px', height: '20px' }} />
                        </button>
                        <button className={styles.fileButton} onClick={() => handleViewPUB(row.original.ID_request)}>
                            <img src="/icons/pub_icon.svg" alt="Ver PUB" style={{ width: '20px', height: '20px' }} />
                        </button>
                    </div>
                ),
            },
            {
                Header: 'Acciones',
                accessor: 'acciones',
                Cell: ({ row }) => actionsRenderer(row.original),
            }
        ],
        []
    );

    const actionsRenderer = (solicitud) => {
        if (solicitud.estado === 'pendiente') {
            return (
                <div className={styles.actionButtonsContainer}>
                    <button className={styles.actionButtons} onClick={() => alert(`Aceptar solicitud de ${solicitud.nombre}`)}>Aceptar</button>
                    <button className={styles.actionButtons} onClick={() => alert(`Rechazar solicitud de ${solicitud.nombre}`)}>Rechazar</button>
                </div>
            );
        }
        return 'Sin acciones';
    };

    const filteredSolicitudes = solicitudes.filter(solicitud => {
        switch (filter) {
            case 'pendiente':
                return solicitud.estado === 'pendiente';
            case 'aceptado':
                return solicitud.estado === 'aceptado';
            case 'rechazado':
                return solicitud.estado === 'rechazado';
            default:
                return true;
        }
    });

    return (
        <div className={styles1.dashboardContainer}>
            <MenuDashboard toggleMenu={() => setIsOpen(!isOpen)} isOpen={isOpen} />
            <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`}>
                <div className={styles1.header}>
                    <div className={styles1.titleLogo}>
                        <img src={logo} className={styles1.menuIcon} alt="Logo" />
                        <h1>Dashboard Solicitudes</h1>
                    </div>
                </div>

                <div className={styles.filterButtons}>
                    <button className={filter === 'pendiente' ? styles.active : ''} onClick={() => setFilter('pendiente')}>Pendientes</button>
                    <button className={filter === 'aceptado' ? styles.active : ''} onClick={() => setFilter('aceptado')}>Aceptadas</button>
                    <button className={filter === 'rechazado' ? styles.active : ''} onClick={() => setFilter('rechazado')}>Rechazadas</button>
                </div>

                <button className={styles.excel} onClick={handleExport}>
                    <img src="/icons/excel-icon.svg" alt="Exportar" />
                    Exportar
                </button>

                <div className={styles.solicitudesList}>
                    {filteredSolicitudes.length > 0 ? (
                        <TableComponent 
                            columns={columns} 
                            data={filteredSolicitudes} 
                        />
                    ) : (
                        <p>No hay solicitudes disponibles.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Solicitudes;
