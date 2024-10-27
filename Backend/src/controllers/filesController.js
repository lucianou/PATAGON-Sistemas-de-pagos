import Requests from "../models/requests.js";

//obtener el PDF de una solicitud
export async function getPdf(req, res) {
  const { id } = req.params;

  try {
    const request = await Requests.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    const pdfData = request.documento_pdf;
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfData);
  } catch (error) {
    console.error('Error al obtener el PDF:', error);
    res.status(500).json({ error: 'Error al obtener el PDF' });
  }
}

// obtener el PUB de una solicitud
export async function getPub(req, res) {
  const { id } = req.params;

  try {
    const request = await Requests.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    const pubData = request.documento_pub;
    res.setHeader('Content-Type', 'application/vnd.ms-publisher'); // MIME type para archivos .pub
    res.send(pubData);
  } catch (error) {
    console.error('Error al obtener el archivo .pub:', error);
    res.status(500).json({ error: 'Error al obtener el archivo .pub' });
  }
}
