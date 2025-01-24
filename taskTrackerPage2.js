const addTaskBtn = document.getElementById("addTaskBtn");
const popup = document.getElementById("popup");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");

let currentTask = null;
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function createColumns() {
  const container = document.getElementById("container");
  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "column";
    const heading = document.createElement("h3");
    heading.textContent = task;
    div.appendChild(heading);
    container.appendChild(div);
  });

 
  const columns = document.querySelectorAll('.column');
  columns.forEach(column => {
    column.addEventListener('dragover', handleDragOver);
    column.addEventListener('drop', handleDrop);
  });
}

addTaskBtn.addEventListener("click", () => {
  popup.style.display = "block";
  currentTask = null;
});

cancelTaskBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

saveTaskBtn.addEventListener("click", () => {
  const title = taskTitle.value;
  const description = taskDescription.value;

  if (title === "") {
    alert("Title is required");
    return;
  }

  if (currentTask) {
   
    currentTask.querySelector("strong").textContent = title;
    currentTask.querySelector("p").textContent = description;

    const taskIndex = tasks.findIndex(task => task.id === currentTask.id);
    if (taskIndex !== -1) {
      tasks[taskIndex].title = title;
      tasks[taskIndex].description = description;
    }
  } else {
   
    const task = document.createElement("div");
    task.classList.add("task");
    task.draggable = true;
    task.innerHTML = `<strong>${title}</strong><p class="hidden">${description}</p>`;
    task.id = `task-${Date.now()}`;
    task.addEventListener('dragstart', handleDragStart);
    task.addEventListener('dragend', handleDragEnd);

    document.querySelector(".column").appendChild(task);
    tasks.push({ id: task.id, title, description });
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  popup.style.display = "none";
  taskTitle.value = "";
  taskDescription.value = "";
  currentTask = null;
});

const container = document.getElementById("container");

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("task")) {
    const taskElement = event.target;
    currentTask = taskElement;
    const title = taskElement.querySelector("strong").textContent;
    const description = taskElement.querySelector("p").textContent;
    const columnHeading = event.target.closest(".column").querySelector("h3").textContent;

    taskTitle.value = title;
    taskDescription.value = description;

    const statusField = document.createElement("input");
    statusField.type = "text";
    statusField.value = columnHeading;
    statusField.disabled = true;
    statusField.id = "taskStatus";
    const settext = document.getElementById("settext");
    const existingStatusField = document.getElementById("taskStatus");
    if (existingStatusField) {
      settext.removeChild(existingStatusField);
    }
    settext.appendChild(statusField);

    if (event.target.closest('.column:last-child')) {
      taskTitle.disabled = true;
      taskDescription.disabled = true;
    } else {
      taskTitle.disabled = false;
      taskDescription.disabled = false;
    }

    popup.style.display = "block";
  }
});

const searchBar = document.getElementById("searchBar");
const searchIcon = document.getElementById("searchIcon");

searchIcon.addEventListener("click", () => {
  const query = searchBar.value.toLowerCase();
  const tasks = document.querySelectorAll('.task');

  const searchResultsContainer = document.getElementById("searchResultsContainer");
  if (searchResultsContainer) {
    searchResultsContainer.remove();
  }

  if (query === "") {
    container.style.display = "flex";
    tasks.forEach((task) => task.style.display = "block");
    return;
  }

  container.style.display = "none";

  const newSearchResultsContainer = document.createElement("div");
  newSearchResultsContainer.id = "searchResultsContainer";
  taskWrapper.appendChild(newSearchResultsContainer);

  tasks.forEach((task) => {
    const title = task.querySelector("strong").textContent.toLowerCase();
    if (title.includes(query)) {
      newSearchResultsContainer.appendChild(task);
    }
  });
});

searchBar.addEventListener("input", () => {
  if (searchBar.value === "") {
    container.style.display = "flex";
    const searchResultsContainer = document.getElementById("searchResultsContainer");
    if (searchResultsContainer) {
      searchResultsContainer.remove();
    }
    const tasks = document.querySelectorAll('.task');
    tasks.forEach((task) => {
      task.style.display = "block";
    });
  }
});

function handleDragStart(event) {
  event.currentTarget.classList.add("dragging");
  event.dataTransfer.setData("text/plain", event.currentTarget.id);
  setTimeout(() => {
    event.currentTarget.style.display = "none";
  }, 0);
}

function handleDragEnd(event) {
  event.currentTarget.classList.remove("dragging");
  event.currentTarget.style.display = "block";
}

function handleDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add("drag-over");
}

function handleDrop(event) {
  event.currentTarget.classList.remove("drag-over");
  const taskId = event.dataTransfer.getData("text/plain");
  const draggedTask = document.getElementById(taskId);
  
  event.currentTarget.appendChild(draggedTask);
  draggedTask.style.display = "block";

  if (event.currentTarget === document.querySelector(".column:last-child")) {
    draggedTask.setAttribute("draggable", "false");
  }

  updateTasksLocalStorage();
}

function updateTasksLocalStorage() {
  const updatedTasks = [];
  const columns = document.querySelectorAll(".column");
  columns.forEach(column => {
    column.querySelectorAll(".task").forEach(task => {
      updatedTasks.push({
        id: task.id,
        title: task.querySelector("strong").textContent,
        description: task.querySelector("p").textContent
      });
    });
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

const tasksElements = document.querySelectorAll(".task");
tasksElements.forEach(task => {
  task.addEventListener("dragstart", handleDragStart);
  task.addEventListener("dragend", handleDragEnd);
});

const columns = document.querySelectorAll(".column");
columns.forEach(column => {
  column.addEventListener("dragover", handleDragOver);
  column.addEventListener("drop", handleDrop);
});

window.onload = createColumns;


    