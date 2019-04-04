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