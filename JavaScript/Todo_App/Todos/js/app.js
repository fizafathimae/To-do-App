// task display div to view current tasks
const tasksDisplay = document.querySelector("#tasks");

// grab the form
const taskForm = document.forms[0];

// grab the remove all button
const removeAllButton = document.querySelector("#remove-all");

// load tasks from localstorage or set it as empty list
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// a task list tile to display a single task
const taskTile = ({ id, name, is_completed }) => `
<div class="p-2 w-1/2 w-full">
<div class="bg-gray-100 rounded flex justify-between p-4 h-full items-center">
<button onClick="toggleCompleteTask('${id}');">
<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="${
  is_completed ? "text-indigo-500" : "text-gray-500"
} w-6 h-6 flex-shrink-0 mr-4 cursor-pointer" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
    <path d="M22 4L12 14.01l-3-3"></path>
  </svg>
</button>
  
  <span class="title-font font-medium ${
    is_completed && "line-through"
  }">${name}</span>
  <button onClick="removeTask('${id}');">
   <svg xmlns="http://www.w3.org/2000/svg" class="text-red-400 hover:text-red-500 h-5 w-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
  </button>
</div>
</div>`;

// handle task submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(e.target.task.value);
});

// toggle the is_completed of task with given taskId
const toggleCompleteTask = (taskId) => {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, is_completed: !task.is_completed } : task
  );
  saveAndRenderTasks();
};

// add task with given name to the list
const addTask = (name) => {
  tasks.push({
    id: new Date().toISOString(),
    name: name,
    is_completed: false,
  });
  saveAndRenderTasks();
};

// remove task with given id from the list
const removeTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveAndRenderTasks();
};

// save the current task list to localStorage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// render available tasks from tasks array
const renderTasks = () => {
  tasksDisplay.innerHTML = "";
  tasks.forEach((task) => {
    tasksDisplay.innerHTML += taskTile(task);
  });
  if (tasks.length) {
    removeAllButton.classList.remove("hidden");
    removeAllButton.classList.add("flex");
    removeAllButton.addEventListener("click", removeAll);
  } else {
    removeAllButton.classList.remove("flex");
    removeAllButton.classList.add("hidden");
    removeAllButton.removeEventListener("click", removeAll);
  }
};

// save and render current tasks array
const saveAndRenderTasks = () => {
  saveTasks();
  renderTasks();
};

// remove all tasks from current array
const removeAll = () => {
  if (confirm("Clear all tasks?")) {
    tasks = [];
    saveAndRenderTasks();
  }
};

// render tasks for initial loading time
renderTasks();

//*  OLD CODE
// // Selectors
// document.querySelector('form').addEventListener('submit', handleSubmitForm);
// document.querySelector('ul').addEventListener('click', handleClickDeleteOrCheck);
// document.getElementById('clearAll').addEventListener('click', handleClearAll);
// // Event Handlers
// function handleSubmitForm(e) {
//     e.preventDefault();
//     let input = document.querySelector('input');
//     if (input.value != '')
//         addTodo(input.value);
//     input.value = '';
// }
// // Helpers
// function addTodo(todo) {
//     let ul = document.querySelector('ul');
//     let li = document.createElement('li');
//     li.innerHTML = `
//         <span class="todo-item">${todo}</span>
//         <button name="checkButton"><i class="fas fa-check-square"></i></button>
//         <button name="deleteButton" ><i class="fas fa-trash"></i></button>
//     `;
//     li.classList.add('todo-list-item');
//     ul.appendChild(li);
// }
// function handleClickDeleteOrCheck(e) {
//     if (e.target.name == 'checkButton')
//         checkTodo(e);

//     if (e.target.name == 'deleteButton')
//         deleteTodo(e);
// }
// function checkTodo(e) {
//     let item = e.target.parentNode;
//     if (item.style.textDecoration == 'line-through')
//         item.style.textDecoration = 'none';
//     else
//         item.style.textDecoration = 'line-through';
// }

// function deleteTodo(e) {
//     let item = e.target.parentNode;

//     item.addEventListener('transitionend', function () {
//         item.remove();
//     });

//     item.classList.add('todo-list-item-fall');
// }
// function handleClearAll(e) {
//     document.querySelector('ul').innerHTML = '';
// }

// function save_data(){
//     let fields = document.querySelectorAll("input[type='text']")
//     let saved_fields = []
//     fields.forEach(x => {
//         saved_fields.push({
//             key: x.id,
//             value: x.value
//         })
//     })
//     localStorage.setItem("saved_data", JSON.stringify(saved_fields))
//  }

//  function show_saved_data(){
//      JSON.parse(localStorage.getItem("saved_data")).forEach(x => {
//          document.getElementById(x.key).value = x.value
//      })
//  }
