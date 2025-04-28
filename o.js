// Initialisation

const myTasks = [];
const todoList = document.getElementById('tasks');
const showAll = document.getElementById('all');
const showCompletedBtn = document.getElementById('Completed');
const showNotCompletedBtn = document.getElementById('active');
// API INTERGRATION

// This Loads from localStorage if available 
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTodos();
  } else {
    // Fetch initial to-dos from API if no local data
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')//fetches 10 tasks
      .then(response => response.json())//response being converted to json format
      .then(data => {
        todos = data;//response being stored in variable data
        saveTasks();//saves tasks to local storage
        renderTodos(); //show all tasks that was fetched
      });
}

// Add new todo

document.getElementById('add').addEventListener('click', () => {
    const newInput = document.getElementById('task-to-add').value.trim();//trims white spaces off input provided by user

    if (newInput !== '') {
      const newTask = {
        title: newInput,
        completed: false
      };
      myTasks.unshift(newInput);
      newInput.value = '';
      saveTasks();
      renderTodos();
    }
});

  
// Delete todo
function deleteTodo(id) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      todos = todos.filter(todo => todo.id !== id);
      saveTasks();
      renderTodos();
    });
  }

// Function to save todos to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));//converts the tasks from js object to json format
}


  
function renderTodos(filter='all') {
    todoList.innerHTML = '';
    
    //shows content related to the user preference 
    let filteredTodos = myTasks;
    if (filter === 'completed') {
      filteredTodos = todos.filter(todo => todo.completed);
    } else if (filter === 'notCompleted') {
      filteredTodos = todos.filter(todo => !todo.completed);
    }
  // This loops through all the elements to be created that was fetched from api or local storage
      filteredTodos.forEach(task => {
      //   creating elements
      const li = document.createElement('li');
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;//makes task completed when checked
        saveTasks();//saves to local storage
      });
  
      const span = document.createElement('span');
      span.textContent = myTasks.title;
  
      const deletebtn = document.createElement('span');
      deletebtn.className = "fa-solid fa-trash";
      deleteBtn.addEventListener('click', () => {
              deleteTodo(myTasks.id);
      });
  
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }
  // Filtter as by user clicks on the 3 buttons on top
showAll.addEventListener('click', () => renderTodos('all'));
showCompletedBtn.addEventListener('click', () => renderTodos('completed'));
showNotCompletedBtn.addEventListener('click', () => renderTodos('notCompleted'));