import React from 'react';
import styles from '../../styles/client/compras.module.css';
import NavBar from "../../../public/Components/navBarClient/navBarClient";

const compras = [
  { id: 1, tipo: 'Bolsa 1', fecha: '01-01-2024', valor: '25$' },
  { id: 2, tipo: 'Bolsa 1', fecha: '01-01-2024', valor: '25$' },
  { id: 3, tipo: 'Bolsa 1', fecha: '01-01-2024', valor: '25$' },
  { id: 4, tipo: 'Bolsa 1', fecha: '01-01-2024', valor: '25$' },
  { id: 5, tipo: 'Bolsa 1', fecha: '01-01-2024', valor: '25$' },
  { id: 5, tipo: 'Bolsa 1', fecha: '01-01-2024', valor: '25$' },
  { id: 5, tipo: 'Bolsa 1', fecha: '01-01-2024', valor: '25$' },
  { id: 5, tipo: 'Bolsa 1', fecha: '01-01-2024', valor: '25$' },
  { id: 5, tipo: 'Bolsa 1', fecha: '01-01-2024', valor: '25$' },
  { id: 5, tipo: 'Bolsa 1', fecha: '01-01-2024', valor: '25$' },
  { id: 5, tipo: 'Bolsa 1', fecha: '01-01-2024', valor: '25$' },
];

const HistorialCompras = () => {
  return (
    <div className={styles['historial-container']}>
    <NavBar />
      <h1 className={styles['historial-title']}>Historial de compras</h1>
      <div className={styles['table-container']}>
        <div className={styles['table-header']}>
          <div>ID</div>
          <div>Tipo de bolsa</div>
          <div>Fecha de compra</div>
          <div>Valor</div>
        </div>
        {compras.map((compra) => (
          <div className={styles['table-row']} key={compra.id}>
            <div className={`${styles['table-cell']} ${styles['id-cell']}`}>{compra.id}</div>
            <div className={styles['table-cell']}>{compra.tipo}</div>
            <div className={styles['table-cell']}>{compra.fecha}</div>
            <div className={styles['table-cell']}>{compra.valor}</div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>1-1</div>
    </div>
  );
};

export default HistorialCompras;
