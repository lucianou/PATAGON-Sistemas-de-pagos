import React from 'react';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import Footer from "../../../public/Components/FooterUser/Footer.jsx";
import styles from '../../styles/client/UsInfo.module.css';
import Nosotros from '../../../public/Components/Nosotros/nosotros';
const UsInfo = () => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Nosotros />
        <Footer />
      </div>
    </>
  );
}

export default UsInfo;
