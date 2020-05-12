$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "https://api.thevirustracker.com/free-api?global=stats",
    dataType: "JSON",
    success: function (response) {
      var field = response.results[0];
      console.log(field);
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
      console.log(response);
    },
  });
});

function number_format(number, decimals, dec_point, thousands_sep) {
  // Strip all characters but numerical ones.
  number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}
