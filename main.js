let mood = 'create'
let temp;

// input element

let title = document.getElementById("title")
let price = document.getElementById("price")
let taxs = document.getElementById("taxs")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let count = document.getElementById("count")
let category = document.getElementById("category")
let total = document.getElementById("total")
let create = document.getElementById("create")

// input element
let search = document.getElementById("search")
let searchTitle = document.getElementById("search")
let searchCategory = document.getElementById("searchCategory")


// get total
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxs.value  + +ads.value ) - discount.value 
        total.innerHTML = result
        total.style.background = "blue"
    }
    else{
        total.innerHTML = "";
        total.style.background = "#ba0000"
    }
}
getTotal()
let datapro;
// great product
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}
else{
    datapro = [];
}

create.onclick = () =>{
    let newpro = {
        title:title.value,
        price:price.value,
        taxs:taxs.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
// clean data
    if(title.value != "" && category.value != '' && newpro.count < 100){
// count
        if(mood === 'create'){
            if(newpro.count > 1){
                for(let i = 0; i < newpro.count; i++){
                    datapro.push(newpro);
                    showData()
                }
            }
        else{datapro.push(newpro)}
        }
        else{
            datapro[temp] = newpro;
            mood = 'create'
            create.innerHTML = 'create'
            count.style.display = "block"
        }
     clearInp()
}



// save localstorage
    localStorage.product = JSON.stringify(datapro)
    console.log(datapro)
    showData()
}
// clear
function clearInp(){
    title.value = "";
    price.value = "";
    taxs.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";
    getTotal()
}
// read
function showData(){
    let table = "";
    for(let i = 0; i < datapro.length; i++){
        table += `
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title.toLowerCase()}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxs}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category.toLowerCase()}</td>
                <td><button id="delete" onclick = deleteTd (${i})>delete</button></td>
                <td><button id="update" onclick = updateData(${i})>update</button></td>
            </tr>
        `
    }

    document.getElementById("tbody").innerHTML =table
    let deleteAll = document.getElementById("deleteAll")
    if(datapro.length != 0){
        deleteAll.innerHTML = `<button onclick = deleteAllData()>delete (${datapro.length})</button>`
    }
}
showData()

// delete
function deleteAllData(){
    localStorage.clear()
    datapro.splice(0)
    showData()
}
function deleteTd(i){
    datapro.splice(i,1)
    localStorage.product = JSON.stringify(datapro)
    showData()
}
// update
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxs.value = datapro[i].taxs;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    total.innerHTML = datapro[i].total;
    getTotal()
    temp = i
    showData()
    mood = 'update'
    count.style.display = "none"
    create.innerHTML = "Update"
    scroll({
        top:0,
        behavior:"smooth"
    })
}
// search
let searchMood = 'title'
function searchBtn(id){
    if(id == 'searchTitle'){
        searchMood = 'title'
    }
    else{
        searchMood = 'category'
    }
    search.placeholder = 'Search ' + searchMood
    search.value = ''
    showData()
}
function searchInp(value){
    let table = '';
    for(let i = 0; i < datapro.length; i++){
        if(searchMood == 'title'){
            if(datapro[i].title.includes(value)){
              table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxs}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button id="delete" onclick = deleteTd (${i})>delete</button></td>
                    <td><button id="update" onclick = updateData(${i})>update</button></td>
                </tr>
            `
            }
        }
        else{
            if(datapro[i].category.includes(value)){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxs}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button id="delete" onclick = deleteTd (${i})>delete</button></td>
                    <td><button id="update" onclick = updateData(${i})>update</button></td>
                </tr>
            `
                
            }
        }
    }
        document.getElementById("tbody").innerHTML = table;

}
