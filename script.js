
// Calculate interest rate for a certain amount of years
function calculate_interest_rate() {
    console.clear()
    document.getElementById("output_interest_rate").innerHTML = "";

    let amount = document.getElementById("amount").value;
    let interest = document.getElementById("interest_rate").value;
    let years = document.getElementById("interest_rate_years").value;
    let current_year = new Date().getFullYear()
    interest = 1 + (interest / 100)

    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
        document.getElementById("output_interest_rate").innerHTML = "<p>Use numbers only!</p>"
        document.getElementById("calculate_interest").className = "warning"
        return
    }

    document.getElementById("calculate_interest").className = ""

    for (let i = 0; i < years; i++) {
        amount *= interest;
        document.getElementById("output_interest_rate").innerHTML += "<p>" + "Year " + Number(current_year + i) + ": " +
            ("$" + amount.toFixed(2)) + "</p>";
    }
}