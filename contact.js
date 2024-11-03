document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");
    const formResponse = document.getElementById("form-response");
    if (!formResponse) {
        console.error("Form response element not found!");
        return; 
    }

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        formResponse.style.display = "block"; 
        contactForm.reset(); 
    });

    console.log("Document loaded. Loading branch data...");
    loadBranchData();
});

function loadBranchData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "branches.xml", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const xml = xhr.responseXML;
                populateBranches(xml);
            } else {
                console.error("Failed to load branches.xml:", xhr.status, xhr.statusText);
            }
        }
    };
    xhr.send();
}

function populateBranches(xml) {
    const branches = xml.getElementsByTagName("branch");
    const branchInfo = document.getElementById("branch-info");
    if (!branchInfo) {
        console.error("Branch info element not found!");
        return; 
    }

    branchInfo.innerHTML = ""; 
    console.log(`Found ${branches.length} branches.`);

    for (let i = 0; i < branches.length; i++) {
        const address = branches[i].getElementsByTagName("address")[0].textContent;
        const contact = branches[i].getElementsByTagName("contact")[0].textContent;
        const openingHours = branches[i].getElementsByTagName("openingHours")[0].textContent;
        const googleMapsLink = branches[i].getElementsByTagName("googleMapsLink")[0].textContent;

        const branchDiv = document.createElement("div");
        branchDiv.className = "branch";
        branchDiv.innerHTML = `
            <h3>Branch ${i + 1}</h3>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Opening Hours:</strong> ${openingHours}</p>
            <p><a href="${googleMapsLink}" target="_blank">View on Google Maps</a></p>
        `;
        branchInfo.appendChild(branchDiv);
    }
}

