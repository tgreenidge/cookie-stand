/************************************ Index.html js **************************/

var cookieCutterImageDiv = document.getElementById('cookie-cutter');

// changes image from cookie cutter to cookie on mouseover
var handleChangeCookieCutterImage = function() {
  var cookieCutterImage = cookieCutterImageDiv.getElementsByTagName('img')[0];
  if(cookieCutterImage.getAttribute('src') === 'https://raw.githubusercontent.com/codefellows/seattle-201d56/master/class-09/lab-b/assets/cutter.jpeg') {
    cookieCutterImage.src = 'https://raw.githubusercontent.com/codefellows/seattle-201d56/master/class-09/lab-b/assets/frosted-cookie.jpg';
  } else {
    cookieCutterImage.src = 'https://raw.githubusercontent.com/codefellows/seattle-201d56/master/class-09/lab-b/assets/cutter.jpeg';
  }
};

// only do the following if cookie cutter image is on page
if (cookieCutterImageDiv) {
  cookieCutterImageDiv.addEventListener('mouseover', handleChangeCookieCutterImage);  
  cookieCutterImageDiv.addEventListener('mouseout', handleChangeCookieCutterImage);
}



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