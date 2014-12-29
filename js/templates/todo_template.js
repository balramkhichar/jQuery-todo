template = {
  draw: function(){
    var curr = JSON.parse(localStorage.getItem('todo'));
    var html = '';
    for(i in curr){
      html += '<li class="list-group-item" id="'+curr[i].id+'">';
      html += '<span class="pull-right glyphicon glyphicon-remove icon-mark-delete" aria-hidden="true"></span>';
      html += '<span class="glyphicon glyphicon-ok icon-mark-done';
      if(curr[i].status==1){html += ' icon-marked-done';}
      html += '" aria-hidden="true"></span>';
      html += '<span class="task-text';
      if(curr[i].status==1){html += ' task-completed';}
      html += '">'+curr[i].text+'</span>';
      html += '</li>';
    }
    $('#main').html(html);
  },
  drawActive: function(){
    var curr = JSON.parse(localStorage.getItem('todo'));
    var html = '';
    for(i in curr){
      if(curr[i].status==0){
        html += '<li class="list-group-item" id="'+curr[i].id+'">';
        html += '<span class="pull-right glyphicon glyphicon-remove icon-mark-delete" aria-hidden="true"></span>';
        html += '<span class="glyphicon glyphicon-ok icon-mark-done" aria-hidden="true"></span>';
        html += '<span class="task-text">'+curr[i].text+'</span>';
        html += '</li>';
      }
    }
    $('#main').html(html);
  },
  drawCompleted: function(){
    var curr = JSON.parse(localStorage.getItem('todo'));
    var html = '';
    for(i in curr){
      if(curr[i].status==1){
        html += '<li class="list-group-item" id="'+curr[i].id+'">';
        html += '<span class="pull-right glyphicon glyphicon-remove icon-mark-delete" aria-hidden="true"></span>';
        html += '<span class="glyphicon glyphicon-ok icon-mark-done icon-marked-done" aria-hidden="true"></span>';
        html += '<span class="task-text task-completed">'+curr[i].text+'</span>';
        html += '</li>';
      }
    }
    $('#main').html(html);
  },
  drawNew: function(new_todo){
    var new_html = '';
    new_html += '<li class="list-group-item" id="'+new_todo.id+'">';
    new_html += '<span class="pull-right glyphicon glyphicon-remove icon-mark-delete" aria-hidden="true"></span>';
    new_html += '<span class="glyphicon glyphicon-ok icon-mark-done" aria-hidden="true"></span>';
    new_html += '<span class="task-text">'+new_todo.text+'</span>';
    new_html += '</li>';
    $("#main").append(new_html);
  },
  drawEdit: function(obj){
    $('#edit-todo').val((obj.find('.task-text').html()));
    $('#edit-id').val(obj.attr('id'));
    $('#myModal').modal();
  },
  drawEdited: function(new_val, todo_id){
    $('#main #' + todo_id + ' .task-text').html(new_val);
  },
  footer: function(){
    var curr = JSON.parse(localStorage.getItem('todo'));
    if(curr.length==0){ $('.panel-default').hide();}
    else{$('.panel-default').show();}
    var undone = $.grep(curr, function(e){ return e.status == 0; }).length;
    if(undone==1){ $('#status_left').html('<b>1</b> Item Left'); }
    else{ $('#status_left').html('<b>'+undone+'</b> Items Left'); }
  }
}