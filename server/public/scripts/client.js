console.log('client.js has loaded');

$(document).ready(function(){
    console.log('jQuery loaded');
    getTodos();

    $('#todoButton').on('click',function(){
        console.log('todoButton clicked');
        var todoInput = $('#todoInput').val();
        var completeRadio = $('#completeRadio').val();
        var inputObject = {
          todo: todoInput,
          radio: completeRadio
        };
       
        });
        $.ajax({
          method: 'POST',
          url: '/todos',
          data: inputObject
        })
        



    
    })









 getTodos(objectToSend);
});

function todos() {
  console.log('');
  // ajax call to server to get todos
  $.ajax({
    url: '/todos',
    type: 'GET',//grab entire table from DB
    success: function (data) {//data is result of success
      console.log('got the todos: ', data);
      makeTodos(data);//pass the table to makeTodos function
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end gettodos

function makeTodos(data) {
  $('#viewTodos').empty();
  for (var i = 0; i < data.length; i++) {
    var todo = data[i];
    console.log(todo);
    var $todoRow = $('<tr></tr>');
    $todoRow.data('id', todo.id);

    
      
    }


    $('#viewtodos').prepend($todoRow);//puts todoRow on tb for viewtodos
