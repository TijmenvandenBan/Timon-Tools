// Calculate interest rate for a certain amount of years
function calculate_interest_rate() {
    document.getElementById("interest-rate-output").innerHTML = "";

    let amount = document.getElementById("interest-rate-current-amount").value;
    let interest = document.getElementById("interest-rate-percentage").value;
    let years = document.getElementById("interest-rate-years").value;
    let current_year = new Date().getFullYear();
    interest = 1 + (interest / 100);

    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
        document.getElementById("interest-rate-output").innerHTML = "<p>Use numbers only!</p>";
        return
    }

    for (let i = 0; i < years; i++) {
        amount *= interest;
        document.getElementById("interest-rate-output").innerHTML += "<p>" + "Year " +
            Number(current_year + i + 1) + ": " + ("&euro;" + amount.toFixed(2)) + "</p>";
    }
    document.getElementById("interest-rate-current-amount").value = "";
    document.getElementById("interest-rate-percentage").value = "";
    document.getElementById("interest-rate-years").value = "";
}

// Creat List
let all_items = [];

function add_item() {
    let item_name = document.getElementById("item-name").value;
    if (item_name.trim() === "") {
        return;
    } else {
        all_items.push(item_name);
    }

    updateItems();

    let item = document.createElement("p");
    item.innerHTML = item_name;

    document.getElementById("item-list").append(item);
    document.getElementById("item-name").value = "";
    document.getElementById("item-name").focus();

    // JSON: Javascript Object Notation
    localStorage.itemList = JSON.stringify(all_items);
}

function readLocalList() {
    all_items = JSON.parse(localStorage.itemList);
    updateItems();

    document.getElementById("item-list").innerHTML = "";

    for (let i = 0; i < all_items.length; i++) {
        let item = document.createElement("p");
        item.innerHTML = all_items[i];
        document.getElementById("item-list").append(item);
    }
}

function reset_item_list() {
    all_items = [];
    document.getElementById("item-list").innerHTML = "";
    reset_item_count()
}

function reset_item_count() {
    document.getElementById("item-count").innerHTML = "<p>" + "0 Items" + "</p>";
}


function updateItems() {
    if (all_items.length === 1) {
        document.getElementById("item-count").innerHTML = "<p>" + all_items.length + " Item" + "</p>";
    } else {
        document.getElementById("item-count").innerHTML = "<p>" + all_items.length + " Items" + "</p>";
    }
}

function check_enter_create_list() {
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
    map.flyTo([52.370216, 4.895168], 11);
}

function flyHome() {
    navigator.geolocation.getCurrentPosition(showHome);
}

function showHome(position) {
    console.log(position)
    map.flyTo([position.coords.latitude, position.coords.longitude], 17);
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup("Home").openPopup();
}

function getCountries() {
    $.getJSON("https://restcountries.com/v3.1/all", showCapitals);
}

function showCapitals(data) {
    console.log(data[0]);

    for (let country of data) {
        if (country.capitalInfo.latlng) {
            L.marker(country.capitalInfo.latlng).addTo(map).bindPopup(country.capital[0] + "<br/>" + country.name.common);
        }
    }
}

let allHeroes = null;

function superheroInit() {
    $.getJSON("https://akabab.github.io/superhero-api/api/all.json", showSuperheroes);
}

function showSuperheroes(data) {
    document.getElementById("superhero-output").innerHTML = "";

    if (allHeroes === null) {
        allHeroes = data;
    }


    for (let hero of data) {
        let div = document.createElement("div");
        div.className = "col hero";

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
    let search = document.getElementById("search-hero").value.toUpperCase();
    let result = allHeroes.filter(h => h.name.toUpperCase().includes(search));

    showSuperheroes(result);
}

let ball1 = {
    color: "white",
    x: 50,
    y: 50,
    speedX: 1,
    speedY: 1
};

let ball2 = {
    color: "red",
    x: 100,
    y: 50,
    speedX: 1,
    speedY: 1
};

let ball3 = {
    color: "yellow",
    x: 150,
    y: 50,
    speedX: 1,
    speedY: 1
};


// Pool
let allBalls = [ball1, ball2, ball3];

function poolInit() {
    let canvas = document.getElementById("my-canvas");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 400, 200);

    for (let b of allBalls) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 10, 0, 2 * Math.PI);

        ctx.fillStyle = b.color;
        ctx.fill();

        b.x += b.speedX;
        b.y += b.speedY;

        if (b.y >= canvas.height - 10) {
            b.speedY *= -1;
        }
        if (b.y < 10) {
            b.speedY *= -1;
        }
        if (b.x >= canvas.width - 10) {
            b.speedX *= -1;
        }
        if (b.x < 10) {
            b.speedX *= -1;
        }

        b.speedX *= 0.999;
        b.speedY *= 0.999;
    }
}

function kickIt() {
    for (let b of allBalls) {
        b.speedX = Math.random() * 4 - 2;
        b.speedY = Math.random() * 4 - 2;
    }
}

function init() {
    superheroInit()
    mapInit()
    setInterval(poolInit, 5);
}

// Prime Number
function calculatePrimeNumber() {
    document.getElementById("prime-number-output").innerHTML = "&infin;";
    let number = document.getElementById("prime-number").value;
    // let answer = nextPrime(number);

    let w = new Worker("Math/primeNumber.js")
    w.postMessage({number})

    w.onmessage = function (msg) {
       document.getElementById("prime-number-output").innerHTML = `${msg.data.asw}`; // backticks
    }
}


