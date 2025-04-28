let mytasks = []; // Stores tasks locally

    // Load tasks from localStorage OR from API
    function loadData() {
        if (localStorage.getItem('mytasks')) {
            mytasks = JSON.parse(localStorage.getItem('mytasks'));
            displayData();
        } else {
            fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
                .then(response => response.json())
                .then(data => {
                    mytasks = data;
                    saveToLocal();
                    displayData();
                });
        }
    }

    function displayData(filter = 'all') {
        const list = document.getElementById('tasks');
        list.innerHTML = ''; // Clear current tasks

        let filteredTasks = mytasks;
        if (filter === 'completed') {
            filteredTasks = mytasks.filter(task => task.completed);
        } else if (filter === 'active') {
            filteredTasks = mytasks.filter(task => !task.completed);
        }

        filteredTasks.forEach(task => {
            const liCreated = document.createElement('li');
            const labelCreated = document.createElement('label');
            const inputCreated = document.createElement('input');
            const pCreated = document.createElement('p');
            const iCreated = document.createElement('i');

            if (task.completed) {
                pCreated.style.textDecoration = "line-through";
                pCreated.style.opacity = 0.6;
            }

            inputCreated.type = "checkbox";
            inputCreated.checked = task.completed;
            inputCreated.addEventListener('change', () => {
                task.completed = inputCreated.checked;
                saveToLocal();
                displayData(filter); // re-render to update strike-through
            });

            liCreated.className = "tasks";
            labelCreated.className = "lbl";
            pCreated.id = "task";
            iCreated.className = "fa-solid fa-trash";

            pCreated.textContent = task.title;

            liCreated.appendChild(labelCreated);
            labelCreated.appendChild(inputCreated);
            labelCreated.appendChild(pCreated);
            liCreated.appendChild(iCreated);

            list.appendChild(liCreated);
        });
    }

    document.getElementById('tasks').addEventListener('click', function (e) {
        if (e.target.classList.contains('fa-trash')) {
            const li = e.target.closest('li');
            const taskText = li.querySelector('p').textContent;

            // Remove from array
            mytasks = mytasks.filter(t => t.title !== taskText);

            saveToLocal();
            displayData();
        }
    });

    document.getElementById('add').addEventListener('click', function () {
        let taskAdded = document.getElementById('task-to-add').value.trim();
        if (taskAdded === '') return; // prevent empty task

        const newTask = { title: taskAdded, completed: false };
        mytasks.unshift(newTask); // add to beginning
        saveToLocal();
        document.getElementById('task-to-add').value = '';
        displayData();
    });

    document.getElementById('all').addEventListener('click', () => {
        displayData('all');
    });

    document.getElementById('Completed').addEventListener('click', () => {
        displayData('completed');
    });

    document.getElementById('active').addEventListener('click', () => {
        displayData('active');
    });

    function saveToLocal() {
        localStorage.setItem('mytasks', JSON.stringify(mytasks));
    }

    loadData(); // Initial call
