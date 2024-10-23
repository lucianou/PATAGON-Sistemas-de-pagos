import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import styles from '../Table/Table.module.css';

const TableComponent = ({ columns, data, actionsRenderer }) => {
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
            initialState: { pageIndex: 0, pageSize: 10 },
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
                                    {actionsRenderer && (
                                        <td className={styles.actions}>
                                            {actionsRenderer(row.original)}
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

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
