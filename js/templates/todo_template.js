function Template(){

  this.draw = function(){
    var html = '';
    for(j in todoCats){
      var count = 0;
      for(i in storage){if(storage[i].cat_id==todoCats[j].cat_id){ count++;}}
      if(count>0){
        html += '<div class="cat-title" id="title_'+todoCats[j].cat_id+'"><span class="glyphicon glyphicon-bookmark" aria-hidden="true"></span> '+todoCats[j].cat_title+'</div>';
        html += '<div class="cat-elements" cat_id="'+todoCats[j].cat_id+'">';
        var count = 0;
        for(i in storage){
          if(storage[i].cat_id==todoCats[j].cat_id){
            html += '<li class="list-group-item" id="'+storage[i].id+'">';
            html += '<span class="pull-right glyphicon glyphicon-remove icon-mark-delete" aria-hidden="true"></span>';
            html += '<span class="glyphicon glyphicon-ok icon-mark-done';
            if(storage[i].status==1){html += ' icon-marked-done';}
            html += '" aria-hidden="true"></span>';
            html += '<span class="task-text';
            if(storage[i].status==1){html += ' task-completed';}
            html += '">'+storage[i].text+'</span>';
            html += '</li>';
          }
        }
      }
      html += '</div>';
    }
    $('#main').html(html);
    $('#status_all').siblings().removeClass('footer-active');
    $('#status_all').addClass('footer-active');
    this.bindSort();
  }
  this.drawActive = function(obj){
    var html = '';
    for(i in storage){
      if(storage[i].status==0){
        html += '<li class="list-group-item" id="'+storage[i].id+'">';
        html += '<span class="pull-right glyphicon glyphicon-remove icon-mark-delete" aria-hidden="true"></span>';
        html += '<span class="glyphicon glyphicon-ok icon-mark-done" aria-hidden="true"></span>';
        html += '<span class="task-text">'+storage[i].text+'</span>';
        html += '</li>';
      }
    }
    $('#main').html(html);
    obj.siblings().removeClass('footer-active');
    obj.addClass('footer-active');
  }

  this.drawStatusDone = function(obj){
    obj.addClass('icon-marked-done');
    obj.parent().find('.task-text').addClass('task-completed');
  }

  this.drawStatusUndone = function(obj){
    obj.removeClass("icon-marked-done"); 
    obj.parent().find('.task-text').removeClass('task-completed');
  }

  this.drawCompleted = function(obj){
    var html = '';
    for(i in storage){
      if(storage[i].status==1){
        html += '<li class="list-group-item" id="'+storage[i].id+'">';
        html += '<span class="pull-right glyphicon glyphicon-remove icon-mark-delete" aria-hidden="true"></span>';
        html += '<span class="glyphicon glyphicon-ok icon-mark-done icon-marked-done" aria-hidden="true"></span>';
        html += '<span class="task-text task-completed">'+storage[i].text+'</span>';
        html += '</li>';
      }
    }
    $('#main').html(html);
    obj.siblings().removeClass('footer-active');
    obj.addClass('footer-active');
  }

  this.drawEdit = function(obj){
    $('#edit-todo').val((obj.find('.task-text').html()));
    $('#edit-id').val(obj.attr('id'));
    $('#myModal').modal();
  }

  this.drawEdited = function(new_val, todo_id){
    $('#main #' + todo_id + ' .task-text').html(new_val);
    $('#edit-id').val('');
    $('#myModal').modal('hide');
  }

  this.drawFooter = function(){
    if(storage.length==0){ $('.panel-default').hide();}
    else{$('.panel-default').show();}
    var undone = $.grep(storage, function(e){ return e.status == 0; }).length;
    if(undone==1){ $('#status_left').html('<b>1</b> Item Left'); }
    else{ $('#status_left').html('<b>'+undone+'</b> Items Left'); }
    var done = $.grep(storage, function(e){ return e.status == 1; }).length;
    if(done==0){ $('#remove_done').hide();}else{ $('#remove_done').show();};
    if(undone>0){ $('#mark_all_done').show();}else{ $('#mark_all_done').hide();};
  }

  this.bindSort = function(){
    $(".list-group-item").parent().sortable({
      connectWith: ".cat-elements",
      axis: "y",
      cursor: "move",
      update: function(event,ui){
        var cat = event.target.attributes.cat_id.value;
        var order = $(this).sortable("toArray");
        todoCollection.saveOrder(cat, order);
      },
      receive: function(event,ui){
        var cat = event.target.attributes.cat_id.value;
        var order = $(this).sortable("toArray");
        todoCollection.saveOrderCat(cat, order);
      }
    }).disableSelection();
  }

}