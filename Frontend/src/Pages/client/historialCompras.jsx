import React, { useState } from 'react';
import styles from '../../styles/client/compras.module.css';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import useDashboardPurchaseHistory from '../../Hooks/useDashboardPurchaseHistory';
import CartolaPDF from '../../../public/Components/CartolaPDF/Cartola';
import { BsFileEarmarkRuled } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import Boleta from '../../../public/Components/CartolaPDF/Boleta';


const ITEMS_PER_PAGE = 10;

const HistorialCompras = () => {
  const { data, loading, error } = useDashboardPurchaseHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });
  const [selectedDetails, setSelectedDetails] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [boletaData, setBoletaData] = useState(null);

  const sortedData = React.useMemo(() => {
    if (!data) return [];
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const totalPages = sortedData ? Math.ceil(sortedData.length / ITEMS_PER_PAGE) : 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = sortedData ? sortedData.slice(startIndex, endIndex) : [];

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

  const handleDownload = (details) => {
    setBoletaData(details); 
  };

  const handleComplete = () => {
    setBoletaData(null); 
  };

  const handleDetails = (details) => {
    setSelectedDetails(details);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDetails(null);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <>
      <NavBar />
      <div className={styles['historial-container']}>
        <h1 className={styles['historial-title']}>Historial de compras</h1>
        {loading && <div className={styles.spinner}></div>}
        {error && <p>Error al cargar los datos</p>}

        {!loading && !error && (
          <CartolaPDF className={styles.CartolaPDF} compras={data} />
        )}

        {!loading && !error && (
          <div className={styles['table-container']}>
            <div className={styles['table-header']}>
              <div onClick={() => requestSort('order_id')}>
                Orden de compra {getSortIndicator('order_id')}
              </div>
              <div onClick={() => requestSort('payment_method')}>
                Método de Pago {getSortIndicator('payment_method')}
              </div>
              <div onClick={() => requestSort('created_at')}>
                Fecha de compra {getSortIndicator('created_at')}
              </div>
              <div onClick={() => requestSort('amount')}>
                Valor {getSortIndicator('amount')}
              </div>
              <div onClick={() => requestSort('id_product')}>
                Bolsa {getSortIndicator('id_product')}
              </div>
              <div>
                Detalles
              </div>
            </div>
            {currentItems.map((compra) => (
              <div className={styles['table-row']} key={compra.order_id}>
                <div className={`${styles['table-cell']} ${styles['id-cell']}`}>{compra.order_id}</div>
                <div className={styles['table-cell']}>{compra.payment_method}</div>
                <div className={styles['table-cell']}>{new Date(compra.created_at).toLocaleDateString()}</div>
                <div className={styles['table-cell']}>${compra.amount}</div>
                <div className={styles['table-cell']}>{compra.id_product}</div>
                <div className={styles['table-cell']}>
                  <BsFileEarmarkRuled
                    title="Ver boleta"
                    onClick={() => handleDetails(compra)}
                    style={{ marginLeft: 20 }}
                    size={25}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

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

      {isModalOpen && selectedDetails && (
        <div className={styles.modal}>
          <div className={styles.headerModal}>
              <button onClick={closeModal} className={styles['close-button']}>X Cerrar detalles de la compra</button>
              <div className={styles.logo}>
                <img src="../../assets/patagon-logo-color.png" alt="Logo" />
              </div>
          </div>
          <div className={styles['modal-content']}>
            <h2>Se pagó el {new Date(selectedDetails.created_at).toLocaleDateString()}</h2>
            <h3>RESUMEN</h3>
            <hr />
            <div className={styles.info}>
              <p><strong>Para</strong> {selectedDetails.user_email}</p>
              <p><strong>De</strong> Sistemas de pagos Patagón</p>
              <p><strong>N° orden:</strong> {selectedDetails.order_id}</p>
            </div>
            <h3>PRODUCTO</h3>
            <hr />  
            <div className={styles.info}>
              <p><strong>Bolsa:</strong> {selectedDetails.id_product}</p>
              <p><strong>Tiempo:</strong> {selectedDetails.time} horas</p>
            </div>
            <h3>PAGO</h3>
            <hr />  
            <div className={styles.info}>
              <p><strong>Orden de compra:</strong> {selectedDetails.order_id}</p>
              <p><strong>Método de pago:</strong> {selectedDetails.payment_method}</p>
              <p><strong>Fecha:</strong> {new Date(selectedDetails.created_at).toLocaleString()}</p>
              <p><strong>Valor:</strong> ${selectedDetails.amount} USD</p>
            </div>
           
           <div className={styles.download}>
            <Boleta data={selectedDetails}/>
            <FaFileDownload size={20}> <Boleta data={selectedDetails}/></FaFileDownload>
           </div>
            
         
          </div>
          <div className={styles.footerModal}>
              <h3>¿Tienes alguna pregunta? </h3>
              <h3><a href='https://patagon.uach.cl/contacto'> Contáctanos</a></h3>
            </div>
        </div>
      )}
    </>
  );
};

export default HistorialCompras;
