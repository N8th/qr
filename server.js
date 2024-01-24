const cors = require("cors");

const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tableData = [];

app.post("/addData", (req, res) => {
  tableData.push(req.body);
  res.status(200).send("Data added successfully");
});

app.get("/getData", (req, res) => {
  res.status(200).json(tableData);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
