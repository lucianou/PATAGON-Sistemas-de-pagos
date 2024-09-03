

export const getPatagonData = (req, res) => {
    try {
        console.log("Patagon");
        res.status(200).send("patagon"); 
    } catch (error) {
        console.error("Error:", error);  
        res.status(500).send("Internal Server Error");  
    }
};


export const getSolicitudes = (req, res) => {
    try{
        console.log("solicitues usuarios");
        res.status(200).send("Solicitudes de usuarios");
    }
    catch (error) {
        console.error("Error", error),
        res.status(500).send("Error de solicitud");
    }
};


// Manejo de solicitudes entrantes (POST)
export const addRequest = (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { email, name } = req.body;

        // Valida los datos recibidos
        if (!email || !name) {
            return res.status(400).send("Faltan datos requeridos: correo o nombre");
        }

        console.log("Solicitud recibida:", { email, name });
        res.status(200).send("Solicitud de usuario recibida");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error de solicitud");
    }
};
