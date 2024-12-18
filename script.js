// Show and hide popup for add/edit
function showPopup(type, recordId = null) {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';

    if (type === 'edit') {
        // Pre-fill fields for editing (this is just a dummy example)
        document.getElementById('rentalId').value = recordId;
        document.getElementById('carModel').value = "Toyota Corolla";
        document.getElementById('mfdYear').value = "2020";
        document.getElementById('fuelType').value = "petrol";
        document.getElementById('rentStartDate').value = "2024-01-01";
        document.getElementById('rentEndDate').value = "2024-01-10";
        document.getElementById('customerName').value = "John Doe";
        document.getElementById('destinationPlace').value = "New York";
        document.getElementById('startPlace').value = "Los Angeles";
        document.getElementById('isSinglePassenger').checked = true;
    }
}

// Close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Save the rental record (dummy function)
function saveRecord() {
    alert('Record Saved');
    closePopup();
}

// Confirm delete record
function confirmDelete(recordId) {
    if (confirm('Are you sure you want to delete this record?')) {
        // Proceed with deleting the record
        alert('Record ' + recordId + ' deleted');
    }
}

