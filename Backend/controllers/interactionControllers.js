export const getPatagonData = (req, res) => {
  try {
    console.log("Patagon");
    res.status(200).send("Patagón");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
