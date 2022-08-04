'use strict';

// Global Variables

let parsedBugs = [];

// DOM References

let bugList = document.getElementById('w3review');
let priority = document.getElementById('priority');
let type = document.getElementById('type');
let owner = document.getElementById('owner-name');
let subject = document.getElementById('subject');
let description = document.getElementById('job-details');

// Local Storage

getLocalStorage();

// Event Listeners


// Functions

function renderBugList() {
  for (let i = 0; i < parsedBugs.length; i++) {
    if (parsedBugs[i].status === 'Closed') {
      let bugItem = document.createElement('li');
      bugItem.setAttribute('class', 'bugs');
      bugItem.setAttribute('id', `${parsedBugs[i].subject}`);
      bugItem.setAttribute('onclick', 'renderBugCard(this.id)');
      bugItem.textContent = `${parsedBugs[i].subject}`;
      bugList.appendChild(bugItem);
    }
  }
}

function getLocalStorage() {
  let storedBugs = localStorage.getItem('bugPackage');
  parsedBugs = JSON.parse(storedBugs);
}

function renderBugCard(clickedID) { // eslint-disable-line
  for (let i = 0; i < parsedBugs.length; i++) {
    if (clickedID === parsedBugs[i].subject) {
      priority.textContent = `Priority: ${parsedBugs[i].priority}`;
      type.textContent = `Bug Type: ${parsedBugs[i].type}`;
      owner.textContent = `Owner: ${parsedBugs[i].ownerName}`;
      subject.textContent = `${parsedBugs[i].subject}`;
      description.textContent = `${parsedBugs[i].description}`;
    }
  }
}

renderBugList();
