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
