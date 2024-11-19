import React from 'react';
import styles from './footer.module.css';
import logo from '../../../assets/patagon-logo-color.png';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.leftSection}>
                <h1 className={styles.title}>PATAGÓN</h1>
                <div className={styles.contact}>
                    <div>
                        <i className={`fas fa-envelope ${styles.icon}`}></i>
                        <span>Contacto</span>
                        <a href="mailto:patagon@uach.cl">patagon@uach.cl</a>
                    </div>
                    <div>
                        <i className={`fas fa-globe ${styles.icon}`}></i>
                        <span>WebSite</span>
                        <a href="mailto:patagon@uach.cl">patagon@uach.cl</a>
                    </div>
                    <div>
                        <i className={`fas fa-globe ${styles.icon}`}></i>
                        <span>WebSite</span>
                        <a href="mailto:patagon@uach.cl">patagon@uach.cl</a>
                    </div>
                </div>
            </div>
            <div className={styles.footerContent}>
                <div className={styles.divider}></div>
                <div className={styles.rightSection}>
                    <div className={styles.logoContainer}>
                        <img src={logo} alt="Logo Patagón" className={styles.logo} />
                    </div>
                    <p className={styles.copyright}>Todos los derechos reservados 2024©</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
