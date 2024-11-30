import React from 'react';
import NavBar from "@components/navBarClient/navBarClient";
import Footer from "@components/FooterUser/Footer.jsx";
import Nosotros from '@components/Nosotros/nosotros';
import styles from '@clientStyles/UsInfo.module.css';
import styles1 from '@clientStyles/userGeneral.module.css';
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
