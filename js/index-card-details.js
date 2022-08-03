'use strict';

//Global variables
// let allBugCards = [];

//DOM references

let bugDetailsCtx = document.getElementById('bug-details-context');
let bugName = document.getElementById('bug-name');
let bugOwner = document.getElementById('bug-owner');
let bugPriority = document.getElementById('bug-priority');
let bugType = document.getElementById('bug-type');
let bugSubject = document.getElementById('bug-subject');
let bugDetails = document.getElementById('bug-details');

// let closeBtn = document.createElement('button');
// closeBtn.classList.add('close-btn');
// closeBtn.id = i;
// closeBtn.textContent = 'Close Bug';
// closeBtn.setAttribute('onClick', 'closeBug(this.id)');
// bugCard.appendChild(closeBtn);

function showDetails(id){ // eslint-disable-line
  bugName.textContent = allBugCards[id].projectName;
  bugOwner.textContent = allBugCards[id].ownerName;
  bugPriority.textContent = allBugCards[id].priority;
  bugType.textContent = allBugCards[id].type;
  bugSubject.textContent = allBugCards[id].subject;
  bugDetails.innerHTML = allBugCards[id].description;
}

