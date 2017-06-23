$(function () {
  $('#switch').click(function (e) {
    $("#login-form, #register-form").toggle();
    return false;
  });
});