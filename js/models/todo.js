todo = {
  create: function(val){
    var curr_len = JSON.parse(localStorage.getItem('todo')).length;
    var new_todo = {id: curr_len+1, text: val, status: 0}; 
    storage.push(new_todo);
    localStorage.setItem('todo', JSON.stringify(storage));
    template.drawNew(new_todo);
  },
  update: function(new_val, todo_id){
    $.grep(storage, function(e){ return e.id == todo_id; })[0].text = new_val;
    localStorage.setItem('todo', JSON.stringify(storage));
    template.drawEdited(new_val, todo_id);
  },
  switchStatus: function(todo_id,obj){
    if($.grep(storage, function(e){ return e.id == todo_id; })[0].status==0)
    {       
      $.grep(storage, function(e){ return e.id == todo_id; })[0].status = 1;
      localStorage.setItem('todo', JSON.stringify(storage));
      obj.addClass('icon-marked-done');
      obj.parent().find('.task-text').addClass('task-completed');
    }
    else
    {
      $.grep(storage, function(e){ return e.id == todo_id; })[0].status = 0;
      localStorage.setItem('todo', JSON.stringify(storage));
      obj.removeClass("icon-marked-done"); 
      obj.parent().find('.task-text').removeClass('task-completed');
    }
  },
  removeTodo: function(todo_id,obj){
    storage = $.grep(storage, function(e){ return e.id != todo_id; });
    localStorage.setItem('todo', JSON.stringify(storage));
    obj.parent().hide();
  },
  count: function(){
    return storage.length;   
  }
}