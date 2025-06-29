let mood = 'create';
let temp;

// input elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxs = document.getElementById("taxs");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let total = document.getElementById("total");
let create = document.getElementById("create");
let search = document.getElementById("search");

// get total
function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxs.value + +ads.value) - +discount.value;
        total.innerHTML = result > 0 ? result : 0;
        total.style.background = "blue";
    } else {
        total.innerHTML = "";
        total.style.background = "#ba0000";
    }
}
getTotal();

let datapro = localStorage.product ? JSON.parse(localStorage.product) : [];

create.onclick = () => {
    let newpro = {
        title: title.value.trim(),
        price: price.value,
        taxs: taxs.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: mood === 'update' ? 1 : Number(count.value),
        category: category.value.trim(),
    };
    // Only require title, price, and category
    if (
        newpro.title !== "" &&
        newpro.price !== "" &&
        newpro.category !== ""
    ) {
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push({ ...newpro, count: 1 });
                }
            } else {
                datapro.push(newpro);
            }
        } else {
            datapro[temp] = newpro;
            mood = 'create';
            create.innerHTML = 'create';
            count.style.display = "block";
        }
        clearInp();
        localStorage.product = JSON.stringify(datapro);
        showData();
    }
};

function clearInp() {
    title.value = "";
    price.value = "";
    taxs.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";
    getTotal();
}

function showData() {
    let table = "";
    for (let i = 0; i < datapro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title.toLowerCase()}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxs}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category.toLowerCase()}</td>
                <td><button class="update-btn" onclick="updateData(${i})">update</button></td>
                <td><button class="delete-btn" onclick="deleteTd(${i})">delete</button></td>
            </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;
    let deleteAll = document.getElementById("deleteAll");
    if (datapro.length !== 0) {
        deleteAll.innerHTML = `<button onclick="deleteAllData()">delete all (${datapro.length})</button>`;
    } else {
        deleteAll.innerHTML = '';
    }
}
showData();

function deleteAllData() {
    localStorage.clear();
    datapro.splice(0);
    showData();
}
function deleteTd(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}
function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxs.value = datapro[i].taxs;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    total.innerHTML = datapro[i].total;
    getTotal();
    temp = i;
    mood = 'update';
    count.style.display = "none";
    create.innerHTML = "Update";
    scroll({
        top: 0,
        behavior: "smooth"
    });
}

let searchMood = 'title';
function searchBtn(id) {
    if (id === 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search ' + searchMood;
    search.value = '';
    showData();
}
function searchInp(value) {
    let table = '';
    value = value.toLowerCase();
    for (let i = 0; i < datapro.length; i++) {
        if (searchMood === 'title') {
            if (datapro[i].title.toLowerCase().includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${datapro[i].title.toLowerCase()}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxs}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category.toLowerCase()}</td>
                    <td><button class="update-btn" onclick="updateData(${i})">update</button></td>
                    <td><button class="delete-btn" onclick="deleteTd(${i})">delete</button></td>
                </tr>
            `;
            }
        } else {
            if (datapro[i].category.toLowerCase().includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${datapro[i].title.toLowerCase()}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxs}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category.toLowerCase()}</td>
                    <td><button class="update-btn" onclick="updateData(${i})">update</button></td>
                    <td><button class="delete-btn" onclick="deleteTd(${i})">delete</button></td>
                </tr>
            `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

// Focus next input on Enter
const inputOrder = [title, price, taxs, ads, discount, count, category];
inputOrder.forEach((input, idx) => {
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (idx < inputOrder.length - 1) {
                inputOrder[idx + 1].focus();
            } else {
                create.focus();
            }
        }
    });
});
