// Element selectors
const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const tasksContainer = document.querySelector(".tasks");

// Unique ID Generator (UUID function)
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Load todos from Local Storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Save todos to Local Storage
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Toggle the category screen
const toggleScreen = () => {
  wrapper.classList.toggle("show-category");
};

// Event listeners for toggling the screen
menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);

// Function to add a new todo
function addTodo() {
  const newTask = document.getElementById('new-task').value;
  if (newTask.trim()) {
    todos.push({ id: generateUUID(), text: newTask, completed: false });
    document.getElementById('new-task').value = ''; // Clear input field
    saveTodos();
    updateUI();
  } else {
    alert("Please enter a task.");
  }
}

// Function to edit a todo by its ID
function editTodo(id) {
  const taskToEdit = todos.find(task => task.id === id);
  if (taskToEdit) {
    const newText = prompt("Edit your task:", taskToEdit.text);
    if (newText && newText.trim()) {
      taskToEdit.text = newText;
      saveTodos();
      updateUI();
    }
  }
}

// Function to delete a todo by its ID
function deleteTask(id) {
  todos = todos.filter(task => task.id !== id);
  saveTodos();
  updateUI();
}

// Function to mark a task as completed or uncompleted
function toggleCompletion(id) {
  const task = todos.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTodos();
    updateUI();
  }
}

// Function to update the UI based on the todos array
function updateUI() {
  tasksContainer.innerHTML = ''; // Clear existing tasks

  // Loop through todos and append tasks to the UI
  todos.forEach((task) => {
    const taskWrapper = document.createElement('div');
    taskWrapper.classList.add('task-wrapper');

    const taskLabel = document.createElement('label');
    taskLabel.htmlFor = `task-${task.id}`;
    taskLabel.classList.add('task');

    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.id = `task-${task.id}`;
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener("change", () => toggleCompletion(task.id));

    const checkmarkSpan = document.createElement('span');
    checkmarkSpan.classList.add('checkmark');

    const taskText = document.createElement('p');
    taskText.innerText = task.text;
    taskText.classList.toggle('completed', task.completed);

    // Create edit button with click event
    const editButton = document.createElement('div');
    editButton.classList.add('edit');
    editButton.innerHTML = '<img src="/images/edit.svg" alt="Edit" />';
    editButton.addEventListener("click", () => editTodo(task.id));

    // Create delete button with click event
    const deleteButton = document.createElement('div');
    deleteButton.classList.add('delete');
    deleteButton.innerHTML = '<img src="/images/deleteX.svg" alt="Delete" />';
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    // Append elements to the DOM
    taskLabel.appendChild(taskCheckbox);
    taskLabel.appendChild(checkmarkSpan);
    taskLabel.appendChild(taskText);
    taskWrapper.appendChild(taskLabel);
    taskWrapper.appendChild(editButton);
    taskWrapper.appendChild(deleteButton);
    tasksContainer.appendChild(taskWrapper);
  });
}

// Initial UI render
updateUI();
