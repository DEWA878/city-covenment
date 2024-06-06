document.addEventListener("DOMContentLoaded", () => {
  const getLocationButton = document.getElementById("getLocation");

  if (getLocationButton) {
    getLocationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    });
  }

  /// Fetch data from events.json
  fetch("events.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      debugger;
      // Get table body element
      const tableBody = document.getElementById("pricing-data");

      // Loop through each item in the data array
      data.forEach((item) => {
        // Create a table row element
        const row = document.createElement("tr");

        // Create table cells for service and pricing
        const serviceCell = document.createElement("td");
        serviceCell.textContent = item.service;
        const pricingCell = document.createElement("td");
        pricingCell.textContent = item.pricing;

        // Append cells to the row
        row.appendChild(serviceCell);
        row.appendChild(pricingCell);

        // Append row to the table body
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching or parsing data:", error));
});

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Initialize the map
  const map = L.map("map").setView([latitude, longitude], 13);

  // Set up the OpenStreetMap layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add a marker to the map at the user's location
  const marker = L.marker([latitude, longitude]).addTo(map);
  marker.bindPopup("<b>You are here!</b>").openPopup();
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
//Nav toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("show");
});
