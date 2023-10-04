'use strict';

// Creating element variables
const toDoForm = document.getElementById('toDoForm');
const toDoNameInput = document.getElementById('toDoName');
const descriptionInput = document.getElementById('description');
const toDoList = document.getElementById('toDoList');

const link = 'https://crudcrud.com/api/a486394b3d7f4731abd853dcffe34050/addToList';

// Load initial data when the page is loaded
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await axios.get(link);
    response.data.forEach((toDo) => {
      // Load initial data here
      displayToDoItem(toDo);
    });
  } catch (error) {
    console.error(error);
  }
});

// Add an event listener to the form for form submission
toDoForm.addEventListener('submit', addToDo);

// Function to handle form submission
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

  // Clear form inputs
  toDoNameInput.value = '';
  descriptionInput.value = '';
}

// Function to display a To-Do item
function displayToDoItem(toDo) {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${toDo.toDoName}</strong>: ${toDo.description}`;

  const crossButton = document.createElement('button');
  crossButton.innerHTML = '&#10006;'; // X character
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
    moveToDoItemToBottom(li);
  });

  li.appendChild(tickButton);
  li.appendChild(crossButton);
  toDoList.appendChild(li);
}

// Function to move a completed To-Do item to the bottom of the list
function moveToDoItemToBottom(item) {
    item.remove();
    toDoList.appendChild(item);
  }
  