class Todo {
    constructor(todo) {
        this.state = document.createElement('div')
        this.state.className = todo
        this.state.innerText = todo.name;
          
        // display()
    }

    display() {
        const root = document.querySelector('.root')
        console.log('herehere')
        root.appendChild(this.state);
        
        
    }

    getTasks() {
        
    }


    addTask(task) {
        const newTask = new Task(task);
        this.state.appendChild(newTask.state)
    }
}


class Task {
    constructor(task) {
        this.state = document.createElement;
        this.state.innerText = task;
    }
}

// function addTasksToTodo(task, todo) {

// }


document.addEventListener("DOMContentLoaded", (event) => {
    console.log('log log log')
    // const root = document.querySelector('.root')
  
    fetch('getTodos')
        .then( data => data.json())
        .then( data => {
            for (let i = 0; i < data.length; i += 1) {
                const todo = new Todo(data[i])
                todo.display()
                todo.getTasks()

            }
            
        })

    


// WITH id AS (SELECT _id FROM todo WHERE name='Go to Costco') INSERT INTO task (name, status, parent) VALUES('Buy bananas', FALSE, id._id)


})


