'use strict';
// This file contains data and javascript for sales.html page

/************************************ helper functions **************************/
// generates a random number between max and min inclusive
var generateRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// creates a dom element
var createAnElement = function(ele) {
  var element = document.createElement(ele);
  return element;
};

//appends a child element to parent html element
var appendElement = function(parent, child) {
  parent.appendChild(child);
};

// add text content to an html element
var addTextContent = function(ele, text){
  ele.textContent = text;
};

// makes a table header of properties
var makeTableColumnHeaders = function(table, tableHeaderArr, lastColHeader) {
  // create a table row
  var trEl = createAnElement('tr');
  var thEl;

  //make first column of table
  thEl= createAnElement('th');
  addTextContent(thEl, '');
  appendElement(trEl, thEl);

  // add column headings for table
  for (var i = 0; i < tableHeaderArr.length; i++){
    // add new header to the row
    thEl= createAnElement('th');
    addTextContent(thEl, tableHeaderArr[i]);
    appendElement(trEl, thEl);
  }

  // make last column header of table
  thEl= createAnElement('th');
  addTextContent(thEl, lastColHeader);
  appendElement(trEl, thEl);

  // apprend row to the table
  appendElement(table, trEl);
};

var makeTableColumnFooters = function(tableElement, tableData, lastCell) {
  //make new row
  var trEl = createAnElement('tr');
  var tdEl = createAnElement('td');
  addTextContent(tdEl, 'Totals');
  appendElement(trEl, tdEl);

  for( var k = 0; k < tableData.length; k++){
    tdEl = createAnElement('td');
    addTextContent(tdEl, tableData[k]);
    appendElement(trEl, tdEl);
  }

  tdEl = createAnElement('td');
  addTextContent(tdEl, lastCell);
  appendElement(trEl, tdEl);
  appendElement(salesTable, trEl);
};

// grab sales-info div on DOM for to append table
var salesTable = document.getElementById('sales-table');

/************************* store info and constructor *************************/
// all locations for Salmon Cookies Business
var allStoreLocations = [];

//keeps track of totals of all stores for each hour where the index matches index of store hours
var allStoreTotalsByHour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// keeps tack of daily totals for all stores
var totalDaySalesAcrossAllStores = 0;

// Store constructor
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

// create stores
var firstAndPike = new SalmonCookiesStore('First and Pike', 23, 65, 6.3);
var seaTacAirport = new SalmonCookiesStore('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new SalmonCookiesStore('Seattle Center', 11, 38, 3.7);
var capitolHill = new SalmonCookiesStore('Capitol Hill', 20, 38, 2.3);
var alki = new SalmonCookiesStore('Alki', 2, 16, 4.6);


/******************************** Render Information to sales.html ****************/

// make a column headers for sales data
makeTableColumnHeaders(salesTable, allStoreLocations[0]['storeHours'], 'Daily Location Total');

// display store data on tables
for (var j = 0; j < allStoreLocations.length; j++){
  allStoreLocations[j].render();
}

makeTableColumnFooters(salesTable, allStoreTotalsByHour, totalDaySalesAcrossAllStores);

