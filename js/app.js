$(document).ready(function() {
  // initialize view
  todoCollection = new TodoCollection();
  template = new Template();
  
  storage = todoCollection.get();
  todoCats  = todoCollection.getCats();
  
  if(storage==null){
    var data = [];
    todoCollection.set(data);
    storage = todoCollection.get();
  }

  if(todoCats==null||todoCats==''){
    var cat_data = [{cat_id:1, cat_title:'default'}];
    todoCollection.setCats(cat_data);
    todoCats = todoCollection.getCats();
  }


  template.draw();
  template.drawFooter();
});


window.onbeforeunload = function() {
  todoCollection.set(storage);
  todoCollection.setCats(todoCats);
};