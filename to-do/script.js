let taskList = [];

function addTask() {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    taskList.push({ text: taskText, editable: false });
    taskInput.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  taskList.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  taskList[index].editable = true;
  renderTasks();
}

function saveTask(index) {
  const editedText = document.getElementById(`edit-task-${index}`).value.trim();
  if (editedText !== "") {
    taskList[index].text = editedText;
    taskList[index].editable = false;
    renderTasks();
  }
}

function renderTasks() {
  const taskListElement = document.getElementById("task-list");
  taskListElement.innerHTML = "";
  taskList.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.editable) {
      li.innerHTML = `
                <input type="text" id="edit-task-${index}" value="${task.text}">
                <button class="save" onclick="saveTask(${index})">Guardar</button>
            `;
    } else {
      li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <button class="edit" onclick="editTask(${index})">Editar</button>
                <button class="delete" onclick="deleteTask(${index})">Borrar</button>
            `;
    }

    taskListElement.appendChild(li);
  });
}
