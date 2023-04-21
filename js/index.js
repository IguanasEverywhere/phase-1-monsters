const monsterContainer = document.querySelector('#monster-container');
const createMonsterForm = document.querySelector('#create-monster-form');
const forwardBtn = document.querySelector('#forward');
const backBtn = document.querySelector('#back');

let pageNumber = 1;



// FETCH FIRST 50 MONSTERS AT SPECIFIED PAGE
function fetchMonsters(pageNum) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(monster => {
      displayMonsterObj(monster)
    }));
}
fetchMonsters(pageNumber);



// MAKE A MONSTER OBJECT READY FOR DISPLAY AND APPEND TO DOM
function displayMonsterObj(monster) {
  let monsterDiv = document.createElement('div');
  monsterDiv.classList.add('monster-div')
  let monsterNameHeader = document.createElement('h3');
  let monsterAgeHeader = document.createElement('h5');
  let monsterDescriptionP = document.createElement('p');

  monsterNameHeader.textContent = monster.name;
  monsterAgeHeader.textContent = monster.age;
  monsterDescriptionP.textContent = monster.description;

  monsterDiv.append(monsterNameHeader);
  monsterDiv.append(monsterAgeHeader);
  monsterDiv.append(monsterDescriptionP);

  monsterContainer.append(monsterDiv);
}

// HANDLE MONSTER FORM SUBMISSION
createMonsterForm.addEventListener('submit', handleNewMonsterSubmission);

function handleNewMonsterSubmission(e) {
  e.preventDefault();
  let newMonsterName = document.querySelector('#monster-name-input').value;
  let newMonsterAge = document.querySelector('#monster-age-input').value;
  let newMonsterDescription = document.querySelector('#monster-description-input').value;
  let newMonsterObj = {
    name: newMonsterName,
    age: newMonsterAge,
    description: newMonsterDescription,
  }

  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newMonsterObj)
  })
    .then(res => res.json())
    .then(newMonsterData => displayMonsterObj(newMonsterData))
}

forwardBtn.addEventListener('click', () => {
  pageNumber++;
  monsterContainer.innerHTML = '';
  fetchMonsters(pageNumber);
})

backBtn.addEventListener('click', () => {
  pageNumber--;
  monsterContainer.innerHTML = '';
  fetchMonsters(pageNumber);
})

