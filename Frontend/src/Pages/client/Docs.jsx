import React from 'react';
import styles1 from '@clientStyles/userGeneral.module.css';
import NavBar from "@components/navBarClient/navBarClient";
import Footer from "@components/FooterUser/Footer.jsx";
import DocsUser from '@components/docsUser/docsUser.jsx';

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