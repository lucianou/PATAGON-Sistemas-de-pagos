import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styles from '@clientStyles/compras.module.css';

const CartolaPDF = ({ compras }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Historial de Compras', 14, 20);
    doc.setFontSize(12);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableColumn = ['Orden de compra', 'Método de pago', 'Fecha de compra', 'Valor', 'Bolsa'];
    const tableRows = [];

    compras.forEach((compra) => {
      const compraData = [
        compra.order_id,
        compra.payment_method,
        new Date(compra.created_at).toLocaleDateString(),
        `$${compra.amount}`,
        compra.id_product,
      ];
      tableRows.push(compraData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    doc.save('historial_compras.pdf');
  };

  return (
    <button  onClick={generatePDF} className={styles.cartola}>
      <img src="/icons/pdf-icon.svg" alt="Descargar PDF" />
      Descargar Cartola de Compras
    </button>
  );
};

export default CartolaPDF;
