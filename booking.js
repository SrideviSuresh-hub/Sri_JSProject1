

function openPopup() {
    document.getElementById("popupcontent").style.display = "block"; 
    //document.getElementById("rentalId").disabled = false;
    document.getElementById("mask").style.display = "block"; 
    
}

function editopenPopup() {
    document.getElementById("editpopupcontent").style.display = "block"; 
    document.getElementById("mask").style.display = "block"; 
    
    
}



function closePopup() {
    document.getElementById("popupcontent").style.display = "none"; 
    document.getElementById("editpopupcontent").style.display = "none"; 
    document.getElementById("mask").style.display = "none"; 
    
    
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
        destinationPlace:"blore",
        isSinglePassenger:true
    },
    {
        rentalId:2,
        carModel:"maruthi",
        mfdYear:2,
        fuelType:"petrol",
        rentStartDate:"21-12-2024",
        rentEndDate:"23-12-2024", 
        customerName:"sri",
        startPlace:"Cbpur",
        destinationPlace:"blore",
        isSinglePassenger:true
    },
    {
        rentalId:1003,
        carModel:"maruthi",
        mfdYear:2,
        fuelType:"petrol",
        rentStartDate:"21-12-2024",
        rentEndDate:"23-12-2024", 
        customerName:"sri",
        startPlace:"Cbpur",
        destinationPlace:"blore",
        isSinglePassenger:true
    }
   
];

storeData(array);
loadData();




// store------------------------------------------------->


function storeData(x){
    let keyName=localStorage.key("Sri_table");

    if(keyName)
    {
        const str=localStorage.getItem(keyName);
        array=JSON.parse(str);
    }
    else{
        let str = JSON.stringify(array);
        localStorage.setItem("Sri_table",str);
    }

}



// add operation---------------------------------------->


function addRecord(){
    event.preventDefault();

    const myId=document.getElementById("rentalId").value;

    var data={};
    data["rentalId"]=document.getElementById("rentalId").value;
    data["carModel"]=document.getElementById("carModel").value;
    data["mfdYear"]=document.getElementById("mfdYear").value;
    data["fuelType"]=document.getElementById("fuelType").value;
    data["rentStartDate"]=document.getElementById("rentStartDate").value;
    data["rentEndDate"]=document.getElementById("rentEndDate").value;
    data["customerName"]=document.getElementById("customerName").value;
    data["startPlace"]=document.getElementById("startPlace").value;
    data["destinationPlace"]=document.getElementById("destinationPlace").value;
    data["isSinglePassenger"]=document.getElementById("isSinglePassenger").value;


 
  


// Validate rent start date is greater than today
if (new Date(data["rentStartDate"]) <= new Date()) {
    alert("Rent start date should be greater than today's date.");
    return ;
}

// Validate rent end date is after rent start date
if (new Date(data["rentStartDate"]) >= new Date(data["rentEndDate"])) {
    alert("Rent end date should be after rent start date.");
    return ;
}

// Check for unique rental ID
let isUnique = array.every(ele => ele.rentalId !== myId);
if (isUnique) {
    array.push(data);
   
    alert("Record added successfully!");
} else {
    alert("Rental ID already exists. Please use a unique ID.");
    return;
}



   // array.push(data);
    loadData();
    closePopup();
  
}






function editRecord(rowdetails){
    var selectRow=rowdetails.parentElement.parentElement;
    ///console.log(selectRow.cells[0].innerHTML);
    var rowId=selectRow.cells[0].innerHTML;
    array.forEach(index =>{
         if(index.rentalId == rowId )
         {
            document.getElementById("rentalId1").value=index.rentalId;
            document.getElementById("carModel1").value=index.carModel;
            document.getElementById("mfdYear1").value=index.mfdYear;
            document.getElementById("fuelType1").value=index.fuelType;
            document.getElementById("rentStartDate1").value=index.rentStartDate;
            document.getElementById("rentEndDate1").value=index.rentEndDate;
            document.getElementById("customerName1").value=index.customerName;
            document.getElementById("startPlace1").value=index.startPlace;
            document.getElementById("destinationPlace1").value=index.destinationPlace;
            document.getElementById("isSinglePassenger1").value=index.isSinglePassenger;
            
         }
    
        });
        editopenPopup();
}

