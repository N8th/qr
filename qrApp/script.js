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

  // debugging remove this
  document
    .getElementById("deleteAllButton")
    .addEventListener("click", clearAllData);
  // debugging remove this

  // debugging remove this
  document
    .getElementById("addRandomButton")
    .addEventListener("click", addRandomEntry);
  // debugging remove this

  setInterval(fetchAndUpdateTable, 1000);
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

  document.getElementById("qrId").value = "";
  document.getElementById("partNumber").value = "";
  document.getElementById("serialNumber").value = "";
  document.getElementById("name").value = "";
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

// debugging

// delete all data
function clearAllData() {
  fetch("http://localhost:5500/clearData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

domReady(function () {
  document
    .getElementById("addRandomButton")
    .addEventListener("click", addRandomEntry);
});

function addRandomEntry() {
  const randomProduct = generateProduct();
  fetch("http://localhost:5500/addData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(randomProduct),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(startYear, endYear) {
  const startDate = new Date(startYear, 0, 1);
  const endDate = new Date(endYear, 11, 31);
  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function generateSerialNumber(prefix) {
  return prefix + Math.random().toString().slice(2, 8);
}

function generateProduct() {
  const firstNames = [
    "John",
    "Jane",
    "Alice",
    "Bob",
    "Carol",
    "Dave",
    "Eve",
    "Frank",
    "Grace",
    "Hank",
    "Ivy",
    "Jack",
    "Karen",
    "Leo",
    "Mia",
    "Nick",
    "Olivia",
    "Paul",
    "Quincy",
    "Rose",
    "Sam",
    "Tina",
    "Uma",
    "Vince",
    "Wendy",
    "Xander",
    "Yara",
    "Zane",
    "Ava",
    "Ethan",
    "Isabella",
    "Joshua",
    "Megan",
    "Nathan",
    "Sophia",
    "Tyler",
    "Victoria",
    "William",
    "Zoe",
    "Brian",
    "Chloe",
    "Dylan",
    "Ella",
    "Felix",
    "Gina",
    "Harvey",
    "Iris",
    "Justin",
    "Kelsey",
    "Liam",
    "Molly",
    "Nolan",
    "Oliver",
    "Penny",
    "Quinn",
    "Riley",
    "Stella",
    "Travis",
    "Ulysses",
    "Vanessa",
    "Walter",
    "Xenia",
    "Yvonne",
    "Zach",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Taylor",
    "Anderson",
    "Harris",
    "Clark",
    "Lewis",
    "Robinson",
    "Walker",
    "Martinez",
    "Davis",
    "Garcia",
    "Rodriguez",
    "Wilson",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Perez",
    "Young",
    "Hall",
    "Allen",
    "Sanchez",
    "Wright",
    "King",
    "Scott",
    "Green",
    "Baker",
    "Adams",
    "Nelson",
    "Hill",
    "Ramirez",
    "Campbell",
    "Mitchell",
    "Roberts",
    "Carter",
    "Phillips",
    "Evans",
    "Turner",
    "Torres",
    "Parker",
    "Collins",
    "Edwards",
    "Stewart",
    "Flores",
    "Morris",
    "Nguyen",
    "Murphy",
    "Rivera",
  ];
  const brands = [
    "Lenovo",
    "HP",
    "Dell",
    "Acer",
    "Asus",
    "Samsung",
    "Toshiba",
    "Microsoft",
    "Apple",
    "Sony",
    "LG",
    "Panasonic",
    "Huawei",
    "Xiaomi",
    "Google",
    "Alienware",
    "Razer",
    "MSI",
    "Intel",
    "AMD",
    "Nvidia",
    "Cisco",
    "Brother",
    "Epson",
    "Sharp",
    "Fujitsu",
    "Lexmark",
    "Ricoh",
    "Kyocera",
    "Kodak",
  ];
  const types = [
    "desktop",
    "laptop",
    "printer",
    "server",
    "tablet",
    "workstation",
    "monitor",
    "router",
    "switch",
    "access point",
    "NAS",
    "keyboard",
    "mouse",
    "webcam",
    "headset",
    "speaker",
    "microphone",
    "VR headset",
    "gaming console",
    "smartphone",
    "smartwatch",
    "drone",
    "projector",
    "scanner",
    "graphics card",
    "motherboard",
    "CPU",
    "PSU",
    "RAM",
    "SSD",
  ];
  const conditions = [
    "New",
    "Excellent",
    "Good",
    "Fair",
    "Poor",
    "Used",
    "Refurbished",
    "Like New",
    "Very Good",
    "Mint",
    "Slightly Used",
    "Well Used",
    "Damaged",
    "Functional",
    "Non-functional",
    "For Parts",
    "Vintage",
    "Collector's Item",
    "Rare",
    "Limited Edition",
    "Custom",
    "Modified",
    "Upgraded",
    "Downgraded",
    "Overclocked",
    "Undervolted",
    "Water Damaged",
    "Burn-In",
  ];
  const notes = [
    "",
    "Software issues",
    "Dents",
    "Scratches",
    "Battery problems",
    "Missing cables",
    "Updated OS",
    "Warranty included",
    "No charger",
    "No box",
    "Custom firmware",
    "Rooted",
    "Jailbroken",
    "Unlocked",
    "Locked to carrier",
    "International version",
    "Regional lock",
    "Bulk packaging",
    "Retail packaging",
    "Demo unit",
    "Returned item",
    "Discontinued model",
    "Overstock",
    "Clearance",
    "Sale item",
    "Promotional item",
    "Gift",
    "Sample",
    "Prototype",
    "Recalled",
  ];

  return {
    qrId: "QR" + Math.random().toString().slice(2, 6),
    partNumber:
      getRandomElement(types) + "-" + Math.random().toString(36).slice(2, 5),
    serialNumber: generateSerialNumber(getRandomElement(brands).charAt(0)),
    name:
      getRandomElement(brands) +
      " " +
      getRandomElement(types).charAt(0).toUpperCase() +
      getRandomElement(types).slice(1) +
      " " +
      Math.floor(Math.random() * 100),
    lastOwner: getRandomElement(firstNames) + " " + getRandomElement(lastNames),
    location: "C Floor " + Math.floor(Math.random() * 5 + 1),
    quantity: Math.floor(Math.random() * 5 + 1),
    condition: getRandomElement(conditions),
    price:
      Math.floor(Math.random() * 701) +
      300 +
      "." +
      Math.floor(Math.random() * 100),

    category: getRandomElement(types),
    purchaseDate: formatDate(getRandomDate(2018, 2022)),
    warrantyExpiry: formatDate(getRandomDate(2023, 2025)),
    notes: getRandomElement(notes),
  };
}

function addRandomEntry() {
  const randomProduct = generateProduct();
  fetch("http://localhost:5500/addMultipleData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(randomProduct),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
