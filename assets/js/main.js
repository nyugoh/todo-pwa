/**
 * Main.js file
 * Used to bootstrap the app
 * */

/*
* Initial app data
* */
let initialData = [
    {
        task: 'Call James',
        description: 'Ask James about the party next week, this is from the description',
        priority: 1,
        dueDate: new Date(),
        isDone: false
    }, {
        task: 'Add a service worker',
        description: 'A simple todo-task, Lorem ipsum description goes here.......',
        priority: 2,
        dueDate: new Date(),
        isDone: true
    }
];

let taskPriorities = [ 'low', 'normal', 'high', 'urgent'];
let priorityBadges = [ 'primary', 'success', 'warning', 'danger'];
let todos = [];
/**
* Call the function to add the default data
 * @return null
* */
function loadInitialData() {
    $('#tasks').html('');
    todos.forEach(addTask);

}

/**
 * This function takes a task object and add it to the list of todos
 * @param task
 * @param index
 * */
function addTask(task, index) {
    let tableBody = $('#tasks');
    let taskRow;
    if (task == null) return alert('Invalid task object');
    if (task.task == null) return alert('Task name is required');
    if (task.description == null) return alert('Task description is required');

    // create a row
    taskRow = `
        <tr class="task-card ${task.isDone? 'done' : 'not-done'}" data-toggle="tooltip" data-placement="top" title="${task.description}">
            <td>${task.task}</td>
            <td><span class="badge badge-${priorityBadges[task.priority]}">${taskPriorities[task.priority].toUpperCase()}</span></td>
            <td>${moment(task.dueDate).format("MMMM Do YYYY")}</td>
            <td>
                <img src="./assets/images/svg/si-glyph-edit.svg" onclick="editTask(${index})" data-toggle="tooltip" data-placement="top" title="Edit task"/>
                <img src="./assets/images/svg/si-glyph-trash.svg" onclick="deleteTask(${index})" data-toggle="tooltip" data-placement="top" title="Delete task, will be removed completely"/>
                <img src="./assets/images/svg/si-glyph-${task.isDone? 'circle-backward': 'checked'}.svg" onclick="markTaskAsComplete(${index})" data-toggle="tooltip" data-placement="top" title="${task.isDone? 'Undo, mark as incomplete': 'Compelete, mark as done'}"/>
            </td>
        </tr>
    `;
    // Add row to table
    tableBody.append(taskRow);
}

/*
* Remove task from list
* */
function deleteTask(taskId) {
    delete todos[taskId];
    loadInitialData();
}

/*
* Edit a todo item
* */
function editTask(taskId) {
    $('#editTaskModal').modal('show');
    let todo = todos[taskId];
    $('#editTaskModalLabel').text(`Edit ${todo.task}`);
    $('#editTask').val(todo.task);
    $('#taskId').val(taskId);
    $('#editDescription').val(todo.description);
    $('#editPrioritySelect').val(parseInt(todo.priority));
    $('#editDatePicker').datepicker({
        uiLibrary: 'bootstrap4',
        setDate: todo.dueDate
    });
    // TODO:: The due date isn't been set on the date picker
}

/*
* Mark a todo as complete or incomplete
* It negates the current status of a task
* */
function markTaskAsComplete(taskId) {
    todos[taskId].isDone = !todos[taskId].isDone; // Negate the current status
    loadInitialData();
}

/**
 *  Make the date dynamic
 */
var today = document.getElementById('currentDate');  

today.innerHTML = moment().format("MMMM Do YYYY");

/*
* Initialize date pickers
* */
$('#datepicker').datepicker({
    uiLibrary: 'bootstrap4'
});

/*
* Initialize tooltips
* They give more information on hover above the elements
* */
$('[data-toggle="tooltip"]').tooltip();

// Handle submit form event
let addTaskForm = $('#addTask');
addTaskForm.on('submit', function(e){
    e.preventDefault();
    let task = $('#task').val();
    let description = $('#description').val();
    let priority = $('#prioritySelect').val();
    let dueDate = $('#datepicker').val();

    if(task == null) return alert('Task name is required');
    if(description == null) return alert('Task description is required');
    // TODO:: Check for due dates that are back in time

    let todo = {
        task,
        description,
        priority,
        dueDate
    };
    todos.push(todo);
    loadInitialData();
    $('#addTaskModal').modal('hide');

});

// Handle edit todo event
let editTaskForm = $('#editTaskForm');
editTaskForm.on('submit', function(e){
    e.preventDefault();
    let taskId = $('#taskId').val();
    let task = $('#editTask').val();
    let description = $('#editDescription').val();
    let priority = $('#editPrioritySelect').val();
    let dueDate = $('#editDatePicker').val();

    if(task == null) return alert('Task name is required');
    if(description == null) return alert('Task description is required');

    let todo = {
        task,
        description,
        priority,
        dueDate
    };
    todos[taskId] = todo;
    loadInitialData();
    $('#editTaskModal').modal('hide');

});


todos = todos.concat(initialData);
loadInitialData();