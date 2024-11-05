import { useState } from 'react';
import * as XLSX from 'xlsx';

const useExportToExcel = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const exportToExcel = async (endpoint, fileName) => {
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }

      const data = await response.json();

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
    } finally {
      setLoading(false);
    }
  };

  return { exportToExcel, loading };
};

export default useExportToExcel;
