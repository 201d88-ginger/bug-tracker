'use strict';

// Global Variables
let projectNames = [];
let ownerNames = [];

// DOM References and Element Static Creations
const projectName = document.getElementById('project-name');
const ownerName = document.getElementById('owner-name');
const projectSelector = document.getElementById('projects');
const ownerSelector = document.getElementById('owner');
const bugForm = document.getElementById('submission-form');
const clearBtn = document.getElementById('clear-btn');

// Bug contructor
const Bug = function (projectName, ownerName, priority, type, subject, description) {
  this.projectName = projectName;
  this.ownerName = ownerName;
  this.priority = priority;
  this.type = type;
  this.subject = subject;
  this.description = description;
  this.status = 'Open';

  Bug.allBugs.push(this);
};

Bug.allBugs = []; //Bug.allBugs variable must come after the Bug constructor because of the order of operations.

//Unpacking locally stored data
if(localStorage.getItem('bugPackage') !== null){
  Bug.allBugs = JSON.parse(localStorage.getItem('bugPackage'));
}

if(localStorage.getItem('projectNamesPackage') !== null){
  projectNames = unpackLocalStoarge(projectNames, 'projectNamesPackage', projectSelector, 'Select Project', 'New Project');
}

if(localStorage.getItem('ownerNamesPackage') !== null){
  ownerNames = unpackLocalStoarge(ownerNames, 'ownerNamesPackage', ownerSelector, 'Select Owner', 'New Owner');
}

// Event listeners

projectSelector.addEventListener('change', function(){
  if (projectSelector.options.selectedIndex === 1){
    projectName.style.display = 'block';
    projectName.disabled = false;
  } else {
    projectName.style.display = 'none';
    projectName.disabled = true;
  }
});

ownerSelector.addEventListener('change', function(){
  if (ownerSelector.options.selectedIndex === 1){
    ownerName.style.display = 'block';
    ownerName.disabled = false;
  } else {
    ownerName.style.display = 'none';
    ownerName.disabled = true;
  }
});

clearBtn.addEventListener('click', function(){
  resetInputFields();
});

bugForm.addEventListener('submit', function(event){
  event.preventDefault();

  let tempBug;
  let isDuplicateProjectInput;
  let isDuplicateOwnerInput;
  let areBothSelectorOption;
  let hasPopped;

  if(projectSelector.options.selectedIndex === 1 && ownerSelector.options.selectedIndex === 1){
    tempBug = new Bug(
      bugForm.elements['project-name'].value,
      bugForm.elements['owner-name'].value,
      bugForm.elements['priority'].value,
      bugForm.elements['bug-type'].value,
      bugForm.elements['subject'].value,
      bugForm.elements['description'].value
    );

    isDuplicateProjectInput = checkArrayForEqualBugString(projectNames, tempBug.projectName);
    if(isDuplicateProjectInput){
      if(!hasPopped){
        Bug.allBugs.pop();
        hasPopped = true;
      }
      alert('The project name is a duplicate of another project, please enter another name.');
    }

    isDuplicateOwnerInput = checkArrayForEqualBugString(ownerNames, tempBug.ownerName);
    if(isDuplicateOwnerInput){
      if(!hasPopped){
        Bug.allBugs.pop();
        hasPopped = true;
      }
      alert('The owner name is a duplicate of another owner, please enter another name.');
    }
  } else if (projectSelector.options.selectedIndex !== 1 && ownerSelector.options.selectedIndex === 1){
    tempBug = new Bug(
      bugForm.elements['projects'].value,
      bugForm.elements['owner-name'].value,
      bugForm.elements['priority'].value,
      bugForm.elements['bug-type'].value,
      bugForm.elements['subject'].value,
      bugForm.elements['description'].value
    );

    isDuplicateOwnerInput = checkArrayForEqualBugString(ownerNames, tempBug.ownerName);
    if(isDuplicateOwnerInput){
      if(!hasPopped){
        Bug.allBugs.pop();
        hasPopped = true;
      }
      alert('The owner name is a duplicate of another owner, please enter another name.');
    }

  } else if(projectSelector.options.selectedIndex === 1 && ownerSelector.options.selectedIndex !== 1){
    tempBug = new Bug(
      bugForm.elements['project-name'].value,
      bugForm.elements['owner'].value,
      bugForm.elements['priority'].value,
      bugForm.elements['bug-type'].value,
      bugForm.elements['subject'].value,
      bugForm.elements['description'].value
    );

    isDuplicateProjectInput = checkArrayForEqualBugString(projectNames, tempBug.projectName);
    if(isDuplicateProjectInput){
      if(!hasPopped){
        Bug.allBugs.pop();
        hasPopped = true;
      }
      alert('The project name is a duplicate of another project, please enter another name.');
    }
  } else {
    tempBug = new Bug(
      bugForm.elements['projects'].value,
      bugForm.elements['owner'].value,
      bugForm.elements['priority'].value,
      bugForm.elements['bug-type'].value,
      bugForm.elements['subject'].value,
      bugForm.elements['description'].value
    );
    areBothSelectorOption = true;
  }

  if(!isDuplicateProjectInput && !isDuplicateOwnerInput){

    if(!areBothSelectorOption){
      projectNames.push(tempBug.projectName);
      ownerNames.push(tempBug.ownerName);
    }

    storeAndReset();
    renderCards();
  }
});

// Function

function reloadInputNames() {
  projectNames = unpackLocalStoarge(projectNames, 'projectNamesPackage', projectSelector, 'Select Project', 'New Project');
  ownerNames = unpackLocalStoarge(ownerNames, 'ownerNamesPackage', ownerSelector, 'Select Owner', 'New Owner');
}

function resetInputFields(){
  projectName.style.display = 'none';
  projectName.disabled = true;
  ownerName.style.display = 'none';
  ownerName.disabled = false;
}

function checkArrayForEqualBugString(array, bugObject){
  if(array.length === 0){
    return false;
  } else {
    for(let i = 0; i < array.length; i++){

      if(array[i].toLowerCase() === bugObject.toLowerCase()){
        return true;
      }

      if(i === array.length - 1){
        return false;
      }
    }
  }
}

function storeAndReset() {
  localStorage.setItem('bugPackage', JSON.stringify(Bug.allBugs));
  localStorage.setItem('projectNamesPackage', JSON.stringify(projectNames));
  localStorage.setItem('ownerNamesPackage', JSON.stringify(ownerNames));

  reloadInputNames();
  bugForm.reset();
  resetInputFields();
}

function unpackLocalStoarge (array, localPackageString, domElement, optionOneText, optionTwoText){
  array = JSON.parse(localStorage.getItem(localPackageString));

  while(domElement.firstChild){
    domElement.removeChild(domElement.firstChild);
  }

  const optionOne = document.createElement('option');
  optionOne.text = optionOneText;
  optionOne.setAttribute('value', '');
  optionOne.setAttribute('disabled', true);
  optionOne.setAttribute('selected', true);

  const optionTwo = document.createElement('option');
  optionTwo.text = optionTwoText;
  optionTwo.setAttribute('value', '');

  domElement.appendChild(optionOne);
  domElement.appendChild(optionTwo);

  for(let i = 0; i < array.length; i++){
    let tempProjectOptionElement = document.createElement('option');
    tempProjectOptionElement.text = array[i];
    tempProjectOptionElement.setAttribute('value', array[i]);
    domElement.appendChild(tempProjectOptionElement);
  }

  return array;
}
