'use strict';

const toDoForm = document.getElementById('toDoForm');
const toDoNameInput = document.getElementById('toDoName');
const descriptionInput = document.getElementById('description');

const link = 'https://crudcrud.com/api/29f7b67b5e764ad09af289c890462bd1/addToList';

toDoForm.addEventListener('submit', addToDo);

async function addToDo(event) {
  event.preventDefault();

  const toDoName = toDoNameInput.value;
  const description = descriptionInput.value;

  if (toDoName.trim() === '') {
    alert('Please enter a to-do name.');
    return;
  }

  const toDoData = {
    toDoName,
    description,
  };

  try {
    const response = await axios.post(link, toDoData);
    const createdToDo = response.data;
    displayToDoItem(createdToDo);
  } catch (error) {
    console.error(error);
  }

  toDoNameInput.value = '';
  descriptionInput.value = '';
}

function displayToDoItem(toDo) {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${toDo.toDoName}</strong>: ${toDo.description}`;

  const crossButton = document.createElement('button');
  crossButton.innerHTML = '&#10006;';
  crossButton.classList.add('cross-button');

  crossButton.addEventListener('click', async () => {
    try {
      await axios.delete(`${link}/${toDo._id}`);
      li.remove();
    } catch (error) {
      console.error(error);
    }
  });

  const tickButton = document.createElement('button');
  tickButton.innerHTML = '&#10004;';
  tickButton.classList.add('tick-button');

  tickButton.addEventListener('click', () => {
    moveToDoItemToDone(toDo, li);
  });

  li.appendChild(tickButton);
  li.appendChild(crossButton);
  document.getElementById('toDoList').appendChild(li);
}

function moveToDoItemToDone(toDo, item) {
    const newDoneItem = document.createElement('li');
    newDoneItem.textContent = `${toDo.toDoName}: ${toDo.description}`;
  
    item.remove();
    document.getElementById('tododone').appendChild(newDoneItem);
  }
  

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await axios.get(link);
    response.data.forEach((toDo) => {
      displayToDoItem(toDo);
    });
  } catch (error) {
    console.error(error);
  }
});
