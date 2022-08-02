'use strict';

// Global
Bug.allBugs = [];

// DOM References
const projectSelector = document.getElementById('projects');
const ownerSelector = document.getElementById('owner');
const bugForm = document.getElementById('submission-form');

// Bug contructor
const Bug = function (projectName, owner, priority, type, subject, description) {
  this.projectName = projectName;
  this.owner = owner;
  this.priority = priority;
  this.type = type;
  this.subject = subject;
  this.description = description;
  this.status = 'Open';

  Bug.allBugs.push(this);
};

// Event listeners

projectSelector.addEventListener('change', function(){
  if (projectSelector.options.selectedIndex === 1){
    let projectName = document.getElementById('project-name');
    projectName.disabled = false;
  }
});

ownerSelector.addEventListener('change', function(){
  if (ownerSelector.options.selectedIndex === 1){
    let ownerName = document.getElementById('owner-name');
    ownerName.disabled = false;
  }
});

bugForm.addEventListener('submit', function(event){
  event.preventDefault();

  console.log(bugForm.elements['priority'].value);

  new Bug(
    bugForm.elements['project-name'].value,
    bugForm.elements['owner-name'].value,
    bugForm.elements['priority'].value,
    bugForm.elements['bug-type'].value,
    bugForm.elements['subject'].value,
    bugForm.elements['description'].value
  );

  // console.log(bugForm.elements['subject'].value);
  // console.log(projectSelector.options[projectSelector.options.selectedIndex].text);
});

new Bug('myProject', 'A', 'audio', 'open', 'stephen', 'my subject', 'this is a descripton');

