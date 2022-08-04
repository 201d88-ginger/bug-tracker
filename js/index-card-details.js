'use strict';

//DOM references
let sheetContainer = document.getElementById('sheet-container');
let sheetName = document.getElementById('sheet-name');
let sheetOwner = document.getElementById('sheet-owner');
let sheetPriority = document.getElementById('sheet-priority');
let sheetType = document.getElementById('sheet-type');
let sheetSubject = document.getElementById('sheet-subject');
let sheetDetails = document.getElementById('sheet-details');
let sheetCloseBtn = document.getElementById('sheet-close-btn');
sheetCloseBtn.setAttribute('onClick', 'closeBug(this.id)');

//Render bug data on details sheet
function showDetails(id){

  sheetName.textContent = allBugCards[id].projectName;
  sheetOwner.textContent = allBugCards[id].ownerName;
  sheetPriority.textContent = `Priority ${allBugCards[id].priority}`;
  sheetType.textContent = `Type: ${allBugCards[id].type}`;
  sheetSubject.textContent = allBugCards[id].subject;
  sheetDetails.textContent = allBugCards[id].description;

  sheetCloseBtn.id = id;

  if(sheetCloseBtn.hidden === true){
    sheetCloseBtn.disabled = false;
    sheetCloseBtn.hidden = false;
  }
}

//Close bugs in the Bug.allbugs
function closeBug(clickedID){
  Bug.allBugs[+clickedID].status = 'Closed';
  localStorage.setItem('bugPackage', JSON.stringify(Bug.allBugs));
  clearSheet();
  renderCards();
}

//Clear the data from the details sheet
function clearSheet(){
  sheetName.textContent = '';
  sheetOwner.textContent = '';
  sheetPriority.textContent = '';
  sheetType.textContent = '';
  sheetSubject.textContent = '';
  sheetDetails.textContent = '';

  sheetCloseBtn.disabled = true;
  sheetCloseBtn.hidden = true;
}
