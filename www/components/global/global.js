$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "https://api.thevirustracker.com/free-api?global=stats",
    dataType: "JSON",
    success: function (response) {
      var field = response.results[0];
      $("#total_cases").html(number_format(field.total_cases, "", "", ","));
      $("#total_recovered").html(number_format(field.total_recovered, "", "", ","));
      $("#total_unresolved").html(number_format(field.total_unresolved, "", "", ","));
      $("#total_deaths").html(number_format(field.total_deaths, "", "", ","));
      $("#total_new_cases_today").html(number_format(field.total_new_cases_today, "", "", ","));
      $("#total_new_deaths_today").html(number_format(field.total_new_deaths_today, "", "", ","));
      $("#total_active_cases").html(number_format(field.total_active_cases, "", "", ","));
      $("#total_serious_cases").html(number_format(field.total_serious_cases, "", "", ","));
      $("#total_affected_countries").html(number_format(field.total_affected_countries, "", "", ","));
      $("#source").html(field.source.url);
    },
    error: function (response) {
      alert('Error Response');
    },
  });
});

