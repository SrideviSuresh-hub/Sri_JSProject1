let editIndex = null;
let deleteRow = null;

//  popup for adding or editing records
function openPopup() {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("rentalForm").reset();
    document.getElementById("rentalId").disabled = false;
    editIndex = null;
}

//  close  popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

//  confirm popup for deleting records
function confirmDelete(button) {
    deleteRow = button.parentElement.parentElement;
    document.getElementById("confirmPopup").style.display = "flex";
    document.getElementById("overlay").style.display = "block";
}

// close  confirm popup
function closeConfirmPopup() {
    document.getElementById("confirmPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

//  delete  record
function deleteRecord() {
    const rentalId = deleteRow.cells[0].innerText;
    deleteRow.remove();
    deleteRowFromLocalStorage(rentalId);
    closeConfirmPopup();
}

//  save t record (add or update)
function saveRecord() {
    const rentalId = document.getElementById("rentalId").value;
    const carModel = document.getElementById("carModel").value;
    const mfdYear = document.getElementById("mfdYear").value;
    const fuelType = document.getElementById("fuelType").value;
    const rentStartDate = document.getElementById("rentStartDate").value;
    const rentEndDate = document.getElementById("rentEndDate").value;
    const customerName = document.getElementById("customerName").value;
    const startPlace = document.getElementById("startPlace").value;
    const destinationPlace = document.getElementById("destinationPlace").value;
    const isSinglePassenger = document.getElementById("isSinglePassenger").checked;

    //  mandatory fields
    if (!rentalId || !carModel || !rentStartDate || !rentEndDate || !customerName || !startPlace || !destinationPlace) {
        alert("Please fill all mandatory fields.");
        return;
    }

    // Validate  date
    if (new Date(rentStartDate) > new Date(rentEndDate)) {
        alert("Rent end date should be after rent start date.");
        return;
    }

    // Validatedate is greater than today
    const today = new Date().toISOString().split('T')[0];
    if (new Date(rentStartDate) <= new Date(today)) {
        alert("Rent start date should be greater than today.");
        return;
    }

    const table = document.querySelector("tbody");

    if (editIndex === null) {
        // if ID already there
        for (let i = 0; i < table.rows.length; i++) {
            if (table.rows[i].cells[0].innerText === rentalId) {
                alert("Rental ID already exists. Please use a different ID.");
                return;
            }
        }

        //  new table row
        const newRow = table.insertRow();

        // Insert new cells to row
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);
        const cell8 = newRow.insertCell(7);
        const cell9 = newRow.insertCell(8);
        const cell10 = newRow.insertCell(9);

        // Add form data to  cells
        cell1.innerHTML = rentalId;
        cell2.innerHTML = carModel;
        cell3.innerHTML = mfdYear;
        cell4.innerHTML = fuelType;
        cell5.innerHTML = rentStartDate;
        cell6.innerHTML = rentEndDate;
        cell7.innerHTML = customerName;
        cell8.innerHTML = startPlace;
        cell9.innerHTML = destinationPlace;
        cell10.innerHTML = `<button class="btn edit-btn" onclick="editRecord(this)">Edit</button>
                            <button class="btn delete-btn" onclick="confirmDelete(this)">Delete</button>`;

        // Save new row to local 
        saveRowToLocalStorage({
            rentalId,
            carModel,
            mfdYear,
            fuelType,
            rentStartDate,
            rentEndDate,
            customerName,
            startPlace,
            destinationPlace,
            isSinglePassenger
        });

    } else {
        // Update existing row
        const row = table.rows[editIndex];
        row.cells[1].innerHTML = carModel;
        row.cells[2].innerHTML = mfdYear;
        row.cells[3].innerHTML = fuelType;
        row.cells[4].innerHTML = rentStartDate;
        row.cells[5].innerHTML = rentEndDate;
        row.cells[6].innerHTML = customerName;
        row.cells[7].innerHTML = startPlace;
        row.cells[8].innerHTML = destinationPlace;

        // Update  row in  storage
        updateRowInLocalStorage(rentalId, {
            rentalId,
            carModel,
            mfdYear,
            fuelType,
            rentStartDate,
            rentEndDate,
            customerName,
            startPlace,
            destinationPlace,
            isSinglePassenger
        });

        // Update  row in the table
        row.cells[1].innerHTML = carModel;
        row.cells[2].innerHTML = mfdYear;
        row.cells[3].innerHTML = fuelType;
        row.cells[4].innerHTML = rentStartDate;
        row.cells[5].innerHTML = rentEndDate;
        row.cells[6].innerHTML = customerName;
        row.cells[7].innerHTML = startPlace;
        row.cells[8].innerHTML = destinationPlace;
    }

    // Close popup
    closePopup();
}
record
function editRecord(button) {
    const row = button.parentElement.parentElement;
    editIndex = row.rowIndex;
    document.getElementById("rentalId").value = row.cells[0].innerHTML;
    document.getElementById("rentalId").disabled = true; // Disable Rental ID input
    document.getElementById("carModel").value = row.cells[1].innerHTML;
    document.getElementById("mfdYear").value = row.cells[2].innerHTML;
    document.getElementById("fuelType").value = row.cells[3].innerHTML;
    document.getElementById("rentStartDate").value = row.cells[4].innerHTML;
    document.getElementById("rentEndDate").value = row.cells[5].innerHTML;
    document.getElementById("customerName").value = row.cells[6].innerHTML;
    document.getElementById("startPlace").value = row.cells[7].innerHTML;
    document.getElementById("destinationPlace").value = row.cells[8].innerHTML;
    openPopup();
}

// search for a record by rental ID
function searchRecord() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const table = document.querySelector("tbody");
    const rows = table.getElementsByTagName("tr");
    let found = false;

    for (let i = 0; i < rows.length; i++) {
        const rentalId = rows[i].cells[0].innerHTML.toLowerCase();
        if (rentalId.includes(searchInput)) {
            rows[i].style.display = "";
            found = true;
        } else {
            rows[i].style.display = "none";
        }
    }

    if (!found) {
        alert("No records found.");
    }
}

