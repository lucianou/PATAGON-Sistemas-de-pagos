import React, { useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../assets/patagon-logo-color.png";

const Boleta = ({ data, onComplete }) => {
  useEffect(() => {
    const generatePDF = () => {
      const doc = new jsPDF();

      // Agregar el logo
      
      doc.addImage(logo, "PNG", 10, 10, 30, 30);

      // Título de la empresa
      doc.setFontSize(18);
      doc.text("PATAGÓN", 50, 20);

      // Dirección de la empresa
      doc.setFontSize(10);
      doc.text("Rudloff, Edificio 10K", 50, 25);
      doc.text("Valdivia, Región de los Ríos", 50, 30);

     // Información del cliente y detalles de la factura
     doc.setFontSize(12);
     doc.text("Boleta", 105, 50, { align: "center" });
     doc.text(`N° Boleta: ${data.order_id}`, 20, 60);  
     doc.text(`Fecha: ${new Date(data.created_at).toLocaleDateString()}`, 20, 65); 
     doc.text(`Saldo adeudado $${data.amount} USD`, 20, 70);  
     doc.text(`${data.user_email}`, 150, 60); 
    //  doc.text("Address: 1234 Main Street", 150, 65); 
    //  doc.text("San Francisco, CA, US", 150, 70);

    
     doc.autoTable({
       startY: 90,
       head: [["Item", "Método de pago", "Costo", "Cantidad", "Horas", "Total"]],
       body: [
         ["bolsa"+" "+ data.id_product, data.payment_method, data.amount, "1","20", data.payment_method],
       ],
       theme: "grid",
     });

     // Subtotales y total
     const finalY = doc.lastAutoTable.finalY + 10;
     doc.text(`Subtotal: $${data.amount} USD`, 150, finalY);  
    //  doc.text(`Paid To Date: $0.00`, 150, finalY + 5);
    //  doc.text(`Balance Due: $${data.amount}`, 150, finalY + 10);

      // Pie de página
      doc.setFontSize(10);
      doc.text(
        "(*) Este documento es generado automáticamente por el sistema y no reemplaza la documentación oficial enviada por correo.",
        105,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );

      const pdfBlob = doc.output("blob");
      const pdfURL = URL.createObjectURL(pdfBlob);
      window.open(pdfURL, "_blank");

      if (onComplete) onComplete();
    };

    generatePDF();
  }, [data, onComplete]);

  return null; 
};

export default Boleta;
