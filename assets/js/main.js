/**
 * Main.js file
 * Used to bootstrap the app
 * Has a one function, app that contains all the other functions
 * @param { * }
 * @returns {}
 * */ 

 (function(){
    var app = {

    }

    /**
     * Load data incase there's nothing on cache
     *  */
    app.loadInitialData = function() {
        console.log("Initial data is empty");
    };

    app.showAddTodoModal = function() {
        $('#myModal').on('shown.bs.modal', function () {
            $('#myInput').trigger('focus')
        });
    };

    app.deleteTask = function(taskId) {
        console.log('Deleting task :', taskId);
    };

    app.markTaskAsComplete = function(taskId) {
        console.log('Task :'+ taskId + ' is complete.');
    };
})()
 
/**
 *  Make the date dynamic
 */
var today = document.getElementById('currentDate');  

today.innerHTML = moment().format("MMMM Do YYYY");