'use strict';
// This file contains data and javascript for sales.html page
//makes calls to helper functions in app.js

/************************* store global variables *************************/
// grab sales-info div on DOM for to append table
var salesTable = document.getElementById('sales-table');

// all locations for Salmon Cookies Business
var allStoreLocations = [];

//keeps track of totals of all stores for each hour where the index matches index of store hours
var allStoreTotalsByHour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// keeps tack of daily totals for all stores
var totalDaySalesAcrossAllStores = 0;

/******************************** Render Information to sales.html ****************/

var updateSalesTable = function() {
  if (salesTable.innerText === ''){
    // make a column headers for sales data on new page load
    makeTableColumnHeaders(salesTable, allStoreLocations[0]['storeHours'], 'Daily Location Total');

    // display store data on tables
    for (var j = 0; j < allStoreLocations.length; j++){
      allStoreLocations[j].render();
    }

    makeTableColumnFooters(salesTable, allStoreTotalsByHour, totalDaySalesAcrossAllStores);
  } else {
    //delete last row of existing table (footer) 
    var numRowsInTable = salesTable.rows.length;
    salesTable.deleteRow(numRowsInTable - 1);

    //insert new row to update (last element in allStoreLocations array)
    allStoreLocations[allStoreLocations.length - 1].render();

    //insert updated Footer
    makeTableColumnFooters(salesTable, allStoreTotalsByHour, totalDaySalesAcrossAllStores);
  }
};

/******************************** New Store Form Event Handler ****************/

//when user enters data to create new store, all input in collected from form on submit, and sales table is updated
var handleNewStoreSubmit = function(event) {
  event.preventDefault();
  var formData = event.target;
  var newStoreLocationName = formData[1].value;
  var newStoreMinCustomers = parseInt(formData[2].value);
  var newStoreMaxCustomers = parseInt(formData[3].value);
  var newStoreAverageCookieSale = parseFloat(formData[4].value);
  var newStore = new SalmonCookiesStore(newStoreLocationName, newStoreMinCustomers, newStoreMaxCustomers, newStoreAverageCookieSale);
  updateSalesTable();
  newStoreForm.reset();
};

/******************************** New Store Form Event Listeners ****************/

//when user enters data to create new store, all input in collected from form on submit, and sales table is updated
var newStoreForm = document.getElementById('new-store-form');
newStoreForm.addEventListener('submit', handleNewStoreSubmit);


/******************************** Store Constructor ****************/
function SalmonCookiesStore(locationName, minCust, maxCust, avgCookieSale) {
  this.locationName = locationName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSale = avgCookieSale;
  this.totalCookiesByDay = 0;
  this.storeHours = [
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12am',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm',
    '8pm'
  ];

  /********************* methods ************************************/
  // generates an array of simulated customer count per hour of store opening
  this.randomNumCustByHour = function() {
    var custByHour = [];
    for (var i = 0; i < this.storeHours.length; i++) {
      custByHour[i] = generateRandomNumber(this.minCust, this.maxCust);
    }
    return custByHour;
  };

  // generates an array of simulated cookie count per hour of store opening and updates total cookies sold for day
  this.randomCookiesPerHour = function() {
    var cookiesByHour = [];
    var custByHour = this.randomNumCustByHour();
    var totalCookies = 0;
    for (var i = 0; i < custByHour.length; i++) {
      cookiesByHour[i] = Math.floor( custByHour[i] * this.avgCookieSale);
      totalCookies += cookiesByHour[i];
    }

    // update cookies total for the day for this store
    this.totalCookiesByDay = totalCookies;
    return cookiesByHour;
  };

  // renders sales info for store in a table row
  this.render = function() {
    var trEl = createAnElement('tr');
    var tdEl = createAnElement('td');
    addTextContent(tdEl, this.locationName);
    appendElement(trEl, tdEl);

    var cookiesSoldPerHour = this.randomCookiesPerHour();
    for( var k = 0; k < cookiesSoldPerHour.length; k++){
      allStoreTotalsByHour[k] += cookiesSoldPerHour[k];
      totalDaySalesAcrossAllStores += cookiesSoldPerHour[k];
      tdEl = createAnElement('td');
      addTextContent(tdEl, cookiesSoldPerHour[k]);
      appendElement(trEl, tdEl);
    }

    tdEl = createAnElement('td');
    addTextContent(tdEl, this.totalCookiesByDay);
    appendElement(trEl, tdEl);
    appendElement(salesTable, trEl);
  };

  allStoreLocations.push(this);
}

/***************************** when user refreshes page, create simulated data and update table *************/
// create stores
var firstAndPike = new SalmonCookiesStore('First and Pike', 23, 65, 6.3);
var seaTacAirport = new SalmonCookiesStore('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new SalmonCookiesStore('Seattle Center', 11, 38, 3.7);
var capitolHill = new SalmonCookiesStore('Capitol Hill', 20, 38, 2.3);
var alki = new SalmonCookiesStore('Alki', 2, 16, 4.6);

updateSalesTable();
