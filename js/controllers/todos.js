$(document).ready(function() {
  
  var ENTER_KEY = 13;
  storage = JSON.parse(localStorage.getItem('todo'));

  if(storage==null){
    var data = [];
    localStorage.setItem('todo', JSON.stringify(data));
  }

  // creating todo
  $('#new-todo').on('keypress', function (event) {
    if(event.which == ENTER_KEY){
      if($(this).val().length>4){
        todo.create($(this).val().trim());
        $(this).val('');
        template.footer();
      }
      else{
        swal('Oops !','Please write atleast 5 characters','error');
      }
    }
  });

  // editing todo
  $('#edit-todo').on('keypress', function (event) {
    if(event.which == ENTER_KEY){
      if($(this).val().length>4){
        todo.update($(this).val().trim(), $('#edit-id').val());
        $(this).val('');
        $('#edit-id').val('');
        $('#myModal').modal('hide');
      }
      else{
        swal('Oops !','Please write atleast 5 characters','error');
      }
    }
  });

  // dynamic actions
  $('body').on('dblclick','#main li', function() {
    template.drawEdit($(this));
  });

  $('body').on('click','#main li .glyphicon-ok', function() {
    todo.switchStatus($(this).parent().attr('id'), $(this));
    template.footer();
  });

  $('body').on('click','#main li .glyphicon-remove', function() {
    todo.removeTodo($(this).parent().attr('id'), $(this));
    template.footer();
  });


  $('body').on('click','#status_all', function() {
    template.draw();
    $(this).siblings().removeClass('footer-active');
    $(this).addClass('footer-active');
  });

  $('body').on('click','#status_active', function() {
    template.drawActive();
    $(this).siblings().removeClass('footer-active');
    $(this).addClass('footer-active');
  });

  $('body').on('click','#status_completed', function() {
    template.drawCompleted();
    $(this).siblings().removeClass('footer-active');
    $(this).addClass('footer-active');
  });
  
});