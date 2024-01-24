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
});

function onScanSuccess(decodedText, decodedResult) {
  document.getElementById("qrId").value = decodedText; // Set QR ID
}

function addToTable() {
  var qrId = document.getElementById("qrId").value;
  var partNumber = document.getElementById("partNumber").value;
  var serialNumber = document.getElementById("serialNumber").value;
  var name = document.getElementById("name").value;

  var table = document.getElementById("myTable");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  cell1.innerHTML = qrId;
  cell2.innerHTML = partNumber;
  cell3.innerHTML = serialNumber;
  cell4.innerHTML = name;

  // Clear the input fields after adding
  document.getElementById("qrId").value = "";
  document.getElementById("partNumber").value = "";
  document.getElementById("serialNumber").value = "";
  document.getElementById("name").value = "";
  fetch("/addData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      qrId: qrId,
      partNumber: partNumber,
      serialNumber: serialNumber,
      name: name,
    }),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error:", error);
    });
}

//
// HTML5-qrcode library methods:
//
// Html5QrcodeScanner: Initializes the QR code scanner.
// render(): Renders the scanner within a specified HTML element.
// onScanSuccess(decodeText, decodeResult): A callback function triggered upon successful QR code scanning, displaying decoded text in an alert.
// fps: Sets the frames per second for video capture.
// qrbos: Sets the QR code detection boundary size.
//

// Install CORS by running npm install cors.
// Add the following to your server.js:
// javascript
// Copy code
// This setup provides a basic outline to get you started with connecting your HTML/JavaScript frontend to a backend server and using Postman to interact with it. Depending on your requirements, you might need to add more complexity, like database integration, authentication, or more sophisticated data handling.