// save a row to local storage
function saveRowToLocalStorage(record) {
    let records = JSON.parse(localStorage.getItem("rentalRecords")) || [];
    records.push(record);
    localStorage.setItem("rentalRecords", JSON.stringify(records));
}

//  update a row in local storage
function updateRowInLocalStorage(rentalId, updatedRecord) {
    let records = JSON.parse(localStorage.getItem("rentalRecords")) || [];
    records = records.map(record => record.rentalId === rentalId ? updatedRecord : record);
    localStorage.setItem("rentalRecords", JSON.stringify(records));
}

//  delete a row from local storage
function deleteRowFromLocalStorage(rentalId) {
    let records = JSON.parse(localStorage.getItem("rentalRecords")) || [];
    records = records.filter(record => record.rentalId !== rentalId);
    localStorage.setItem("rentalRecords", JSON.stringify(records));
}

// load records from storage and display in  table
function loadRecordsFromLocalStorage() {
    const records = JSON.parse(localStorage.getItem("rentalRecords")) || [];
    const table = document.querySelector("tbody");
    records.forEach(record => {
        const newRow = table.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);
        const cell8 = newRow.insertCell(7);
        const cell9 = newRow.insertCell(8);
        const cell10 = newRow.insertCell(9);

        cell1.innerHTML = record.rentalId;
        cell2.innerHTML = record.carModel;
        cell3.innerHTML = record.mfdYear;
        cell4.innerHTML = record.fuelType;
        cell5.innerHTML = record.rentStartDate;
        cell6.innerHTML = record.rentEndDate;
        cell7.innerHTML = record.customerName;
        cell8.innerHTML = record.startPlace;
        cell9.innerHTML = record.destinationPlace;
        cell10.innerHTML = `<button class="btn edit-btn" onclick="editRecord(this)">Edit</button>
                            <button class="btn delete-btn" onclick="confirmDelete(this)">Delete</button>`;
    });
}

// Load records from  storage when page  loads
document.addEventListener("DOMContentLoaded", loadRecordsFromLocalStorage);
