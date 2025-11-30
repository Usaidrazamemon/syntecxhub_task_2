const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAll = document.getElementById("clearAll");

document.addEventListener("DOMContentLoaded", showTasks);
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  if (!taskInput.value.trim()) return;
  
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskInput.value, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  
  taskInput.value = "";
  showTasks();
}

function showTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">
        ${task.text}
      </span>
      <span class="delete-btn" onclick="deleteTask(${index})">🗑</span>
    `;

    li.addEventListener("click", () => toggleComplete(index));
    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

clearAll.addEventListener("click", () => {
  localStorage.clear();
  showTasks();
});