import React, { useState } from 'react';
import styles from '@clientStyles/UseRequest.module.css';
import NavBar from "@components/navBarClient/navBarClient";
import { toast} from 'sonner';



const UseRequest = () => {
  const IP = import.meta.env.VITE_SERVERIP;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    document: null,
    sshKey: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.institution) {
      alert("Por favor, completa los campos obligatorios (Nombre, Email, Institución).");
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('institution', formData.institution);

    if (formData.document) {
      data.append('upload-application', formData.document);
    }
    if (formData.sshKey) {
      data.append('upload-public-key', formData.sshKey);
    }

    try {
      const response = await fetch(`${IP}/addRequest`, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        toast.success('Solicitud enviada correctamente');
        setFormData({
          name: '',
          email: '',
          institution: '',
          document: null,
          sshKey: null,
        });
        document.getElementById('terms').checked = false; // Reinicia el checkbox
      } else {
        const errorMessage = await response.text();
        toast.error(`Error al enviar la solicitud: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      toast.error("Error al enviar la solicitud");
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.formBox}>
          <h1 className={styles.title}>Solicitud para usar Patagón</h1>
          <p className={styles.description}>
            El Patagón puede ser usado para impulsar la investigación científica y tecnológica.
            Actualmente, los perfiles de uso permitidos son:
            <ul>
              <li>Investigadores UACh o de otras Instituciones de Investigación de Chile.</li>
              <li>Estudiantes de Postgrado UACh.</li>
              <li>Memoristas de Pregrado UACh.</li>
            </ul>
            <strong>Nota:</strong> Por ahora, los estudiantes de otras universidades deben usar la cuenta de su profesor responsable.
          </p>
          <p>
            Para hacer la solicitud, primero debe leer, completar y firmar 
            <a href="#" className={styles.link}> documento de solicitud</a>. Luego, completar el formulario de más abajo y adjuntar su documento firmado en formato PDF como también su llave pública SSH (en caso de no tener una, puede seguir nuestro 
            <a href="#" className={styles.link}> tutorial de generación de llave pública SSH</a>).
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="name">Nombre *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nombre y Apellido"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="institution">Institución *</label>
              <input
                type="text"
                id="institution"
                name="institution"
                placeholder="Nombre de institución"
                value={formData.institution}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="document">Documento de Solicitud en formato PDF, completo y firmado.</label>
              <input
                type="file"
                id="document"
                name="document"
                accept=".pdf"
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="sshKey">Llave publica SSH (por ejemplo: id_rsa.pub)</label>
              <input
                type="file"
                id="sshKey"
                name="sshKey"
                accept=".pub"
                onChange={handleChange}
              />
            </div>
            <div className={styles.checkboxField}>
              <input type="checkbox" id="terms" name="terms" required />
              <label htmlFor="terms">
                Acepto los términos y condiciones del documento de solicitud.
              </label>
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.submitButton}>Enviar</button>
              <button type="reset" className={styles.cancelButton}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UseRequest;
