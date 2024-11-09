import React, { useState } from 'react';
import styles from '../../styles/client/compras.module.css';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import useDashboardPurchaseHistory from '../../Hooks/useDashboardPurchaseHistory';

const ITEMS_PER_PAGE = 10;

const HistorialCompras = () => {
  const { data, loading, error } = useDashboardPurchaseHistory();
  const [currentPage, setCurrentPage] = useState(1);

 
  const totalPages = data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = data ? data.slice(startIndex, endIndex) : [];


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles['historial-container']}>
        <h1 className={styles['historial-title']}>Historial de compras</h1>
        {loading && <p>Cargando...</p>}
        {error && <p>Error al cargar los datos</p>}
        
        {!loading && !error && (
          <div className={styles['table-container']}>
            <div className={styles['table-header']}>
              <div>Orden de compra</div>
              <div>Método de Pago</div>
              <div>Fecha de compra</div>
              <div>Valor</div>
            </div>
            {currentItems.map((compra) => (
              <div className={styles['table-row']} key={compra.order_id}>
                <div className={`${styles['table-cell']} ${styles['id-cell']}`}>{compra.order_id}</div>
                <div className={styles['table-cell']}>{compra.payment_method}</div>
                <div className={styles['table-cell']}>{new Date(compra.created_at).toLocaleDateString()}</div>
                <div className={styles['table-cell']}>${compra.amount}</div>
              </div>
            ))}
          </div>
        )}

        {/* Controles de paginación */}
        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default HistorialCompras;
