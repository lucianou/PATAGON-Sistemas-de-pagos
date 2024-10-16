import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import styles from '../Table/Table.module.css';

const TableComponent = ({ data }) => {
    const ipserver = import.meta.env.VITE_IP;
    const port = import.meta.env.VITE_PORT;

    const handleViewPDF = async (id) => { 
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://${ipserver}:${port}/viewPDF/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Error: ${response.status} ${response.statusText}. ${errorData}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');

        } catch (error) {
            console.error('Error al obtener el PDF:', error.message);
        }
    };

    const handleViewPUB = async (id) => { 
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://${ipserver}:${port}/viewPUB/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Error: ${response.status} ${response.statusText}. ${errorData}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');

        } catch (error) {
            console.error('Error al obtener el PDF:', error.message);
        }
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Nombre',
                accessor: 'nombre',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Institución',
                accessor: 'institucion',
            },
            {
                Header: 'Estado',
                accessor: 'estado',
            },
            {
                Header: 'Fecha',
                accessor: 'fecha',
            },
            {
                Header: 'Documentos',
                accessor: 'documentos',
                Cell: ({ row }) => {
                    const { ID_request } = row.original; // Obtener el ID de la solicitud
                    return (
                        <div className={styles.files}>
                            <button
                                className={styles.fileButton}
                                onClick={() => handleViewPDF(ID_request)} // Llama a la función pasando el ID
                            >
                                <img src="/icons/pdf-icon.svg" alt="Ver PDF" className={styles.fileIcon} />
                            </button>

                            <button
                                className={styles.fileButton}
                                onClick={() => handleViewPUB(ID_request)} // Llama a la función pasando el ID
                            >
                                <img src="/icons/pub_icon.svg" alt="Ver PDF" className={styles.fileIcon} />
                            </button>
                        </div>
                    );
                },
            },
            {
                Header: 'Acciones',
                accessor: 'actions',
                Cell: ({ row }) => {
                    const { estado, nombre } = row.original; // Cambiado para obtener los valores correctos

                    if (estado === 'pendiente') {
                        return (
                            <div>
                                <button
                                    className={styles.button}
                                    onClick={() => alert(`Editando solicitud de ${nombre}`)}
                                >
                                    ✅ Aceptar
                                </button>
                                <button
                                    className={styles.button}
                                    onClick={() => alert(`Eliminando solicitud de ${nombre}`)}
                                >
                                    🗑️ Rechazar
                                </button>
                            </div>
                        );
                    } else if (estado === 'aceptado' || estado === 'rechazado') {
                        return (
                            <div>
                               Sin acciones
                            </div>
                        );
                    } else {
                        return null;
                    }
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 2 },
        },
        useSortBy,
        usePagination
    );

    return (
        <>
            <div className={styles.tableWrapper}>
                <table {...getTableProps()} className={styles.table}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className={styles.th}
                                    >
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className={styles.tr}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className={styles.td}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Controles de paginación */}
            <div className={styles.pagination}>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'} Anterior
                </button>
                <span>
                    Página{' '}
                    <strong>
                        {pageIndex + 1} de {pageOptions.length}
                    </strong>{' '}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Siguiente {'>'}
                </button>
            </div>
        </>
    );
};

export default TableComponent;
