// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $resetBtn = document.querySelector("#reset");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$resetBtn.addEventListener("click", resetData);

// Set filteredData to dataSet initially
var filteredData = data;
// Set resetData to dataSet 
var resetData = data;

// renderTable renders the filteredData to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredData.length; i++) {
    // Get get the current data object and its fields
    var sighting = filteredData[i];
    var fields = Object.keys(sighting);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the data object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
}

function handleSearchButtonClick(event) {
  // prevent page from refreshing
  event.preventDefault();

  var filterDate = $dateInput.value.trim();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  if (filterDate != "") {
    filteredData = dataSet.filter(function (sighting) {
      var sightingDate = sighting.datetime;
      return sightingDate === filterDate;
    });
};

  
  if (filterCity !="") {
    filteredData = filteredData.filter(function(sighting) {
      var sightingCity = sighting.city.toLowerCase();
      return sightingCity === filterCity;
    });
  };

  if (filterState !="") {
    filteredData = filteredData.filter(function(sighting) {
      var sightingState = sighting.state.toLowerCase();
      return sightingState === filterState;
    });
  };

  if (filterCountry!="") {
    filteredData = filteredData.filter(function(sighting) {
      var sightingCountry = sighting.country.toLowerCase();
      return sightingCountry === filterCountry;
    });
  };

  if (filterShape) {
    filteredData = filteredData.filter(function(sighting) {
      var sightingShape = sighting.shape.toLowerCase();
      return sightingShape === filterShape;
    });
  };

    renderTable();
  }
function resetData() {
  filteredData = dataSet;
  $dateInput.value = "";
  $cityInput.value = "";
  $stateInput.value = "";
  $countryInput.value = "";
  $shapeInput.value = "";
  renderTable();
}

function resetForm() {
  document.getElementById("myForm").reset();
}

// Render the table for the first time on page load
renderTable();

