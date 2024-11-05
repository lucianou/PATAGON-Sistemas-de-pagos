import React from 'react';
import styles from '../../styles/client/Bolsas.module.css';
import NavBar from "../../../public/Components/navBarClient/navBarClient";

const Bolsas = ({}) => {
  return (
  <div className= {styles.container}>
    <NavBar></NavBar>
    <section className= {styles.section1}>
      {/* aquí dejen las bolsaas cabroooooooos */}
      <h1>bolsas</h1>
    </section>
    <section className={styles.section2}></section>
  </div>
  )
}

export default Bolsas;