$(document).ready(function () {
  $("#global").click(function () {
    $.get("components/global/global.html", function (data) {
      $("#global").addClass("w3-theme");
      $("#countries").removeClass("w3-theme");
      $("main").html(data);
      $.getScript("components/global/global.js");
    });
  });
  $("#countries").click(function () {
    $.get("components/countries/countries.html", function (data) {
      $("#countries").addClass("w3-theme");
      $("#global").removeClass("w3-theme");
      $("main").html(data);
    });
  });
});
