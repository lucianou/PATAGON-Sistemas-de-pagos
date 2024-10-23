import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles1 from '../styles/DashboardGeneral.module.css';
import styles from '../styles/Purchase.module.css';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard';
import logo from '../assets/SoloLogo_Patagon.png';
import useFetchBolsa from '../Hooks/bolsas';
import useCreateOrder from '../Hooks/useCreateOrder'; // Asegúrate de que la ruta sea correcta

const Purchase_details = () => {
    const { pathname } = useLocation();
    const id = pathname.split('/').pop(); 
    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const { bolsa } = useFetchBolsa(id);
    const { createOrder } = useCreateOrder(); // Obtén la función de creación de órdenes

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleBuyClick = async () => {
        if (!isChecked) {
            alert('Debes aceptar los términos y condiciones antes de continuar.');
            return;
        }

        const orderData = {
            monto: 1000, // Asigna el monto real de la bolsa
            ordenCompra: '12345',
            email: 'ferna.cast0607@gmail.com'
        };

        try {
            const { urlPago } = await createOrder(orderData); // Usa createOrder desde el hook
            if (urlPago) {
                window.location.href = urlPago; // Redirige al usuario a la URL de pago de Flow
            }
        } catch (err) {
            console.error('Error al procesar la compra:', err);
        }
    };

    if (!bolsa) {
        return <div>Cargando...</div>; // Puedes agregar un spinner o mensaje de carga
    }

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
                        <h2>{bolsa.nombre}</h2>
                        <p>Tiempo: {bolsa.tiempo}</p>
                        <p>Precio: ${bolsa.precio}</p>
                        <p>Detalles: {bolsa.detalles.join(', ')}</p>
                        <p>RAM: {bolsa.ram}</p>
                        <p className={styles.condiciones}>
                            Sistemas de arriendos Patagón ofrece un sistema basado en la venta de bolsas de tiempo para el uso de los recursos de un servidor. Cada bolsa de tiempo tiene un costo específico y permite al usuario acceder a servicios de cómputo por un período determinado. A medida que el usuario utiliza estos recursos, el tiempo disponible en la bolsa se va descontando proporcionalmente.
                        </p>
                    </div>

                    <div className={styles.purchaseSummary}>
                        <h3>Resumen</h3>
                        <div className={styles.summaryRow}>
                            <p>Artículos:</p>
                            <p>1</p>
                        </div>
                        <div className={styles.totalPrice}>
                            <p>Total: ${bolsa.precio}</p>
                        </div>

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
