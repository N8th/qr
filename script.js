function domReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

domReady(function () {
  let htmlScanner = new Html5QrcodeScanner("my-qr-reader", {
    fps: 10,
    qrbox: 250,
  });
  htmlScanner.render(onScanSuccess);

  document.getElementById("addButton").addEventListener("click", addToTable);

  setInterval(fetchAndUpdateTable, 5000);
});

function onScanSuccess(decodedText, decodedResult) {
  document.getElementById("qrId").value = decodedText;
}

function addToTable() {
  var qrId = document.getElementById("qrId").value;
  var partNumber = document.getElementById("partNumber").value;
  var serialNumber = document.getElementById("serialNumber").value;
  var name = document.getElementById("name").value;
  var lastOwner = document.getElementById("lastOwner").value;
  var location = document.getElementById("location").value;
  var quantity = document.getElementById("quantity").value;
  var condition = document.getElementById("condition").value;
  var price = document.getElementById("price").value;
  var category = document.getElementById("category").value;
  var purchaseDate = document.getElementById("purchaseDate").value;
  var warrantyExpiry = document.getElementById("warrantyExpiry").value;
  var notes = document.getElementById("notes").value;

  // Clear input fields after adding
  document.getElementById("qrId").value = "";
  document.getElementById("partNumber").value = "";
  document.getElementById("serialNumber").value = "";
  document.getElementById("name").value = "";
  // Clear additional fields
  document.getElementById("lastOwner").value = "";
  document.getElementById("location").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("condition").value = "";
  document.getElementById("price").value = "";
  document.getElementById("category").value = "";
  document.getElementById("purchaseDate").value = "";
  document.getElementById("warrantyExpiry").value = "";
  document.getElementById("notes").value = "";

  fetch("http://localhost:5500/addData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      qrId: qrId,
      partNumber: partNumber,
      serialNumber: serialNumber,
      name: name,
      lastOwner: lastOwner,
      location: location,
      quantity: quantity,
      condition: condition,
      price: price,
      category: category,
      purchaseDate: purchaseDate,
      warrantyExpiry: warrantyExpiry,
      notes: notes,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      console.log("Data added successfully");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function fetchAndUpdateTable() {
  fetch("http://localhost:5500/getData")
    .then((response) => response.json())
    .then((data) => {
      updateTable(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function updateTable(data) {
  const table = document.getElementById("myTable");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  data.forEach((item) => {
    const row = table.insertRow();
    row.insertCell(0).innerHTML = item.qrId;
    row.insertCell(1).innerHTML = item.partNumber;
    row.insertCell(2).innerHTML = item.serialNumber;
    row.insertCell(3).innerHTML = item.name;
    row.insertCell(4).innerHTML = item.lastOwner;
    row.insertCell(5).innerHTML = item.location;
    row.insertCell(6).innerHTML = item.quantity;
    row.insertCell(7).innerHTML = item.condition;
    row.insertCell(8).innerHTML = item.price;
    row.insertCell(9).innerHTML = item.category;
    row.insertCell(10).innerHTML = item.purchaseDate;
    row.insertCell(11).innerHTML = item.warrantyExpiry;
    row.insertCell(12).innerHTML = item.notes;
  });
}
