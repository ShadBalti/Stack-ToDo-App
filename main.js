const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");

const backBtn = document.querySelector(".back-btn");

const toggleScreen = () => {
  wrapper.classList.toggle("show-category");
};
menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);

// Sample todos array
let todos = [
  { id: 1, text: 'Buy a new car' },
  // Add more todos as needed
];

// Function to add a new todo
function addTodo() {
  const newTask = document.getElementById('new-task').value;
  todos.push({ id: todos.length + 1, text: newTask });
  updateUI();
}

// Function to edit a todo
function editTodo() {
  const editTask = document.getElementById('edit-task').value;
  // Implement logic to update the selected task in the todos array
  // For simplicity, let's assume you're editing the first task
  todos[0].text = editTask;
  updateUI();
}

// Function to delete a todo
function deleteTask() {
  // Implement logic to delete the selected task from the todos array
  // For simplicity, let's assume you're deleting the first task
  todos.shift();
  updateUI();
}

// Function to update the UI based on the todos array
function updateUI() {
  const tasksContainer = document.querySelector('.tasks');
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

    const checkmarkSpan = document.createElement('span');
    checkmarkSpan.classList.add('checkmark');

    const taskText = document.createElement('p');
    taskText.innerText = task.text;

    const deleteButton = document.createElement('div');
    deleteButton.classList.add('delete');
    deleteButton.innerHTML = '<img src="/images/deleteX.svg" alt="" />';

    // Append elements to the DOM
    taskLabel.appendChild(taskCheckbox);
    taskLabel.appendChild(checkmarkSpan);
    taskLabel.appendChild(taskText);
    taskWrapper.appendChild(taskLabel);
    taskWrapper.appendChild(deleteButton);
    tasksContainer.appendChild(taskWrapper);
  });
    }
