import React from 'react';
import styles from '../../styles/client/Docs.module.css';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import Footer from "../../../public/Components/FooterUser/Footer.jsx";
import DocsUser from '../../../public/Components/docsUser/docsUser.jsx';

const Docs = ({ }) => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <DocsUser />
        <Footer />
      </div>
    </>
  )
}

export default Docs;