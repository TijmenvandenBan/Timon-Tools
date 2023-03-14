
// Calculate interest rate for a certain amount of years
function calculate_interest_rate() {
    document.getElementById("output_interest_rate").innerHTML = "";

    let amount = document.getElementById("amount").value;
    let interest = document.getElementById("interest_rate").value;
    let years = document.getElementById("interest_rate_years").value;
    let current_year = new Date().getFullYear();
    interest = 1 + (interest / 100);

    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
        document.getElementById("output_interest_rate").innerHTML = "<p>Use numbers only!</p>";
        document.getElementById("calculate_interest").className = "warning";
        return
    }

    document.getElementById("calculate_interest").className = "";

    for (let i = 0; i < years; i++) {
        amount *= interest;
        document.getElementById("output_interest_rate").innerHTML += "<p>" + "Year " +
            Number(current_year + i + 1) + ": " + ("&euro; " + amount.toFixed(2)) + "</p>";
    }
    document.getElementById("amount").value = "";
    document.getElementById("interest_rate").value = "";
    document.getElementById("interest_rate_years").value = "";
    document.getElementById("amount").focus();
}

// Creat List
let all_items = [];
function add_item() {
    let item_name = document.getElementById("item_name").value;
    if (item_name.trim() === "") {
        return;
    } else {
        all_items.push(item_name);
    }

    updateItems();

    let item = document.createElement("li");
    item.innerHTML = item_name;

    document.getElementById("item_list").append(item);
    document.getElementById("item_name").value = "";
    document.getElementById("item_name").focus();

    // JSON: Javascript Object Notation
    localStorage.itemList = JSON.stringify(all_items);
}

function readLocalList () {
    all_items = JSON.parse(localStorage.itemList);
    updateItems();

    document.getElementById("item_list").innerHTML = "";

    for (let i = 0; i < all_items.length; i++) {
        let item = document.createElement("li");
        item.innerHTML = all_items[i];
        document.getElementById("item_list").append(item);
    }
}

function reset_item_list () {
    all_items = [];
    document.getElementById("item_list").innerHTML = "";
    reset_item_count()
}

function reset_item_count() {
    document.getElementById("item_count").innerHTML = "<p>" + "0 Items" + "</p>";
}


function updateItems () {
    if (all_items.length === 1){
        document.getElementById("item_count").innerHTML = "<p>" + all_items.length + " Item" + "</p>";
    } else {
        document.getElementById("item_count").innerHTML = "<p>" + all_items.length + " Items" + "</p>";
    }
}

function check_enter_create_list () {
    if (event.key === "Enter") {
        add_item();
    }


}

var map;
function mapInit() {
    map = L.map('map').setView([52.370216, 4.895168], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([52.370216, 4.895168]).addTo(map).bindPopup("Amsterdam: Capital city of the Netherlands.");

    readLocalList();
}

function flyToAmsterdam() {
    map.flyTo([52.370216, 4.895168],11);
}

function flyHome () {
    navigator.geolocation.getCurrentPosition(showHome);
}

function showHome (position) {
    console.log(position)
    map.flyTo([position.coords.latitude, position.coords.longitude], 17);
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup("Home").openPopup();
}

function getCountries () {
    $.getJSON("https://restcountries.com/v3.1/all", showCapitals);
    $.getJSON("https://restcountries.com/v3.1/all", searchHeroes);
}
function showCapitals (data) {
    console.log(data[0]);

    for(let country of data){
        if (country.capitalInfo.latlng) {
            L.marker(country.capitalInfo.latlng).addTo(map).bindPopup(country.capital[0] + "<br/>" + country.name.common);
        }
    }
}

let allHeroes = null;
function superheroInit () {
    $.getJSON("https://akabab.github.io/superhero-api/api/all.json", showSuperheroes);
}

function showSuperheroes (data) {
    document.getElementById("superheroAmount").innerHTML = data.length + " superheroes.";

    document.getElementById("superhero-output").innerHTML = "";

    if (allHeroes === null) {
        allHeroes = data;
    }


    for (let hero of data) {
        let div = document.createElement("div");
        div.className = "hero";

        let p = document.createElement("p");
        p.innerHTML = hero.name;
        div.append(p);

        let img = document.createElement("img");
        img.src = hero.images.sm;
        div.append(img);

        p = document.createElement("p");
        p.innerHTML = hero.appearance.gender;
        div.append(p);

        document.getElementById("superhero-output").append(div);
    }
}

function searchHeroes() {
    let search = document.getElementById("search").value.toUpperCase();
    let result = allHeroes.filter(h => h.name.toUpperCase().includes(search));

    showSuperheroes(result);
}

function init () {
    superheroInit()
    mapInit()
}
