'use strict';
//contains data and javascript for sales.html page

var generateRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var storeHours = [
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

var firstAndPike = {
  locationName: 'First and Pike',
  minCust: 23,
  maxCust: 65,
  avgCookieSale: 6.3,
  randomNumCust: function() {
    return generateRandomNumber(this.minCust, this.maxCust);
  },
  randomNumCustByHour: function() {
    var custByHour = [];
    for (var i = 0; i < storeHours.length; i++) {
      custByHour[i] = this.randomNumCust();
    }
    return custByHour;
  },
  randomCookiesPerHour: function() {
    var cookiesByHour = [];
    var custByHour = this.randomNumCustByHour();
    for (var i = 0; i < custByHour.length; i++) {
      cookiesByHour[i] = Math.floor( custByHour[i]* this.avgCookieSale);
    }

    return cookiesByHour;
  }
};

var seaTacAirport = {
  locationName: 'SeaTac Airport',
  minCust: 3,
  maxCust: 24,
  avgCookieSale: 1.2,
  randomNumCust: function() {
    return generateRandomNumber(this.minCust, this.maxCust);
  },
  randomNumCustByHour: function() {
    var custByHour = [];
    for (var i = 0; i < storeHours.length; i++) {
      custByHour[i] = this.randomNumCust();
    }
    return custByHour;
  },
  randomCookiesPerHour: function() {
    var cookiesByHour = [];
    var custByHour = this.randomNumCustByHour();
    for (var i = 0; i < custByHour.length; i++) {
      cookiesByHour[i] = Math.floor( custByHour[i]* this.avgCookieSale);
    }

    return cookiesByHour;
  }
};

var seattleCenter = {
  locationName: 'Seattle Center',
  minCust: 11,
  maxCust: 38,
  avgCookieSale: 1.2,
  randomNumCust: function() {
    return generateRandomNumber(this.minCust, this.maxCust);
  },
  randomNumCustByHour: function() {
    var custByHour = [];
    for (var i = 0; i < storeHours.length; i++) {
      custByHour[i] = this.randomNumCust();
    }
    return custByHour;
  },
  randomCookiesPerHour: function() {
    var cookiesByHour = [];
    var custByHour = this.randomNumCustByHour();
    for (var i = 0; i < custByHour.length; i++) {
      cookiesByHour[i] = Math.floor( custByHour[i]* this.avgCookieSale);
    }

    return cookiesByHour;
  }
};

var capitolHill = {
  locationName: 'Capitol Hill',
  minCust: 20,
  maxCust: 38,
  avgCookieSale: 4.6,
  randomNumCust: function() {
    return generateRandomNumber(this.minCust, this.maxCust);
  },
  randomNumCustByHour: function() {
    var custByHour = [];
    for (var i = 0; i < storeHours.length; i++) {
      custByHour[i] = this.randomNumCust();
    }
    return custByHour;
  },
  randomCookiesPerHour: function() {
    var cookiesByHour = [];
    var custByHour = this.randomNumCustByHour();
    for (var i = 0; i < custByHour.length; i++) {
      cookiesByHour[i] = Math.floor( custByHour[i]* this.avgCookieSale);
    }

    return cookiesByHour;
  }
};

var alki = {
  locationName: 'Alki',
  minCust: 2,
  maxCust: 16,
  avgCookieSale: 4.6,
  randomNumCust: function() {
    return generateRandomNumber(this.minCust, this.maxCust);
  },

  randomNumCustByHour: function() {
    var custByHour = [];
    for (var i = 0; i < storeHours.length; i++) {
      custByHour[i] = this.randomNumCust();
    }
    return custByHour;
  },
  randomCookiesPerHour: function() {
    var cookiesByHour = [];
    var custByHour = this.randomNumCustByHour();
    for (var i = 0; i < custByHour.length; i++) {
      cookiesByHour[i] = Math.floor( custByHour[i]* this.avgCookieSale);
    }

    return cookiesByHour;
  }
};


var stores = [firstAndPike, seaTacAirport, seattleCenter, capitolHill, alki];

//display on dom for sales page
var salesDiv = document.getElementById('sales-info');

for (var j = 0; j < stores.length; j++){
  var ulElement = document.createElement('ul');

  var h2Element = document.createElement('h2');
  h2Element.textContent = stores[j].locationName;
  salesDiv.appendChild(h2Element);


  var total = 0;
  var cookiesSoldPerHour = stores[j].randomCookiesPerHour();
  for( var k = 0; k < cookiesSoldPerHour.length; k++){
    var liElement = document.createElement('li');
    liElement.textContent = storeHours[k] + ': ' + cookiesSoldPerHour[k] + ' cookies.';
    ulElement.appendChild(liElement);
    total += cookiesSoldPerHour[k];
  }

  liElement = document.createElement('li');
  liElement.textContent = 'Total: ' + total + ' cookies.';
  ulElement.appendChild(liElement);
  salesDiv.appendChild(ulElement);
}
