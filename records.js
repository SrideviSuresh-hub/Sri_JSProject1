 
var selectedRow=null;
 
var myActive,myCanceled,myDraft,myDelivered,myShiped;
 
function openSideBar(){
    document.getElementById("sideBar").style.display="block";
    document.getElementById("menu_button").style.display='none';
    // document.getElementById("main_Product").style.width='50%';
}
 
function closeSideBar(){
    document.getElementById("sideBar").style.display="none";
    document.getElementById("menu_button").style.display='block';
}
 
 
function addProduct(){
    document.getElementById("form_page").style.display='block';
    document.getElementById("form_page").style.right='25%';
    document.getElementById("main_Product").style.opacity="0.4";
    document.getElementById("main_Product").style.cursor="none";
}
function editProduct(){
    document.getElementById("form_page_edit").style.display='block';
    document.getElementById("form_page_edit").style.right='25%';
    document.getElementById("main_Product").style.opacity="0.4";
    document.getElementById("main_Product").style.cursor="none";
   
}
function viewProduct(){
    document.getElementById("form_page_view").style.display='block';
    document.getElementById("form_page_view").style.right='25%';
    document.getElementById("main_Product").style.opacity="0.4";
    document.getElementById("main_Product").style.cursor="none";
 
}
 
 
function formClose(){
   
    document.getElementById("form_page").style.right='-700px';
    document.getElementById("form_page").style.display="none";
    document.getElementById("form_page_edit").style.right='-700px';
    document.getElementById("form_page_view").style.display="none";
    document.getElementById("form_page_view").style.right='-700px';
    document.getElementById("form_page_edit").style.display="none";
    document.getElementById("main_Product").style.opacity="1";
    document.getElementById("main_Product").style.cursor="auto";
 
}
 