function update(){

    event.preventDefault()
    let rentStartDate = document.getElementById("rentStartDate1").value;
    let rentEndDate = document.getElementById("rentEndDate1").value;

    // Validate rent start date is greater than today
    if (new Date(rentStartDate) <= new Date()) {
        alert("Rent start date should be greater than today's date.");
        return ;
    }

    // Validate rent end date is after rent start date
    if (new Date(rentStartDate) >= new Date(rentEndDate)) {
        alert("Rent end date should be after rent start date.");
        return ;
    }
  
    let rentId=document.getElementById("rentalId1").value;
    console.log(rentId); 


    array.forEach(index =>{
        if(rentId==index.rentalId)
        {
            index.rentalId=document.getElementById("rentalId1").value;
            index.carModel=document.getElementById("carModel1").value;
            index.mfdYear=document.getElementById("mfdYear1").value;
            index.fuelType=document.getElementById("fuelType1").value;
            index.rentStartDate = document.getElementById("rentStartDate1").value;
            index.rentEndDate=document.getElementById("rentEndDate1").value;
            index.customerName=document.getElementById("customerName1").value;
            index.startPlace=document.getElementById("startPlace1").value;
            index.destinationPlace=document.getElementById("destinationPlace1").value;
            index.isSinglePassenger=document.getElementById("isSinglePassenger1").value;
            console.log('id');
            
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
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;

        array.forEach(index => {
            if (index.rentalId == id) {
                found = true;
                tabletext += `<tr>
                    <td>${index.rentalId}</td>
                    <td>${index.carModel}</td>
                    <td>${index.mfdYear}</td>
                    <td>${index.fuelType}</td>
                    <td>${index.rentStartDate}</td>
                    <td>${index.rentEndDate}</td>
                    <td>${index.customerName}</td>
                    <td>${index.startPlace}</td>
                    <td>${index.destinationPlace}</td>
                    <td>
                        <button class="btn editbtn" onclick="editRecord(this)"><i class="fa fa-edit"></i></button>
                        <button class="btn deletebtn" onclick="deleteRecord(this)"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>`;
            }
        });

        if (!found) {
            tabletext += `<tr><td colspan="10">Rental ID not found.</td></tr>`;
        }

        tabletext += `</tbody>`;
        document.getElementById("table_data").innerHTML = tabletext;
    }
}





// diplaying data in table

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
                index.customerName+`</td><td>`+index.startPlace+`</td><td>`+index.destinationPlace+`</td><td>
                <button class="btn editbtn" onclick="editRecord(this)"><i class="fa fa-edit"></i></button>
                <button class="btn deletebtn" onclick="deleteRecord(this)"><i class="fa fa-trash"></i></button></td></tr>`           
            });
            tabletext+=`</tbody>`;


            //  storing data into local storage
            localStorage.setItem("Sri_table",(JSON.stringify(array)));

            // loading data
            document.getElementById("table_data").innerHTML=tabletext;

           
 }



 // delete opertion

function deleteRecord(rowdetails){
    
    var del=confirm("Do you want to delete this record?");

    if(del==true){
        console
     selectRow=rowdetails.parentElement.parentElement;
     rowId=selectRow.cells[0].innerHTML;
     
     array.forEach(index => {
        if(index.rentalId == rowId){
            console.log(index.rentalId);
            console.log(array.indexOf(index));
            
            array.splice(array.indexOf(index),1);
        }
        loadData();   
       
     });
     
 }
 else 
 {
     return 0;
 }


}

