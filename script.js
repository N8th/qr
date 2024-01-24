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
  let scannedCodes = [];

  function onScanSuccess(decodedText, decodedResult) {
    // Log to console
    scannedCodes.push(decodedText);
    console.log(JSON.stringify(scannedCodes));

    // Update table
    var table = document.getElementById("scannedTable");
    var row = table.insertRow(-1); // -1 to add at the end of the table
    var cell1 = row.insertCell(0);
    cell1.innerHTML = decodedText;
  }

  let htmlScanner = new Html5QrcodeScanner("my-qr-reader", {
    fps: 10,
    qrbox: 250,
  });
  htmlScanner.render(onScanSuccess);
});

//
// HTML5-qrcode library methods:
//
// Html5QrcodeScanner: Initializes the QR code scanner.
// render(): Renders the scanner within a specified HTML element.
// onScanSuccess(decodeText, decodeResult): A callback function triggered upon successful QR code scanning, displaying decoded text in an alert.
// fps: Sets the frames per second for video capture.
// qrbos: Sets the QR code detection boundary size.
//
