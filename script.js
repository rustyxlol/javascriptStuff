// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');


// event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkDelete);

document.getElementById("todo-input").addEventListener("keydown", function(e) {
    if (e.keyCode == 13) { addTodo(); }
}, false);

// functions
function addTodo(event) {
    // prevents submission
    // Create new items
    if(todoInput.value != "") {
        const newTodo = document.createElement('li');
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Mark finished items
        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<i class="bi bi-check2-square"></i>`
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton);

        // Delete item
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<i class="bi bi-trash-fill"></i>`
        deleteButton.classList.add("trash-btn")
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);

        // Clear textbox value after adding
        todoInput.value = "";
    }
    else {
        console.log("Enter something bro");
    }

}

function checkDelete(e) {
    const item = e.target;
    console.log(item);
    // Delete item
    if(item.classList[0] === 'trash-btn') {
        const todoElement = item.parentElement;
        todoElement.classList.add("fall");
        todoElement.addEventListener('transitionend', () => {
            todoElement.remove();
        });

    }
    // Scratch it
    if(item.classList[0] === 'complete-btn') {
        const todoElement = item.parentElement.firstChild;
        todoElement.classList.toggle("completed");
    }

}