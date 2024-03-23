// Load JSON data
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const itemContainer = document.getElementById("itemContainer");

        // Function to generate item detail boxes based on search query
        function generateItemBoxes(searchTerm) {
            itemContainer.innerHTML = ""; // Clear previous results

            // Filter items based on search query
            const filteredItems = data.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Generate item detail boxes for filtered items
            filteredItems.forEach(item => {
                const itemBox = document.createElement("a");
                itemBox.href = "hubdetail.html"; // Link to detail page
                itemBox.classList.add("item-detail-box");

                const itemImage = document.createElement("div");
                itemImage.classList.add("item-image");
                const img = document.createElement("img");
                img.src = item.image; // Set item image
                img.alt = item.name;
                itemImage.appendChild(img);
                itemBox.appendChild(itemImage);

                const itemDetails = document.createElement("div");
                itemDetails.classList.add("item-details");
                
                const tags = item.tag.split(","); // Split tags by comma if multiple tags exist
                tags.forEach(tag => {
                    const tagElement = document.createElement("span");
                    tagElement.classList.add("item-tag");
                    tagElement.textContent = tag.trim(); // Remove whitespace
                    if (tag.trim().toLowerCase() === "sales") {
                        tagElement.style.backgroundColor = "red";
                    } else if (tag.trim().toLowerCase() === "new") {
                        tagElement.style.backgroundColor = "green";
                    }
                    itemDetails.appendChild(tagElement);
                });
                const itemName = document.createElement("h3");
                itemName.classList.add("item-name");
                itemName.textContent = item.name;
                itemDetails.appendChild(itemName);
                const itemLocation = document.createElement("p");
                itemLocation.classList.add("item-location");
                const locationIcon = document.createElement("img");
                locationIcon.src = "/images/location.png"; // Location icon
                locationIcon.alt = "Location Icon";
                itemLocation.appendChild(locationIcon);
                itemLocation.innerHTML += item.location; // Set item location
                itemDetails.appendChild(itemLocation);
                const itemPrice = document.createElement("p");
                itemPrice.classList.add("item-price");
                // const priceIcon = document.createElement("img");
                // priceIcon.src = "/images/price.png";
                // priceIcon.alt = "Price Icon";
                // itemPrice.appendChild(priceIcon);
                itemPrice.textContent = "Price: " + item.price;
                itemDetails.appendChild(itemPrice);
                const bookmarkIcon = document.createElement("div");
                bookmarkIcon.classList.add("bookmark-icon");
                const bookmarkImg = document.createElement("img");
                bookmarkImg.src = "bookmark-icon.png"; // Bookmark icon
                bookmarkImg.alt = "Bookmark Icon";
                bookmarkIcon.appendChild(bookmarkImg);
                itemDetails.appendChild(bookmarkIcon);

                itemBox.appendChild(itemDetails);
                itemContainer.appendChild(itemBox);
            });
        }

        // Initial generation of item detail boxes
        generateItemBoxes("");

        // Event listener for search input
        document.getElementById("searchInput").addEventListener("input", function() {
            generateItemBoxes(this.value);
        });
    })
    .catch(error => console.error("Error fetching data:", error));
