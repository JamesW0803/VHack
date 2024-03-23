// Get elements
const buyButton = document.getElementById("buyButton");
const buyDetailsDiv = document.getElementById("buyDetails");
const sellButton = document.getElementById("sellButton");
const sellDetailsDiv = document.getElementById("sellDetails");

// Load existing buy details from localStorage
const existingBuyDetails = JSON.parse(localStorage.getItem("buyDetails")) || [];
const existingSellDetails = JSON.parse(localStorage.getItem("sellDetails")) || [];

// Function to display buy details
function displayBuyDetails() {
    buyDetailsDiv.innerHTML = ""; // Clear previous details
    if (existingBuyDetails.length === 0) {
        buyDetailsDiv.textContent = "Oopsie! Looks like nothing on the selling market for today!";
    } else {
        existingBuyDetails.forEach(detail => {
            const detailContainer = document.createElement("div");
            detailContainer.classList.add("detail-container"); // Add class for styling

            const detailDiv = document.createElement("div");
            detailDiv.innerHTML = `
                <p>Name: ${detail.name}</p>
                <p>Provided Price: ${detail.price}</p>
                <p>Contact Number: ${detail.contact}</p>
                <p>Advertised on: ${detail.date}</p>
            `;
            detailContainer.appendChild(detailDiv);

            buyDetailsDiv.appendChild(detailContainer);
        });
    }
}


// Function to handle adding buy details
function addBuyDetails() {
    const name = prompt("Enter your name:");
    if (name) {
        const price = prompt("Enter provided price (e.g., RM4 per kg):");
        const contact = prompt("Enter contact number:");
        const date = new Date().toLocaleString(); // Get current date and time
        const detail = { name, price, contact, date };
        existingBuyDetails.push(detail);
        localStorage.setItem("buyDetails", JSON.stringify(existingBuyDetails));
        displayBuyDetails();
    }
}

//Function to display sell details
function displaySellDetails() {
    sellDetailsDiv.innerHTML = ""; // Clear previous details
    if (existingSellDetails.length === 0) {
        sellDetailsDiv.textContent = "Oopsie! Looks like nothing on the selling market for today!";
    } else {
        existingSellDetails.forEach(detail => {
            const detailContainer = document.createElement("div");
            detailContainer.classList.add("detail-container"); // Add class for styling

            const detailDiv = document.createElement("div");
            detailDiv.innerHTML = `
                <p>Name: ${detail.name}</p>
                <p>Price: ${detail.price}</p>
                <p>Contact Number: ${detail.contact}</p>
                <p>Location: ${detail.location}</p>
                <p>Advertised on: ${detail.date}</p>
            `;
            detailContainer.appendChild(detailDiv);

            sellDetailsDiv.appendChild(detailContainer);
        });
    }
}

// Function to handle adding sell details
function addSellDetails() {
    const name = prompt("Enter your name:");
    if (name) {
        const price = prompt("Enter price (e.g., RM5 per kg):");
        const contact = prompt("Enter contact number:");
        const location = prompt("Enter location:");
        const date = new Date().toLocaleString(); // Get current date and time
        const detail = { name, price, contact, location, date };
        existingSellDetails.push(detail);
        localStorage.setItem("sellDetails", JSON.stringify(existingSellDetails));
        displaySellDetails();
    }
}

// Add event listener to Buy Item button
buyButton.addEventListener("click", addBuyDetails);

// Display existing buy details on page load
displayBuyDetails();

// Add event listener to Sell Item button
sellButton.addEventListener("click", addSellDetails);

// Display existing sell details on page load
displaySellDetails();

// Remove an item from local storage
// localStorage.removeItem("sellDetails");

// Function to clear buy details from local storage and display
function clearBuyDetails() {
    localStorage.removeItem("buyDetails"); // Remove buy details from local storage
    displayBuyDetails(); // Update the displayed buy details to reflect the removal
}

// Add event listener to the Clear button
const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearBuyDetails);


