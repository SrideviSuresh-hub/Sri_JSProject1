//open add record popup
function openPopup() {
  document.getElementById("popupcontent").style.display = "block";
  document.getElementById("mask").style.display = "block";
}

//open edit record popup
function editopenPopup() {
  document.getElementById("editpopupcontent").style.display = "block";
  document.getElementById("mask").style.display = "block";
}
//open view record popup
function viewPopup() {
  document.getElementById("viewpopupcontent").style.display = "block";
  document.getElementById("mask").style.display = "block";
}


//close add  and edit record popup
function closePopup() {
  document.getElementById("popupcontent").style.display = "none";
  document.getElementById("editpopupcontent").style.display = "none";
  document.getElementById("viewpopupcontent").style.display = "none";
  document.getElementById("mask").style.display = "none";
  reset();
}

//creation of array
let array = [
  {
    rentalId: 1,
    carModel: "maruthi",
    mfdYear: 2010,
    fuelType: "petrol",
    rentStartDate: "28-12-2024",
    rentEndDate: "31-12-2024",
    customerName: "sri",
    startPlace: "Cbpur",
    destinationPlace: "blore",
    isSinglePassenger: "Yes",
  },
  {
    rentalId:3,
    carModel: "maruthi",
    mfdYear: 2015,
    fuelType: "petrol",
    rentStartDate: "28-12-2024",
    rentEndDate: "29-12-2024",
    customerName: "sri",
    startPlace: "Cbpur",
    destinationPlace: "blore",
    isSinglePassenger: "Yes",
  },
];
storeData(array);
loadData();

// diplaying data in table
function loadData() {
  var tabletext = `<thead >
                <tr>
                    <th>Rental ID</th>
                    <th>Car Model</th>
                    <th>Mfd Year</th>
                    <th>Fuel Type</th>
                    <th>Rent Start Date</th>
                    <th>Rent End Date</th>
                    <th>Booked Customer Name</th>
                    <th>Start Place</th>
                    <th>Destination Place</th>
                    <th>IsSinglePassenger</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>`;

          
  array.forEach((index) => {
    tabletext +=
      `<tr><td>` +
      index.rentalId +
      `</td><td>` +
      index.carModel +
      `</td><td>` +
      index.mfdYear +
      `</td><td>` +
      index.fuelType +
      `</td><td>` +
      index.rentStartDate +
      `</td><td>` +
      index.rentEndDate +
      `</td><td id="tooltip" title="` +
      index.customerName +`">` +
      index.customerName +
      `</td><td id="tooltip" title="`+
      index.startPlace+`">` +
      index.startPlace +
      `</td><td id="tooltip" title="`+
      index.destinationPlace+`">` +
      index.destinationPlace +
      `</td><td>`+
      index.isSinglePassenger + 
      `</td><td>
                <button class="btn editbtn" onclick="editRecord(this)"><i class="fa fa-edit"></i></button>
                <button class="btn viewbtn" onclick="viewRecord(this)"><i class="fa fa-eye"></i></button>
                <button class="btn deletebtn" onclick="deleteRecord(this)"><i class="fa fa-trash"></i></button></td></tr>`;
                
  });
  tabletext += `</tbody>`;


  //  storing data into local storage
  localStorage.setItem("Sri_table", JSON.stringify(array));

  // loading data
  document.getElementById("table_data").innerHTML = tabletext;
}

// storing data
function storeData(x) {
  let keyName = localStorage.key("Sri_table");

  if (keyName) {
    const str = localStorage.getItem(keyName);
    array = JSON.parse(str);
  } else {
    let str = JSON.stringify(array);
    localStorage.setItem("Sri_table", str);
  }
}

