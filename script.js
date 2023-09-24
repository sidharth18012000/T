const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
let tasks = []; // Array to store tasks

// Check if there are saved tasks in localStorage
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    displayTasks();
}
//this for adding the list
function addTodo() {
    const taskText = todoInput.value.trim();
    if (taskText === '') return;

    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTasks();
    todoInput.value = '';
}
//this is for editing the task
function editTodo(button) {
    const li = button.parentElement;
    const span = li.querySelector('span');
    const newText = prompt('Edit task:', span.innerText);
    if (newText !== null) {
        const index = Array.from(todoList.children).indexOf(li);
        tasks[index].text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}
//this is for deleting the task
function deleteTodo(button) {
    const li = button.parentElement;
    const index = Array.from(todoList.children).indexOf(li);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}
//this is for making the task as completed
function completeTodo(button) {
    const li = button.parentElement;
    const index = Array.from(todoList.children).indexOf(li);
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}
//for diskplaying the taks.
function displayTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="editTodo(this)">Edit</button>
            <button onclick="deleteTodo(this)">Delete</button>
            <button onclick="completeTodo(this)">${task.completed ? 'Uncomplete' : 'Complete'}</button>
        `;
        todoList.appendChild(li);
    });
}
