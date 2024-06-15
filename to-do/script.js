// TODO: obtener el valor de la tarea y agregarla a la lista

let input = document.getElementById("inputTask");
let button = document.getElementById("addTask");
let tasks = document.getElementById("tasks");

function handleClick(e) {
  if (!input.value) return;
  let nodeList = document.createElement("li");
  nodeList.textContent = input.value;
  tasks.appendChild(nodeList);

  input.value = "";
}

button.addEventListener("click", handleClick);
