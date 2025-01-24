const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');
        const saveBtn = document.getElementById('saveBtn');

        addTaskBtn.addEventListener('click', () => {
            const taskText = document.getElementById('inputText').value;
            if (taskText === '') {
                alert('Please enter a task');
                return;
            }
            const li = document.createElement('li');
            li.classList.add('list');
            li.innerHTML = taskText + `<span class='deleteBtn'>X</span>`;
            taskList.appendChild(li);
            document.getElementById('inputText').value = '';
        });

        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('deleteBtn')) {
                event.target.parentElement.remove();
            }
        });

        saveBtn.addEventListener('click', () => {
            const tasks = [];
            document.querySelectorAll('#taskList li').forEach(li => {
                const text = li.textContent.replace('X', '').trim();
                tasks.push(text);
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });