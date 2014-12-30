function TodoCollection(){
  
  this.get = function(){
    return JSON.parse(localStorage.getItem('todo'));
  }

  this.set = function(data){
    localStorage.setItem('todo', JSON.stringify(data));
  }

  this.getCats = function(){
    return JSON.parse(localStorage.getItem('todoCats'));
  }

  this.setCats = function(data){
    if(data==[]){data=[{cat_id:1, cat_title:'default'}]}
    localStorage.setItem('todoCats', JSON.stringify(data));
  }

  this.checkCat = function(val){
    var curr_cat_id = '';
    for(i in todoCats){
      if(todoCats[i].cat_title == val){var curr_cat_id = todoCats[i].cat_id;}
    }
    if(curr_cat_id==''){var curr_cat_id = this.createCat(val);}
    return curr_cat_id;
  }

  this.createCat = function(val){
    var new_id = todoCats[todoCats.length-1].cat_id+1;
    todoCats.push({cat_id: new_id, cat_title: val});
    return new_id;
  }

  this.removeCat = function(id){
    todoCats = $.grep(todoCats, function(e){ return e.cat_id != id; });
  }

  this.create = function(val, cat_id){
    var new_id = Math.round(new Date().getTime() + (Math.random() * 100));
    storage.push({id: new_id, text: val, status: 0, cat_id: cat_id});
    return {id: new_id, text: val, status: 0};
  }

  this.update = function(new_val, todo_id){
    $.grep(storage, function(e){ return e.id == todo_id; })[0].text = new_val;
  }

  this.switchStatus = function(todo_id){
    if($.grep(storage, function(e){ return e.id == todo_id; })[0].status==0){       
      $.grep(storage, function(e){ return e.id == todo_id; })[0].status = 1;
      return 1;
    }else{
      $.grep(storage, function(e){ return e.id == todo_id; })[0].status = 0;
      return 0;
    }
  }

  this.removeTodo = function(todo_id){
    storage = $.grep(storage, function(e){ return e.id != todo_id; });
  }

  this.removeDone = function(){
    storage = $.grep(storage, function(e){ return e.status == 0; });
  }

  this.markAllDone = function(){
    for(i in storage){storage[i].status=1;}
  }

  this.saveOrder = function(cat, order){
    var items = [];
    for(i in order){
      for(j in storage){
        if(storage[j].id==order[i]){ items.push(storage[j]); storage.splice(j,1);}
      }
    }
    $.each(items, function( index, value ) {
      storage.push(value);
    });
  }

  this.saveOrderCat = function(cat, order){
    for(i in order){
      for(j in storage){
        if(storage[j].id==order[i]){storage[j].cat_id = cat;}
      }
    }
  }

}