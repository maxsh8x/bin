(function () {
  "use strict";
  function deleteComment(e, commentID) {
    var i = e.parentNode.parentNode.rowIndex;

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (this.status === 200) {
        document.getElementById("comments_table").deleteRow(i);
      }
    };
    xhr.open('DELETE', '/api/comment/?id=' + commentID);
    xhr.send();
  }

  function updateData() {
    var jsonResponse = JSON.parse(this.responseText);
    var ref = document.getElementById('comments_list');
    jsonResponse.data.forEach(function (item) {

      var full_name = item.first_name + ' ' + item.last_name;
      var tr = document.createElement('tr');
      var name = document.createElement('td');
      name.innerHTML = full_name;
      var comment = document.createElement('td');
      comment.innerHTML = item.comment;
      var deleteButton = document.createElement('td');
      var button = document.createElement('button');
      button.onclick = function () {
        deleteComment(this, item.id)
      };
      var buttonText = document.createTextNode('x');
      button.appendChild(buttonText);
      deleteButton.appendChild(button);

      var elementsToAdd = [name, comment, deleteButton];
      elementsToAdd.forEach(function (item) {
        tr.appendChild(item)
      });
      ref.appendChild(tr)
    });
  }

  document.onload = function () {
    var xhr = new XMLHttpRequest();
    xhr.onload = updateData;
    xhr.open('GET', '/api/comment/');
    xhr.send();
  }()
})();