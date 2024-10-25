const todoForm = document.getElementById("taskForm");
const todoInput = document.getElementById("inputForm");
const todoList = document.getElementById("list");

let button = document.querySelector(".button");
let buttonText = document.querySelector(".tick");

// SVG for tick mark and red cross
const tickMark ='<svg width="50" height="50" viewBox="0 0 58 45" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" fill-rule="nonzero" d="M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65"/></svg>';
const crossMark = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#fff" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;

buttonText.innerHTML = "Submit";

// Handle button click
button.addEventListener("click", function () {
  todoForm.dispatchEvent(new Event("submit")); // Trigger form submit
});

// Handle form submission
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newTask = todoInput.value;
  if (newTask == "") {
    handleButtonClick(false); // Show red cross if task is empty
    return;
  }
  addTask(newTask);
  todoInput.value = "";
  handleButtonClick(true); // Show tick mark on successful submission
});

function handleButtonClick(success) {
  if (success) {
    buttonText.innerHTML = tickMark;
    button.classList.add("button__circle");
    button.classList.remove("button__error");
  } else {
    buttonText.innerHTML = crossMark;
    button.classList.add("button__error"); // Add a class for error state
    button.classList.remove("button__circle");
  }

  // After 0.5 seconds, reset to submit button
  setTimeout(() => {
    buttonText.innerHTML = "Submit";
    button.classList.remove("button__circle", "button__error");
  }, 500); // Duration of the animation
}

function addTask(newTask) {
  let taskItem = document.createElement("div");
  taskItem.setAttribute("class", "task-item");

  let checkDiv = document.createElement("div");
  checkDiv.setAttribute("class", "checkDiv");
  let checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("class", "chk");
  checkDiv.appendChild(checkBox);
  taskItem.appendChild(checkDiv);

  let textDiv = document.createElement("div");
  textDiv.setAttribute("class", "textDiv");
  const task = document.createElement("p");
  task.textContent = newTask;
  textDiv.appendChild(task);
  taskItem.appendChild(textDiv);

  let editDiv = document.createElement("div");
  editDiv.setAttribute("class", "editDiv");
  let taskEdit = document.createElement("button");
  taskEdit.setAttribute("type", "button");
  taskEdit.setAttribute("class", "edt");
  taskEdit.textContent = "Edit";
  editDiv.appendChild(taskEdit);
  taskItem.appendChild(editDiv);

  todoList.appendChild(taskItem);

  checkBox.addEventListener("change", function () {
    if (this.checked) {
      todoList.removeChild(taskItem);
    }
  });

  taskEdit.addEventListener("click", function () {
    let textEdit = prompt("What do you want to edit?", task.textContent);
    if (textEdit === null) {
      return;
    }
    if (textEdit === "") {
      if (confirm("Do you want to delete it?")) {
        todoList.removeChild(taskItem);
      }
    } else {
      task.textContent = textEdit;
    }
  });
}