function readFormData(){
    var formData= {};
    formData["name"]=document.getElementById("name").value;
    formData["title"]=document.getElementById("title").value;
    formData["description"]=document.getElementById("description").value;
    formData["vendor"]=document.getElementById("vendor").value;
    formData["product_type"]=document.getElementById("product_type").value;
    formData["address"]=document.getElementById("address").value;
    formData["stock"]=document.getElementById("stock").value;
    formData["buyPrice"]=document.getElementById("buyPrice").value;
    formData["salePrice"]=document.getElementById("salePrice").value;
    formData["quantity"]=document.getElementById("quantity").value;
    formData["rates"]=document.getElementById("rates").value;
    formData["status"]=document.getElementById("status").value;
    console.log(formData);
    insertNewData(formData);
}
 // Insert new Record
 
 function insertNewData(data){
    var table = document.getElementById("table_data").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
   
   
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = Number(table.rows.length);
 
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.name;
       
 
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.title;
   
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.description;
 
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.salePrice;
 
    var cell6 = newRow.insertCell(5);
        cell6.innerHTML = data.status;
 
    var cell7 = newRow.insertCell(6);
        cell7.innerHTML = data.vendor;
 
    var cell8 = newRow.insertCell(7);
        cell8.innerHTML = data.product_type;
   
    var cell9 = newRow.insertCell(8);
        cell9.innerHTML = data.address;
       
    var cell10 = newRow.insertCell(9);
    cell10.innerHTML = data.buyPrice;
 
    var cell11 = newRow.insertCell(10);
    cell11.innerHTML = data.quantity;
 
    var cell12 = newRow.insertCell(11);
    cell12.innerHTML = data.rates;
 
    var cell13 = newRow.insertCell(12);
    cell13.innerHTML = data.stock;
 
    var cell14 = newRow.insertCell(13);
        cell14.innerHTML = `<button onclick="onEdit(this)"><i class="fa fa-edit"></i></button>
                        <button onclick="onView(this)"> <i class="fa fa-eye"></i></button>
                        <button onclick="onDelete(this)"><i class="fa fa-trash"></i></button>`;
 
 }
 
 
 function onEdit(rowData){
   
    selectedRow = rowData.parentElement.parentElement;
    document.getElementById("name1").value=selectedRow.cells[1].innerHTML;
    document.getElementById("title1").value=selectedRow.cells[2].innerHTML;
    document.getElementById("description1").value=selectedRow.cells[3].innerHTML;
    document.getElementById("salePrice1").value=selectedRow.cells[4].innerHTML;
    document.getElementById("status1").value=selectedRow.cells[5].innerHTML;
    document.getElementById("vendor1").value=selectedRow.cells[6].innerHTML;
    document.getElementById("product_type1").value=selectedRow.cells[7].innerHTML;
    document.getElementById("address1").value=selectedRow.cells[8].innerHTML;
    document.getElementById("buyPrice1").value=selectedRow.cells[9].innerHTML;
    document.getElementById("quantity1").value=selectedRow.cells[10].innerHTML;
    document.getElementById("rates1").value=selectedRow.cells[11].innerHTML;
    document.getElementById("stock1").value=selectedRow.cells[12].innerHTML;
    editProduct(selectedRow);
   
 }
 function onDelete(data){
   
    if(confirm('Do you want to delete this record?')){
        row = data.parentElement.parentElement;
        document.getElementById("table_data").deleteRow(row.rowIndex);
    }
 
 }
 
 function onView(rowData){
 
        selectedRow = rowData.parentElement.parentElement;
        document.getElementById("name2").value=selectedRow.cells[1].innerHTML;
        document.getElementById("title2").value=selectedRow.cells[2].innerHTML;
        document.getElementById("description2").value=selectedRow.cells[3].innerHTML;
        document.getElementById("salePrice2").value=selectedRow.cells[4].innerHTML;
        document.getElementById("status2").value=selectedRow.cells[5].innerHTML;
        document.getElementById("vendor2").value=selectedRow.cells[6].innerHTML;
        document.getElementById("product_type2").value=selectedRow.cells[7].innerHTML;
        document.getElementById("address2").value=selectedRow.cells[8].innerHTML;
        document.getElementById("buyPrice2").value=selectedRow.cells[9].innerHTML;
        document.getElementById("quantity2").value=selectedRow.cells[10].innerHTML;
        document.getElementById("rates2").value=selectedRow.cells[11].innerHTML;
        document.getElementById("stock2").value=selectedRow.cells[12].innerHTML;
        viewProduct();
       
 }
 
 
function myRefresh(){
    let myCell
    const tableData=document.querySelector("#table_data tbody");
 
 
    console.log(tableData.rows.length);
   
    for(let i=0;i<tableData.rows.length;i++){
 
        const myRow = tableData.rows[i];
       
         myCell = myRow.cells[5].innerHTML;
 
         console.log(myCell);
 
         switch (myCell.toLowerCase()) {
            case "active":
                myActive+=1;
                break;
 
            case "cancel":
                myCanceled+=1;
                break;
 
            case "draft":
                myDraft+=1;
                break;
 
            case "delivered":
                myDelivered+=1;
                break;
         
            default:
                    myShiped+=1;
                break;
         }
         
    }
    document.getElementById("active_count").value=myActive;
   
}
 
 
//  category
 
 
 
 const filterOptions = () => {
   
    let myCell
    const option = document.querySelector("#filter").value;
    const selection = option.replace('&', '')
    console.log(selection);
 
    const tableData=document.querySelector("#table_data tbody");
    // console.log(tableData.rows[2]);
    // const rowData = tableData.rows
    for(let i=0;i<tableData.rows.length;i++){
 
        const myRow = tableData.rows[i];
       
         myCell = myRow.cells[7].innerHTML;
 
         if(selection.toLowerCase() == myCell.toLowerCase()){
            // document.getElementById("table_data").style.display="none";
           
         }
         else{
            myRow.style.display="none";
         }
 
    }
   
};
try {
    document.getElementById("filter").addEventListener("change",filterOptions);
 
} catch (error) {
   
}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 