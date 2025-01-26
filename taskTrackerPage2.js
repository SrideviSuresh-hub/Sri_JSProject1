const addTaskBtn = document.getElementById("addTaskBtn");
const popup = document.getElementById("popup");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const searchBar = document.getElementById("searchBar");
const searchIcon = document.getElementById("searchIcon");
const searchResultsContainer = document.createElement("div");
searchResultsContainer.id = "searchResultsContainer";
document.body.appendChild(searchResultsContainer);


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




// Modified taskColumnMap to track original order of tasks in each column
const taskColumnMap = new Map();

// The search icon click event (when the user clicks the search icon to filter tasks)
searchIcon.addEventListener("click", () => {
  const query = searchBar.value.toLowerCase();
  const tasks = document.querySelectorAll(".task");

  if (query === "") {
    // When search is cleared, restore all tasks to their original columns
    container.style.display = "flex";

    while (searchResultsContainer.firstChild) {
      const task = searchResultsContainer.firstChild;
      const { column, order } = taskColumnMap.get(task.id);

      // Restore task to its original column in the exact order
      order.forEach((taskId) => {
        const taskToRestore = document.getElementById(taskId);
        column.appendChild(taskToRestore);  // Append task in the correct order
      });

      // Clear the column map after restoring
      taskColumnMap.delete(task.id);
    }
    return;
  }

  // Hide the main container and show the search results
  container.style.display = "none";
  searchResultsContainer.innerHTML = ""; // Clear previous search results

  // Move matching tasks to the search results container
  tasks.forEach((task) => {
    const title = task.querySelector("strong").textContent.toLowerCase();
    if (title.includes(query)) {
      const originalColumn = task.closest(".column");

      // Track the task's original column and order (list of task ids in original order)
      if (!taskColumnMap.has(task.id)) {
        const originalOrder = Array.from(originalColumn.children).map((child) => child.id);
        taskColumnMap.set(task.id, { column: originalColumn, order: originalOrder });
      }

      // Move matching task to the search results container
      searchResultsContainer.appendChild(task);
    }
  });
});


searchResultsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("task")) {
    const taskElement = event.target;
    currentTask = taskElement;
    const title = taskElement.querySelector("strong").textContent;
    const description = taskElement.querySelector("p").textContent;
    const originalColumn = taskColumnMap.get(taskElement.id).column;
    const columnHeading = originalColumn.querySelector("h3").textContent; // Get the column heading (status)

    // Set task details in the popup
    taskTitle.value = title;
    taskDescription.value = description;

    const statusField = document.createElement("input");
    statusField.type = "text";
    statusField.value = columnHeading; // Set the column status
    statusField.disabled = true; // Disable editing the column status field
    statusField.id = "taskStatus";
    const settext = document.getElementById("settext");
    const existingStatusField = document.getElementById("taskStatus");
    if (existingStatusField) {
      settext.removeChild(existingStatusField);
    }
    settext.appendChild(statusField);

    // Disable editing of task fields if the task is in the last column (e.g., "Completed")
    if (originalColumn === document.querySelector(".column:last-child")) {
      taskTitle.disabled = true;
      taskDescription.disabled = true;
    } else {
      taskTitle.disabled = false;
      taskDescription.disabled = false;
    }

    // Show the popup
    popup.style.display = "block";
  }
});


// Event listener for search bar input
searchBar.addEventListener("input", () => {
  if (searchBar.value === "") {
    // Reset display of the main container and restore all tasks
    container.style.display = "flex";

    // Ensure all tasks in the searchResultsContainer are moved back to their original columns
    while (searchResultsContainer.firstChild) {
      const task = searchResultsContainer.firstChild;
      const { column, index } = taskColumnMap.get(task.id);

      // Restore task to its original column and position (index within column)
      // This ensures tasks are inserted back in the correct order
      column.insertBefore(task, column.children[index] || null);

      // Remove from map after restoring
      taskColumnMap.delete(task.id);
    }
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


    
