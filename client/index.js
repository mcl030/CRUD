class Todo {
    constructor(todo) {
        this.state = document.createElement('div')
        this.state.innerText = todo.name;
        this.state.className ='todo'
        this.state.style.fontWeight = '800';
        this.id = todo._id
        this.state.appendTaskDiv = document.createElement('div')
        this.state.appendTaskDiv.setAttribute('id', this.id )
        
        const button = document.createElement('button');
        button.innerText = 'Add task';
        const input = document.createElement('input');
        input.placeholder = 'andy sux';
        button.addEventListener('click', () => {
            this.addTask(input.value);
        })
        
        
        this.getTasks()
        this.state.appendChild(input);
        this.state.appendChild(button);
        this.state.appendChild(this.state.appendTaskDiv)
        this.display()

    
    }

    display() {
        const root = document.querySelector('.root')
        console.log('herehere')
        root.appendChild(this.state);
    }

    getTasks() {
        console.log('Made it to get tasks')
        fetch(`getTasks/${this.id}`)
            .then(data => data.json())
            .then(res => {
                for(let i = 0; i < res.length; i++) {
                    const task = new Task(res[i].name, res[i]._id);
                    console.log('line 31',task)
                    this.state.appendTaskDiv.appendChild(task.state)
                    task.state.style.fontWeight = '200';
                    console.log('line33')
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
            .then( data => data.json())
            .then( data => {
                const newTask = new Task(task, data._id);
                this.state.appendTaskDiv.appendChild(newTask.state)
                newTask.state.style.fontWeight = '200';
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
                this.state.innerText.style.color = 'red';
            }
        })
        toggleButton.innerText = 'Toggle';
        this.state.appendChild(toggleButton);

    }
    

    // display() {
        
    // }
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
                this.status = !this.status
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


