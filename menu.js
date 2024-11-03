document.addEventListener("DOMContentLoaded", function() {
    console.log("Document loaded. Loading menu data...");
    loadMenuData();
});

function loadMenuData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "menu.xml", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xml = xhr.responseXML;
            populateMeals(xml);
            populateBeverages(xml);
            populateOtherBeverages(xml);
        }
    };
    xhr.send();
}

function populateMeals(xml) {
    const meals = xml.getElementsByTagName("meals")[0].getElementsByTagName("mealItem");
    const mealsTable = document.getElementById("meals-table").getElementsByTagName("tbody")[0];

    console.log("Number of meals found:", meals.length);

    for (let i = 0; i < meals.length; i++) {
        const nameElement = meals[i].getElementsByTagName("name")[0];
        const priceElement = meals[i].getElementsByTagName("price")[0];
        const descriptionElement = meals[i].getElementsByTagName("description")[0];
        const imageElement = meals[i].getElementsByTagName("image")[0]; // Get image element

        const name = nameElement ? nameElement.textContent : "Unknown Dish";
        const price = priceElement ? priceElement.textContent : "N/A";
        const description = descriptionElement ? descriptionElement.textContent : "No description available.";
        const image = imageElement ? imageElement.textContent : ""; // Get image filename

        const row = mealsTable.insertRow();
        row.insertCell(0).textContent = name;
        row.insertCell(1).textContent = price;
        row.insertCell(2).textContent = description;

        // Create image cell
        const imgCell = row.insertCell(3); // Add a fourth cell for the image
        imgCell.innerHTML = `<img src="${image}" alt="${name}" width="90">`; // Display image
    }
}



function populateBeverages(xml) {
    const categories = xml.getElementsByTagName("beverages")[0].getElementsByTagName("category");
    const beveragesTable = document.getElementById("beverages-table").getElementsByTagName("tbody")[0];

    for (let i = 0; i < categories.length; i++) {
        const items = categories[i].getElementsByTagName("beverageItem");
        for (let j = 0; j < items.length; j++) {
            const size = items[j].getElementsByTagName("size")[0].textContent;
            const price = items[j].getElementsByTagName("price")[0].textContent;
            const description = items[j].getElementsByTagName("description")[0] ? items[j].getElementsByTagName("description")[0].textContent : "";
            const imageElement = items[j].getElementsByTagName("image")[0]; // Get image element
            const image = imageElement ? imageElement.textContent : ""; // Get image filename

            const row = beveragesTable.insertRow();
            row.insertCell(0).textContent = size;
            row.insertCell(1).textContent = price;
            row.insertCell(2).textContent = description;

            // Create image cell
            const imgCell = row.insertCell(3); // Add a fourth cell for the image
            imgCell.innerHTML = `<img src="${image}" alt="${size}" width="50">`; // Display image
        }
    }
}



function populateOtherBeverages(xml) {
    const otherBeverages = xml.getElementsByTagName("otherBeverages")[0].getElementsByTagName("otherBeverageItem");
    const otherBeveragesTable = document.getElementById("other-beverages-table").getElementsByTagName("tbody")[0];

    for (let i = 0; i < otherBeverages.length; i++) {
        const name = otherBeverages[i].getElementsByTagName("name")[0].textContent;
        const price = otherBeverages[i].getElementsByTagName("price")[0].textContent;
        const imageElement = otherBeverages[i].getElementsByTagName("image")[0]; // Get image element
        const image = imageElement ? imageElement.textContent : ""; // Get image filename

        const row = otherBeveragesTable.insertRow();
        row.insertCell(0).textContent = name;
        row.insertCell(1).textContent = price;

        // Create image cell
        const imgCell = row.insertCell(2); // Add a third cell for the image
        imgCell.innerHTML = `<img src="${image}" alt="${name}" width="50">`; // Display image
    }
}

