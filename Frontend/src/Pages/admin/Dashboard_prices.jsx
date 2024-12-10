import React, { useState, useEffect } from "react";
import MenuDashboard from "@components/menuDashboard/menuDashboard";
import styles from "@adminStyles/DashboardPrices.module.css";
import styles1 from "@styles/DashboardGeneral.module.css";
import useExportToExcel from '@hooks/exportExcelRequests';
import useDashboardStats from "@hooks/useDashboardStatsProfit";
import logo from '../../assets/SoloLogo_Patagon.png';

const Dashboard_prices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const { exportToExcel } = useExportToExcel();
  const { data } = useDashboardStats();
  const IP = import.meta.env.VITE_SERVERIP;

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${IP}/get-products`);
        const result = await response.json();
        setProductList(result);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [IP]);

  // Handle exporting to Excel
  const handleExport = () => {
    exportToExcel(
      `${IP}/get-products`, 
      'Lista_de_bolsas'
    );
  };

  // Handle adding a new product (empty function for now)
  const handleAddProduct = () => {
    console.log("Agregar nueva bolsa (función vacía por ahora)");
    // Aquí irá la lógica para agregar una bolsa
  };

  // Handle deleting a product
  const handleDeleteProduct = (index) => {
    const updatedProducts = productList.filter((_, idx) => idx !== index);
    setProductList(updatedProducts);
  };

  return (
    <div className={styles1.dashboardContainer} id={styles.black}>
      <MenuDashboard toggleMenu={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <main className={`${styles1.content} ${isOpen ? styles1.open : ""}`} id={styles.main}>
        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon}/>
            <h1>Dashboard Precios</h1>
          </div>
        </div>
        
        <div className={styles.CardContainer}>
          <div className={styles.CardGanancias}>
            <div className={styles.CardGananciasTitle}>
              <h2>Lista de Productos</h2>
              <p>Precios y valores de las bolsas</p>
            </div>
            <div className={styles.exportExcel}>
              <button className={styles.excel} onClick={handleExport}>
                <img src="/icons/excel-icon.svg" alt="Exportar" />
                <span>Exportar detalles</span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.contenedor}>
          <div className={styles.topProducts}>
            {/* Botón para agregar una nueva bolsa */}
            <button className={styles.addProduct} onClick={handleAddProduct}>
              Agregar Bolsa
            </button>
            <h2>Productos</h2>
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th>ID Producto</th>
                  <th>Nombre Producto</th>
                  <th>Precio</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {productList?.length > 0 ? (
                  productList.map((product, index) => (
                    <tr key={index}>
                      <td>{product.id_product}</td>
                      <td>{product.product_name}</td>
                      <td>{product.price}</td> {/* Mostrar el precio como texto */}
                      <td>
                        {/* Botón para borrar producto */}
                        <button onClick={() => handleDeleteProduct(index)}>
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No hay productos disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard_prices;
