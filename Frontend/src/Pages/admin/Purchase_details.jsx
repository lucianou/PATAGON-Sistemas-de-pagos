import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles1 from '../../styles/DashboardGeneral.module.css'; // Para el dashboard
import styles from '../../styles/Purchase.module.css'; // Los nuevos estilos para la compra
import MenuDashboard from '../../../public/Components/menuDashboard/menuDashboard';
import logo from '../../assets/SoloLogo_Patagon.png';

const Purchase_details = () => {
    const location = useLocation();
    const { nombre, tiempo, detalles, precio, ram } = location.state;
    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        console.log("Términos aceptados:", e.target.checked); // Depuración
    };

    const handleBuyClick = () => {

        if (!isChecked) {
            alert('Debes aceptar los términos y condiciones antes de continuar.');
            return;
        }
        // Lógica para comprar ahora
    };

    return (
        <div className={styles1.dashboardContainer}>
            <MenuDashboard toggleMenu={() => setIsOpen(!isOpen)} isOpen={isOpen} />
            <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`}>
                <div className={styles1.header}>
                    <div className={styles1.titleLogo}>
                        <img src={logo} className={styles1.menuIcon} alt="Logo" />
                        <h1>Detalles de compra</h1>
                    </div>
                </div>

                <div className={styles.purchaseContainer}>
                    <div className={styles.purchaseDetails}>
                        <h2>{nombre}</h2>
                        <p>Tiempo: {tiempo}</p>
                        <p>Precio: ${precio}</p>
                        <p>Detalles: {detalles}</p>
                        <p>RAM: {ram}</p>
                        <p className={styles.condiciones}>Sistemas de arriendos Patagón ofrece un sistema basado en la venta de bolsas de tiempo para el uso de los recursos de un servidor. Cada bolsa de tiempo tiene un costo específico y permite al usuario acceder a servicios de cómputo por un período determinado. A medida que el usuario utiliza estos recursos, el tiempo disponible en la bolsa se va descontando proporcionalmente.</p>
                    </div>


                    <div className={styles.purchaseSummary}>
                        <h3>Resumen</h3>
                        <div className={styles.summaryRow}>
                            <p>Artículos:</p>
                            <p>1</p>
                        </div>
                        <div className={styles.summaryRow}>
                            <p>Costo:</p>
                            <p>$0.00</p>
                        </div>
                        <div className={styles.totalPrice}>
                            <p>Total: ${precio}</p>
                        </div>

                        {/* Checkbox para aceptar los términos */}
                        <div className={styles.termsContainer}>
                            <input
                                type="checkbox"
                                id="termsCheckbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="termsCheckbox">Acepto los términos y condiciones</label>
                        </div>
                        <button
                            className={styles.buyButton}
                            onClick={handleBuyClick}
                        >
                            Comprar ahora
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Purchase_details;
