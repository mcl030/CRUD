class Todo {
    constructor(todo) {
        // Create div element for each todo list
        this.state = document.createElement('div')
        this.state.innerText = todo.name;
        this.state.className ='todoList';
        this.state.style.fontWeight = '800';
        this.id = todo._id;

        // Create div element to hold all tasks in todo list
        this.state.appendTaskDiv = document.createElement('div')
        this.state.appendTaskDiv.setAttribute('id', this.id )
        
        // Create button and input field for todo list to add task
        const button = document.createElement('button');
        button.innerText = 'Add task';
        const input = document.createElement('input');
        input.placeholder = 'Enter task details...';
        button.addEventListener('click', () => {
            this.addTask(input.value);
        })

        // Create button for delete todo list
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete todo';
        deleteButton.addEventListener('click', () => {
            this.deleteTodo(this.id, this.state);
        })
        
        // Grab tasks from db for current todo
        this.getTasks()
        // Append task input, task button, and task div to todo list
        this.state.appendChild(deleteButton);
        this.state.appendChild(input);
        this.state.appendChild(button);
        this.state.appendChild(this.state.appendTaskDiv);

        // Append todo list to root
        this.display();
    }

    display() {
        const root = document.querySelector('.root')
        root.appendChild(this.state);
    }

    getTasks() {
        fetch(`getTasks/${this.id}`)
            .then(data => data.json())
            .then(res => {
                console.log(res)
                for(let i = 0; i < res.length; i++) {
                    const task = new Task(res[i].name, res[i]._id);
                    this.state.appendTaskDiv.appendChild(task.state);
                    if (res[i].status === false) {
                        task.state.style.color = 'red';
                    }   else {
                        task.state.style.color = 'green';
                    }
                    task.state.style.fontWeight = '200';
                }
            })
            .catch(err => console.log('Error in getTasks', err))
    }

    addTask(task) {
        fetch('addTask', {
            method: 'POST',
            headers: {
                'CONTENT-TYPE': 'application/json'
            },
            body: JSON.stringify({
                task, 
                parent: this.id
            })
        })
            .then(data => data.json())
            .then(data => {
                const newTask = new Task(task, data._id);
                this.state.appendTaskDiv.appendChild(newTask.state)
                newTask.state.style.color = 'red';
                newTask.state.style.fontWeight = '200';
            })
    }

    deleteTodo(id, state) {
        fetch('deleteTodo', {
            method: 'DELETE',
            headers: {
                'CONTENT-TYPE': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(data => {
                const root = document.querySelector('.root')
                root.removeChild(state);
            })
    }
}

class Task {
    constructor(task, id) {
        this.state = document.createElement('div');
        this.state.setAttribute('id',id)
        this.id = id
        this.task = task
        this.status = false
        this.state.innerText = task;
        const toggleButton = document.createElement('button')
        toggleButton.addEventListener('click', () => {
            this.toggleStatus();
            if (this.status === false) {
                this.state.style.color = 'red';
            }   else {
                this.state.style.color = 'green';
            }
        })
        toggleButton.innerText = 'Toggle';
        this.state.appendChild(toggleButton);

    }
    
    toggleStatus(){
        fetch('toggleTask', {
            method: 'PUT',
            headers: {
                'CONTENT-TYPE': 'application/json'
            },
            body: JSON.stringify({
                task_id: this.id, 
                status: !this.status
            })
        })
            .then( data => {
                this.status = !this.status;
            })
        
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log('log log log')
    const root = document.querySelector('.root')

    // root.style.display = 'grid';
    
    //add todo input field
    const todoNameInput = document.createElement('input');
    todoNameInput.className = todoNameInput;
    todoNameInput.placeholder = 'Enter list name...';
    root.appendChild(todoNameInput);
    
    //add todo button
    const todoSubmit = document.createElement('button');
    todoSubmit.innerText = 'Add new list';
    todoSubmit.addEventListener('click', () => {
        const parent = todoNameInput.value;
        console.log("LINE 96",parent)
        fetch('/addTodo', {
            method: 'POST',
            headers: {'CONTENT-TYPE': 'application/json'},
            body: JSON.stringify({ parent })
        })
            .then( data => {
                console.log('line 101 index.js: ',data)
                const todo = new Todo({name: parent, id: data.id});
                todo.display();
            })
            .catch( err => console.log(err))
    })
    root.appendChild(todoSubmit);
  
    
    fetch('getTodos')
        .then( data => data.json())
        .then( data => {
            for (let i = 0; i < data.length; i += 1) {
                const todo = new Todo(data[i])         
            }           
        })

// WITH id AS (SELECT _id FROM todo WHERE name='Go to Costco') INSERT INTO task (name, status, parent) VALUES('Buy bananas', FALSE, id._id)


})