// add operation
function addRecord(event) {
  event.preventDefault();
  var data = {};
  data["rentalId"] = document.getElementById("rentalId").value;
  data["carModel"] = document.getElementById("carModel").value;
  data["mfdYear"] = document.getElementById("mfdYear").value;
  data["fuelType"] = document.getElementById("fuelType").value;
  data["rentStartDate"] = document.getElementById("rentStartDate").value;
  data["rentEndDate"] = document.getElementById("rentEndDate").value;
  data["customerName"] = document.getElementById("customerName").value;
  data["startPlace"] = document.getElementById("startPlace").value;
  data["destinationPlace"] = document.getElementById("destinationPlace").value;
  data["isSinglePassenger"] = document.getElementById("isSinglePassenger").checked ? "Yes" : "No";
 

  // Validate rent start date is greater than today
  if (new Date(data["rentStartDate"]) <= new Date()) {
    alert("Rent start date should be greater than today's date.");
    return;
  }

  // Validate rent end date is after rent start date
  if (new Date(data["rentStartDate"]) >= new Date(data["rentEndDate"])) {
    alert("Rent end date should be after rent start date.");
    return;
  }

  // Check for unique rental ID
  const myId = document.getElementById("rentalId").value;
  let isUnique = array.every((element) => element.rentalId !== myId);
  if (isUnique) {
    array.push(data);
  } else {
    alert("Rental ID already exists. Please use a unique ID.");
    return;
  }
  
  loadData();
  closePopup();
  // reset();

}

//function to reset
function reset() {
  document.getElementById("rentalId").value = "";
  document.getElementById("carModel").value = "";
  document.getElementById("mfdYear").value = "";
  document.getElementById("fuelType").value = "";
  document.getElementById("rentStartDate").value = "";
  document.getElementById("rentEndDate").value = "";
  document.getElementById("customerName").value = "";
  document.getElementById("startPlace").value = "";
  document.getElementById("destinationPlace").value = "";
  document.getElementById("isSinglePassenger").value = "";
}

//function to edit

function editRecord(row) {
  var selectRow = row.parentElement.parentElement;
  var rowId = selectRow.cells[0].innerHTML;
  
  array.forEach((index) => {
    if (index.rentalId == rowId) {
      document.getElementById("rentalId1").value = index.rentalId;
      document.getElementById("carModel1").value = index.carModel;
      document.getElementById("mfdYear1").value = index.mfdYear;
      document.getElementById("fuelType1").value = index.fuelType;
      document.getElementById("rentStartDate1").value = index.rentStartDate;
      document.getElementById("rentEndDate1").value = index.rentEndDate;
      document.getElementById("customerName1").value = index.customerName;
      document.getElementById("startPlace1").value = index.startPlace;
      document.getElementById("destinationPlace1").value = index.destinationPlace;
      document.getElementById("isSinglePassenger1").checked = index.isSinglePassenger === "Yes";
      
    }
  });
  editopenPopup();
}
//function to view

function viewRecord(row) {  
  var selectRow = row.parentElement.parentElement;
  var rowId = selectRow.cells[0].innerHTML;
  
  array.forEach((index) => {
    if (index.rentalId == rowId) {
      document.getElementById("rentalId1").value = index.rentalId;
      document.getElementById("carModel1").value = index.carModel;
      document.getElementById("mfdYear1").value = index.mfdYear;
      document.getElementById("fuelType1").value = index.fuelType;
      document.getElementById("rentStartDate1").value = index.rentStartDate;
      document.getElementById("rentEndDate1").value = index.rentEndDate;
      document.getElementById("customerName1").value = index.customerName;
      document.getElementById("startPlace1").value = index.startPlace;
      document.getElementById("destinationPlace1").value = index.destinationPlace;
      document.getElementById("isSinglePassenger1").checked = index.isSinglePassenger === "Yes";
      
    }
  });
  viewPopup();
}

function update(event) {
 
  event.preventDefault();
  let rentStartDate = document.getElementById("rentStartDate1").value;
  let rentEndDate = document.getElementById("rentEndDate1").value;

  // Initialize a flag to track validation status
  let isValid = true;

  // Validate rent start date is greater than today
  if (new Date(rentStartDate) <= new Date()) {
    alert("Rent start date should be greater than today's date.");
    isValid = false;
  }

  // Validate rent end date is after rent start date
  if (new Date(rentStartDate) >= new Date(rentEndDate)) {
    alert("Rent end date should be after rent start date.");
    isValid = false;
  }

  if (!isValid) {
    return 0; // Exit the function if validation fails
  }

  let rentId = document.getElementById("rentalId1").value;
  //console.log(rentId);

  array.forEach((index) => {
    if (rentId == index.rentalId) {
      index.rentalId = document.getElementById("rentalId1").value;
      index.carModel = document.getElementById("carModel1").value;
      index.mfdYear = document.getElementById("mfdYear1").value;
      index.fuelType = document.getElementById("fuelType1").value;
      index.rentStartDate = document.getElementById("rentStartDate1").value;
      index.rentEndDate = document.getElementById("rentEndDate1").value;
      index.customerName = document.getElementById("customerName1").value;
      index.startPlace = document.getElementById("startPlace1").value;
      index.destinationPlace = document.getElementById("destinationPlace1").value;
      index.isSinglePassenger = document.getElementById("isSinglePassenger1").checked ? "Yes" : "No";       
      
      loadData();
    }
  });

  
  closePopup();
}



// Search operation
function searchRecord() {
  let id = document.getElementById("searchInput").value;

  if (id === "") {
    loadData();
  } else {
    let found = false;
    let tabletext = `<thead>
            <tr>
                <th>Rental ID</th>
                <th>Car Model</th>
                <th>Mfd Year</th>
                <th>Fuel Type</th>
                <th>Rent Start Date</th>
                <th>Rent End Date</th>
                <th>Booked Customer Name</th>
                <th>Start Place</th>
                <th>Destination Place</th>
                <th>IsSinglePassenger</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;

    array.forEach((index) => {
      if (index.rentalId == id) {
        found = true;
        tabletext += `<tr>
                    <td>${index.rentalId}</td>
                    <td>${index.carModel}</td>
                    <td>${index.mfdYear}</td>
                    <td>${index.fuelType}</td>
                    <td>${index.rentStartDate}</td>
                    <td>${index.rentEndDate}</td>
                    <td id="tooltip" title="` + index.customerName +`"> ${index.customerName}</td>
                    <td id="tooltip" title="` + index.startPlace +`"> ${index.startPlace}</td>
                    <td id="tooltip" title="` + index.destinationPlace +`"> ${index.destinationPlace}</td>
                    <td>${index.isSinglePassenger}</td>
                    <td>
                        <button class="btn editbtn" onclick="editRecord(this)"><i class="fa fa-edit"></i></button>
                        <button class="btn viewbtn" onclick="viewRecord(this)"><i class="fa fa-eye"></i></button>
                        <button class="btn deletebtn" onclick="deleteRecord(this)"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>`;
      }
    });

    if (!found) {
      tabletext += `<tr><td colspan="11">Rental ID not found.</td></tr>`;
    }

    tabletext += `</tbody>`;
    document.getElementById("table_data").innerHTML = tabletext;
  }
}

// search by enter
document
  .getElementById("searchInput")
  .addEventListener("keypress", (enterevent) => {
    if (enterevent.key == "Enter") {
      searchRecord();
    }
  });

// delete opertion
function deleteRecord(row) {
  var del = confirm("Do you want to delete this record?");

  if (del == true) {
    selectRow = row.parentElement.parentElement;
    rowId = selectRow.cells[0].innerHTML;

    array.forEach((index) => {
      if (index.rentalId == rowId) {
        // console.log(index.rentalId);
        // console.log(array.indexOf(index));
        array.splice(array.indexOf(index), 1);
      }
      loadData();
    });
  } else {
    return 0;
  }
}            
