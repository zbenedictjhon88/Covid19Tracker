$(document).ready(function () {
  $("#global").click(function () {
    world();
    $.get("components/global/global.html", function (data) {
      $("#global").addClass("w3-theme");
      $("#countries").removeClass("w3-theme");
      $("main").html(data);
    });
  });

  $("#countries").click(function () {
    countries();
    $("#search_country").change(function(){
      var search_country = $('#search_country').val();
      country(search_country);
    });
    $.get("components/countries/countries.html", function (data) {
      $("#countries").addClass("w3-theme");
      $("#global").removeClass("w3-theme");
      $("main").html(data);      
    });
  });
});


function world(){
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
}

function countries(){
  $.ajax({
    type: "GET",
    url: "https://coronavirus-19-api.herokuapp.com/countries",
    dataType: "JSON",
    success: function (response) {
      for (let i = 1; i < 10; i++){
        $('#country').append(
          '<div class="w3-theme-l2 w3-container w3-padding-16 w3-margin-bottom w3-margin-top">' +
          '<label>Country:</label> <span class="w3-right">' + response[i].country + '</span><br>' +
          '<label>Cases:</label> <span class="w3-right">' + number_format(response[i].cases, "", "", ",") + '</span><br>' +
          '<label>Active:</label> <span class="w3-right">' + number_format(response[i].active, "", "", ",") + '</span><br>' +
          '<label>Recovered:</label> <span class="w3-right">' + number_format(response[i].recovered, "", "", ",") + '</span><br>' +
          '<label>Critical:</label> <span class="w3-right">' + number_format(response[i].critical, "", "", ",") + '</span><br>' +
          '<label>Deaths:</label> <span class="w3-right">' + number_format(response[i].deaths, "", "", ",") + '</span><br>' +
          '<label>Today Cases:</label> <span class="w3-right">' + number_format(response[i].todayCases, "", "", ",") + '</span><br>' +
          '<label>Today Deaths:</label> <span class="w3-right">' + number_format(response[i].todayDeaths, "", "", ",") + '</span><br>' +
          '</div>'
        );
      }
    },
    error: function (response) {
      alert('Error Response');
    },
  });
}

function country(search_country){
  $.ajax({
    type: "GET",
    url: "https://coronavirus-19-api.herokuapp.com/countries/" + search_country,
    dataType: "JSON",
    success: function (response) {
      $('#country_result').append(
        '<div class="w3-theme-l1 w3-container w3-padding-16 w3-margin-bottom w3-margin-top">' +
        '<label>Country:</label> <span class="w3-right">' + response.country + '</span><br>' +
        '<label>Cases:</label> <span class="w3-right">' + number_format(response.cases, "", "", ",") + '</span><br>' +
        '<label>Active:</label> <span class="w3-right">' + number_format(response.active, "", "", ",") + '</span><br>' +
        '<label>Recovered:</label> <span class="w3-right">' + number_format(response.recovered, "", "", ",") + '</span><br>' +
        '<label>Critical:</label> <span class="w3-right">' + number_format(response.critical, "", "", ",") + '</span><br>' +
        '<label>Deaths:</label> <span class="w3-right">' + number_format(response.deaths, "", "", ",") + '</span><br>' +
        '<label>Today Cases:</label> <span class="w3-right">' + number_format(response.todayCases, "", "", ",") + '</span><br>' +
        '<label>Today Deaths:</label> <span class="w3-right">' + number_format(response.todayDeaths, "", "", ",") + '</span><br>' +
        '</div>'
      );
    },
    error: function (response) {
      alert('No Result');
    },
  });  
}

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
