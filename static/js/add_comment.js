(function () {
  "use strict";
  function updateData(responseText, selector) {
    var ref = document.getElementById(selector);
    while (ref.firstChild) {
      ref.removeChild(ref.firstChild);
    }
    var jsonResponse = JSON.parse(responseText);
    jsonResponse.data.forEach(function (item) {
      var opt = document.createElement('option');
      opt.value = item.id;
      opt.innerHTML = item.name;
      ref.appendChild(opt)
    });
    if (selector === 'region') {
      loadCities(1)
    }
  }

  function formMessage(statusCode) {
    var ref = document.getElementById('form_message');
    if (statusCode === 200) {
      ref.innerHTML = 'Success'
    } else {
      ref.innerHTML = 'Error. Try again later...'      
    }
  }

  function sendData(e) {
    e.preventDefault();
    e.target.submit.disabled = true;
    var data = new FormData(e.target);
    var jsonData = {};
    for (var entry of data.entries()) {
      jsonData[entry[0]] = entry[1]
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      formMessage(this.status);
    };
    xhr.open("POST", '/api/comment/', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(jsonData));
  }

  window.loadCities = function (regionID) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      updateData(this.responseText, 'city');
    };
    xhr.open('GET', '/api/city/?region_id=' + regionID);
    xhr.send();
  };

  document.onload = function () {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      updateData(this.responseText, 'region');
    };
    xhr.open('GET', '/api/region/');
    xhr.send();

    var region = document.getElementById('region');
    region.onchange = function () {
      loadCities(this.value)
    };

    var contactForm = document.getElementById('contact_form');
    contactForm.onsubmit = sendData;
  }()
})();