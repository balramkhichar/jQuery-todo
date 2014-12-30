<!doctype html>
<html lang="en">
<head>
  <title>Simple ToDo App</title>
  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
  <link rel="stylesheet" href="bower_components/sweetalert/lib/sweet-alert.css">
  <link rel="stylesheet" href="css/app.css">
</head>
<body>
<div class="container">
  
  <h1>todos</h1>
  <input type="text" id="new-todo" class="form-control" value="" placeholder="What needs to be done?" required>  
  <ul class="list-group" id="main">
  </ul>
  <div class="panel panel-default">
    <div class="panel-footer">
      <span id="status_left"></span>
      <span class="pull-right footer-links">
        <span class="footer-active" id="status_all">All</span>
        <span id="status_active">Active</span>
        <span id="status_completed">Completed</span>
        <span id="remove_done">Remove Completed</span>
        <span id="mark_all_done">Mark All Completed</span>
      </span>
    </div>
  </div>

</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Edit</h4>
      </div>
      <div class="modal-body">
        <input type="text" id="edit-todo" value="" class="form-control" required>
        <input type="hidden" class="form-control" value="" id="edit-id"/> 
      </div>
    </div>
  </div>
</div>

<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
<script src="bower_components/sweetalert/lib/sweet-alert.js"></script>
<script src="js/app.js"></script>
<script src="js/controllers/todos.js"></script>
<script src="js/models/todo_collection.js"></script>
<script src="js/templates/todo_template.js"></script>
</body>
</html>

