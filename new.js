

function openPopup() {
    document.getElementById("popupcontent").style.display = "block"; 
    //document.getElementById("rentalId").disabled = false;
    
}

function editopenPopup() {
    document.getElementById("editpopupcontent").style.display = "block"; 
    //document.getElementById("rentalId").disabled = false;
    
}



function closePopup() {
    document.getElementById("popupcontent").style.display = "none"; 
    //document.getElementById("rentalId").disabled = false;
    
}

function editclosePopup() {
    document.getElementById("editpopupcontent").style.display = "none"; 
    //document.getElementById("rentalId").disabled = false;
    
}






let array=[
    {
        rentalId:1,
        carModel:"maruthi",
        mfdYear:2,
        fuelType:"petrol",
        rentStartDate:"21-12-2024",
        rentEndDate:"23-12-2024", 
        customerName:"sri",
        startPlace:"Cbpur",
        customerName:"blore",
        isSinglePassenger:true
    }
]

loadData();


function addRecord(){
    event.preventDefault()
    var data={};
    data["rentalId"]=document.getElementById("rentalId").value;
    data["carModel"]=document.getElementById("carModel").value;
    data["mfdYear"]=document.getElementById("mfdYear").value;
    data["fuelType"]=document.getElementById("fuelType").value;
    data["rentStartDate"]=document.getElementById("rentStartDate").value;
    data["rentEndDate"]=document.getElementById("rentEndDate").value;
    data["customerName"]=document.getElementById("customerName").value;
    data["startPlace"]=document.getElementById("startPlace").value;
    data["customerName"]=document.getElementById("customerName").value;
    data["isSinglePassenger"]=document.getElementById("isSinglePassenger").value;

    
    array.push(data);
    loadData();
    closePopup()
  
}

function loadData(){
    var tabletext=`<thead>
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
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>`;
            array.forEach(index =>{
                tabletext+=`<tr><td>`+ index.rentalId+`</td><td>`+index.carModel+`</td><td>`+index.mfdYear+`</td><td>`+
                index.fuelType+`</td><td>`+index.rentStartDate+`</td><td>`+index.rentEndDate+`</td><td>`+
                index.customerName+`</td><td>`+index.startPlace+`</td><td>`+index.customerName+`</td><td>`+
                 `<button class="btn editbtn" onclick="editRecord(this)"><i class="fa fa-edit"></i></button>
                <button class="btn deletebtn" onclick="deleteRecord(this)"><i class="fa fa-trash"></i></button></td></tr>`           
            });
            tabletext+=`</tbody>`;
            document.getElementById("table_data").innerHTML=tabletext;

           
 }


 function editRecord(rowdetails){
    var selectRow=rowdetails.parentElement.parentElement;
    ///console.log(selectRow.cells[0].innerHTML);
    var rowId=selectRow.cells[0].innerHTML;
    array.forEach(index =>{
         if(index.rentalId == rowId )
         {
            document.getElementById("rentalId1").value=index.rentalId;
            document.getElementById("rentalId1").value.disabled=true;
            document.getElementById("carModel1").value=index.carModel;
            document.getElementById("mfdYear1").value=index.mfdYear;
            document.getElementById("fuelType1").value=index.fuelType;
            document.getElementById("rentStartDate1").value=index.rentStartDate;
            document.getElementById("rentEndDate1").value=index.rentEndDate;
            document.getElementById("customerName1").value=index.customerName;
            document.getElementById("startPlace1").value=index.startPlace;
            document.getElementById("customerName1").value=index.customerName;
            document.getElementById("isSinglePassenger1").value=index.isSinglePassenger;
            
         }
    
        });
        editopenPopup()
}


function deleteRecord(rowdetails){
     selectRow=rowdetails.parentElement.parentElement;
     rowId=selectRow.cells[0].innerHTML;
     array.forEach(index => {
        if(index.rentalId==rowId){
            array.splice((selectRow.rowIndex)-1,1);
            load();
        }
     });
}


