import React from 'react';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import Footer from "../../../public/Components/FooterUser/Footer.jsx";
import styles from '../../styles/client/UsInfo.module.css';
import styles1 from '../../styles/client/userGeneral.module.css';
import Nosotros from '../../../public/Components/Nosotros/nosotros';
const UsInfo = () => {
  return (
    <>
      <div className={styles1.container} id={styles.container}>
        <NavBar />
        <Nosotros />
        <Footer />
      </div>
    </>
  );
}

export default UsInfo;
