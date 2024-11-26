import React from 'react';
import styles1 from '../../styles/client/userGeneral.module.css';
import NavBar from "../../../public/Components/navBarClient/navBarClient";
import Footer from "../../../public/Components/FooterUser/Footer.jsx";
import DocsUser from '../../../public/Components/docsUser/docsUser.jsx';

const Docs = ({ }) => {
  return (
    <>
      <div className={styles1.container}>
        <NavBar />
        <DocsUser />
        <Footer />
      </div>
    </>
  )
}

export default Docs;