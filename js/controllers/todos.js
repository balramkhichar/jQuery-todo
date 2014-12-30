$(document).ready(function() {
  

  var ENTER_KEY = 13;

  // creating todo
  $('#new-todo').on('keypress', function (event) {
    if(event.which == ENTER_KEY){
      var todoVal = $(this).val().trim();
      if(todoVal.length>4){
        if(todoVal.indexOf('@') >= 0) 
        {
          var todoArr = todoVal.split('@');
        }else{
          var todoArr = [];
          todoArr.push(todoVal);
          todoArr.push('default');
        }

        if(todoArr[0].trim().length>4 && todoArr[1].trim().length>2){
          var cat_id = todoCollection.checkCat(todoArr[1].trim());
          var new_todo = todoCollection.create(todoArr[0].trim(), cat_id);
          $('#new-todo').val('');
          template.draw();
          template.drawFooter();
        }else{
          swal('Oops !','Please write atleast 5 characters in Todo and atleast 3 in category.','error');  
        }
      }else{
        swal('Oops !','Please write atleast 5 characters','error');
      }
    }
  });

  // editing todo
  $('#edit-todo').on('keypress', function (event) {
    if(event.which == ENTER_KEY){
      if($(this).val().trim().length>4){
        todoCollection.update($(this).val().trim(), $('#edit-id').val());
        template.drawEdited($(this).val().trim(), $('#edit-id').val());
      }else{
        swal('Oops !','Please write atleast 5 characters','error');
      }
    }
  });

  // dynamic actions
  $('body').on('dblclick','#main li', function() {
    template.drawEdit($(this));
  });

  $('body').on('click','#main li .glyphicon-ok', function() {
    var res = todoCollection.switchStatus($(this).parent().attr('id'));
    template.drawFooter();
    if(res==1){template.drawStatusDone($(this))}
    else{template.drawStatusUndone($(this))}
  });

  $('body').on('click','#main li .glyphicon-remove', function() {
    
    todoCollection.removeTodo($(this).parent().attr('id'));
    if($(this).parent().siblings().length==0){
      todoCollection.removeCat($(this).parent().parent().attr('cat_id'));
    }
    template.draw();
    template.drawFooter();
  
  });

  $('body').on('click','#status_all', function() {
    template.draw();
  });

  $('body').on('click','#status_active', function() {
    template.drawActive($(this));
  });

  $('body').on('click','#status_completed', function() {
    template.drawCompleted($(this));
  });

  $('body').on('click','#mark_all_done', function() {
    todoCollection.markAllDone();
    template.draw();
    template.drawFooter();
  });

  $('body').on('click','#remove_done[', function() {
    todoCollection.removeDone();
    template.draw();
    template.drawFooter();
  });

  template.bindSort();
  
});