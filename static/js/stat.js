(function () {
  "use strict";

  function updateData(responseText, type) {
    var jsonResponse = JSON.parse(responseText);
    var table = document.getElementById('stat_table');
    var ref = table.getElementsByTagName('tbody')[0];
    jsonResponse.data.forEach(function (item) {

      var tr = document.createElement('tr');

      if (type === 'regions') {
        tr.onclick = function () {
          document.location = './?region_id=' + item.region_id
        }
      }
      var name = document.createElement('td');
      name.innerHTML = item.name;
      var comments_count = document.createElement('td');
      comments_count.innerHTML = item.comments_count;

      var elementsToAdd = [name, comments_count];
      elementsToAdd.forEach(function (item) {
        tr.appendChild(item)
      });
      ref.appendChild(tr)
    });
  }

  document.onload = function () {
    var xhr = new XMLHttpRequest();
    var ref = document.getElementById('stat_table');
    var url = ref.dataset.url;
    var type = ref.dataset.type;
    xhr.onload = function () {
      updateData(this.responseText, type)
    };
    xhr.open('GET', url);
    xhr.send();
  }()
})();