'use strict';

//Global variables
let allBugCards = [];

//DOM references
let bugContainer = document.getElementById('bug-container');

//Render open bugs to bugs cards on page refresh
renderCards();

//Renderer
function renderCards() {
  while(bugContainer.firstChild){
    bugContainer.firstChild.remove();
  }

  if(localStorage.getItem('bugPackage') !== null){
    allBugCards = JSON.parse(localStorage.getItem('bugPackage'));
  }

  for (let i = 0; i < allBugCards.length; i++) {
    if (allBugCards[i].status === 'Open') {
      let bugCard = document.createElement('div');
      bugCard.classList.add('bug-card');
      bugCard.id = i;
      bugCard.setAttribute('onClick', 'showDetails(this.id)');

      let pProjectTitle = document.createElement('p');
      pProjectTitle.classList.add('project-title');
      pProjectTitle.textContent = allBugCards[i].projectName;

      let pBugName = document.createElement('p');
      pBugName.classList.add('bug-name');
      pBugName.textContent = allBugCards[i].subject;

      let pBugPriority = document.createElement('p');
      pBugPriority.classList.add('bug-priority');
      pBugPriority.textContent = `Priority: ${allBugCards[i].priority}`;

      bugContainer.appendChild(bugCard);
      bugCard.appendChild(pProjectTitle);
      bugCard.appendChild(pBugName);
      bugCard.appendChild(pBugPriority);
    }
  }
}



