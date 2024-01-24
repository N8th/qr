const cors = require("cors");

const express = require("express");
const app = express();
const port = 3000;

// To handle JSON and URL-encoded data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example data storage
let tableData = [];

// Endpoint to receive data from the HTML/JS frontend
app.post("/addData", (req, res) => {
  tableData.push(req.body);
  res.status(200).send("Data added successfully");
});

// Endpoint to retrieve data for Postman
app.get("/getData", (req, res) => {
  res.status(200).json(tableData);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
