console.log('client.js has loaded');

$(document).ready(function () {
  console.log('jQuery loaded');
  getTodos();

  $('#addTodoButton').on('click', function () {
    console.log('todoButton clicked');
    var todoInput = $('#todoInput').val();
    var inputObject = {
      todo: todoInput
    };
    $.ajax({
      method: 'POST',
      url: '/todos',
      data: inputObject,
      success: function (response) {
        console.log(response);
        getTodos();
      }
    });
  });
  $('#listOfTasks').on('click', '.deleteButton', function () {
    var taskId = $(this).parent().parent().data().id;
    console.log(taskId);
    $.ajax({
      type: 'DELETE',
      url: '/todos/' + taskId,
      success: function (response) {
        console.log(response);
        getTodos();
      }
    })
  });


});
//getTodos(objectToSend);

function getTodos() {
  //console.log('');
  // ajax call to server to get todos
  $.ajax({
    type: 'GET',
    url: '/todos',
    //grab entire table from DB
    success: function (data) { //data is result of success
      console.log('got the todos: ', data);
      makeTodos(data); //pass the table to makeTodos function
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end gettodos

function makeTodos(data) {
  $('#listOfTasks').empty();
  for (var i = 0; i < data.length; i++) {
    var todo = data[i];
    var $taskrow = '<tr><td>' + todo.task + '</td><td>' + todo.complete + '</td><td><button class= "deleteButton">delete</button></td></tr>'
    $taskrow = $($taskrow); //taking above string and making a new html element
    $taskrow.data('id', todo.id); //takes data from object and makes key/value pair
    console.log(todo.task);
    $('#listOfTasks').prepend($taskrow);
    // var $todoRow = $('<tr></tr>');
    // $todoRow.data('id', todo.id);
  }
}

//$('#viewtodos').prepend($todoRow); //puts todoRow on tb for viewtodos