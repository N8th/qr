const express = require("express");
const cors = require("cors");
const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

let tableData = []; // This will store our table data

app.get("/getData", (req, res) => {
  console.log("Data requested, current storage:", tableData); // Debug log
  res.json(tableData);
});

app.post("/addData", (req, res) => {
  console.log("Received data:", req.body); // Log the received data
  tableData.push(req.body);
  console.log("Current storage after adding:", tableData); // Log the storage after adding
  res.status(201).send("Data added successfully");
});

app.post("/addMultipleData", (req, res) => {
  // Check if the request body is an array
  if (Array.isArray(req.body)) {
    // Add each entry in the array to tableData
    req.body.forEach((entry) => {
      tableData.push(entry);
    });
    res.status(201).send("Multiple data added successfully");
  } else {
    // If it's a single object, add it directly
    tableData.push(req.body);
    res.status(201).send("Single data added successfully");
  }
});

app.put("/updateData", (req, res) => {
  const { index, data } = req.body;
  if (index >= 0 && index < tableData.length) {
    tableData[index] = data;
    res.send("Data updated successfully");
  } else {
    res.status(404).send("Data not found");
  }
});

app.delete("/deleteData", (req, res) => {
  const { index } = req.body;
  if (index >= 0 && index < tableData.length) {
    tableData.splice(index, 1);
    res.send("Data deleted successfully");
  } else {
    res.status(404).send("Data not found");
  }
});

app.post("/clearData", (req, res) => {
  tableData = []; // Reset the data array to empty
  res.send("All data cleared");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
