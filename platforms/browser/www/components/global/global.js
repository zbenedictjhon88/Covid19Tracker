$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "https://api.thevirustracker.com/free-api?global=stats",
    dataType: "JSON",
    success: function (response) {
      var field = response.results[0];
      $("#total_cases").text(field.total_cases);

    },
    error: function (response) {
      console.log(response);
    },
  });
});
