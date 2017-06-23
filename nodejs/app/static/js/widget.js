(function () {
  "use strict";
  window.onload = function () {
    var domain = window.weatherWidgets.domain;
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = domain + '/css/widget.css';
    head.appendChild(link);
    window.weatherWidgets.settings.forEach(item => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (this.status === 200) {
          var jsonResponse = JSON.parse(this.responseText);
          var forecast = jsonResponse.data.forecast
          var ref = document.getElementById(item.containerID);
          for (var i = 0; i < forecast.length; i++) {
            var el = forecast[i];
            var date = new Date(el.date * 1000)
            var weekDay = date.toLocaleString('ru-RU', { weekday: 'short' })
            var monthDay = date.getDate()
            var block = document.createElement('div');
            block.className = 'Mps3xzw9b4W8TCp4'
            if (jsonResponse.data.meta.orientation === 'horizontal') {
              block.style.display = 'inline-block'
            }
            var iconEl = document.createElement('img');
            iconEl.src = el.icon
            iconEl.width = 40
            iconEl.height = 40
            var tempEl = document.createElement('span')
            tempEl.textContent = el.minTemp + ' - ' + el.maxTemp
            tempEl.className = 'EmmDf3hYDCFYNfTl'
            var dateEl = document.createElement('span')
            dateEl.className = 'YDdkvbwW9EsI42Yo'
            dateEl.textContent = monthDay + ' ' + weekDay
            block.appendChild(iconEl)
            block.appendChild(tempEl)
            block.appendChild(dateEl)
            ref.appendChild(block)
          }
        }
      };
      xhr.open('GET', domain + '/widget/' + item.widgetID);
      xhr.send();
    })
  }
})();