$(function () {
  "use strict";
  function embedCodeGenerator(widgetID) {
    var url = window.location.protocol + '//' + window.location.host
    var containerID = 'weatherwidget-' + widgetID
    var weatherWidgets = {
      domain: url,
      settings: [
        {
          widgetID: widgetID,
          containerID: containerID
        }
      ]
    }
    var divTag = '<div id="' + containerID + '"></div>'
    var paramsTag = '<script>window.weatherWidgets = ' + JSON.stringify(weatherWidgets) + '</script>'
    var scriptTag = '<script src="' + url + '/js/widget.js"></script>'
    var tags = [divTag, paramsTag, scriptTag]
    return tags.join('\n')
  }

  function showCodeModal(widgetID) {
    const code = embedCodeGenerator(widgetID)
    $("#embed-code").val(code)
    $("#embed-code-modal").modal("show")
  }

  function reloadTable(response) {
    $.ajax({
      url: '/widget',
      dataType: 'json',
      success: function (response) {
        $("#widget-list tbody").empty();
        var table = $('#widget-list > tbody:last-child')
        response.data.forEach(item => {
          var trEl = document.createElement('tr');
          trEl.dataset.id = item['id']
          trEl.onclick = function () {
            showCodeModal(item['id'])
          }
          var fields = ['id', 'city', 'days', 'orientation'];
          fields.forEach(field => {
            var tdEl = document.createElement('td');
            tdEl.textContent = item[field]
            trEl.appendChild(tdEl)
          })
          table.append(trEl)
        })
      }
    })
  }

  $("#create-widget").submit(function (e) {
    var target = $(e.target)
    $.ajax({
      method: 'POST',
      url: '/widget',
      data: target.serialize(),
      success: function (response) {
        target[0].reset();
        $("#create-widget-modal").modal("hide")
        reloadTable()
      }
    })
    return false;
  });

  reloadTable()
});