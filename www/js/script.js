$(document).ready(function () {
  $("#home").click(function () {
    $('#preload').addClass('displayYes');
    $('#loading').addClass('active');
    $.get("components/home/home.html", function (data) {
      $("#about").addClass("active");
      $("#global").removeClass();
      $("#countries").removeClass();
      $("#home").removeClass();

      $('#preload').removeClass('displayYes');
      $('#loading').removeClass('active');
      $("main").html(data);      
    });
  });

  $("#global").click(function () {
    worldWide();
    $('#preload').addClass('displayYes');
    $('#loading').addClass('active');
    $.get("components/global/global.html", function (data) {
      $("#global").addClass("active");
      $("#countries").removeClass();
      $("#about").removeClass();
      $("#home").removeClass();

      $('#preload').removeClass('displayYes');
      $('#loading').removeClass('active');
      $("main").html(data);
    });
  });

  $("#countries").click(function () {
    countries();
    $('#preload').addClass('displayYes');
    $('#loading').addClass('active');
    $.get("components/countries/countries.html", function (data) {
      $("#countries").addClass("active");
      $("#global").removeClass();
      $("#about").removeClass();
      $("#home").removeClass();

      $('#preload').removeClass('displayYes');
      $('#loading').removeClass('active');
      $("main").html(data);      
    });
  });

  $("#about").click(function () {
    $('#preload').addClass('displayYes');
    $('#loading').addClass('active');
    $.get("components/about/about.html", function (data) {
      $("#about").addClass("active");
      $("#global").removeClass();
      $("#countries").removeClass();
      $("#home").removeClass();

      $('#preload').removeClass('displayYes');
      $('#loading').removeClass('active');
      $("main").html(data);      
    });
  });
});

function backCountries(){
  countries();
  $.get("components/countries/countries.html", function (data) {
    $("#countries").addClass("active");
    $("#global").removeClass();
    $("#about").removeClass();
    $("#home").removeClass();
    $("main").html(data);      
  });
}

function worldWide() {
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
      M.toast({html: 'Error Response'})
    },
  });
}

function countries(){
  $.ajax({
    type: "GET",
    url: "https://coronavirus-19-api.herokuapp.com/countries",
    dataType: "JSON",
    success: function (response) {
      for (let i = 1; i < 3; i++){
        $('#country').append(
          '<div class="card">' +
          '<div class="card-content">' +
          '<p>Country: <span class="right">' + response[i].country + '</span></p>' +
          '<p>Cases: <span class="right">' + number_format(response[i].cases, "", "", ",") + '</span></p>' +
          '<p>Active: <span class="right">' + number_format(response[i].active, "", "", ",") + '</span></p>' +
          '<p>Recovered: <span class="right">' + number_format(response[i].recovered, "", "", ",") + '</span></p>' +
          '<p>Critical: <span class="right">' + number_format(response[i].critical, "", "", ",") + '</span></p>' +
          '<p>Deaths: <span class="right">' + number_format(response[i].deaths, "", "", ",") + '</span></p>' +
          '<p>Today Cases: <span class="right">' + number_format(response[i].todayCases, "", "", ",") + '</span></p>' +
          '<p>Today Deaths: <span class="right">' + number_format(response[i].todayDeaths, "", "", ",") + '</span></p>' +
          '</div></div>'
        );
      }
    },
    error: function (response) {
      M.toast({html: 'Error Response'})
    },
  });
}

function country(search_country){
  if(search_country != ''){
    $.ajax({
      type: "GET",
      url: "https://coronavirus-19-api.herokuapp.com/countries/" + search_country,
      dataType: "JSON",
      success: function (response) {
        $('#country_result').html(
          '<div class="card  red lighten-5">' +
          '<div class="card-content">' +
          '<p>Country: <span id="country_name" class="right">' + response.country + '</span></p>' +
          '<p>Cases: <span class="right">' + number_format(response.cases, "", "", ",") + '</span></p>' +
          '<p>Active: <span class="right">' + number_format(response.active, "", "", ",") + '</span></p>' +
          '<p>Recovered: <span class="right">' + number_format(response.recovered, "", "", ",") + '</span></p>' +
          '<p>Critical: <span class="right">' + number_format(response.critical, "", "", ",") + '</span></p>' +
          '<p>Deaths: <span class="right">' + number_format(response.deaths, "", "", ",") + '</span></p>' +
          '<p>Today Cases: <span class="right">' + number_format(response.todayCases, "", "", ",") + '</span></p>' +
          '<p>Today Deaths: <span class="right">' + number_format(response.todayDeaths, "", "", ",") + '</span></p>' +
          '</div>' +
          '<div class="card-action">' +
          '<a onclick="timelineData();">Timeline</a>' +
          '</div></div>'
        );
      },
      error: function (response) {
        M.toast({html: 'No Result!'})
      },
    });
  }
}

function renderChart(series, country){
  //console.log(positive);
  JSC.Chart('chartDiv', {
    type: 'horizontal line step',
    title_label_text: 'Country Timeline: ' +country[1],
    series: series,
    legend_visible: false,
		defaultSeries_lastPoint_label_text: '<b>%seriesName</b>',
		defaultPoint_tooltip: '%seriesName <b>%yValue</b> %xValue',
		xAxis_crosshair_enabled: false,
  });
}

function timelineData(){
  var countryCode = getCountryCodeOrName($('#country_name').text()); 
  console.log(countryCode);
  $.ajax({
    type: "GET",  
    url: "https://api.thevirustracker.com/free-api?countryTimeline="+countryCode[0], 
    success: function (response) {
      var value = response.timelineitems[0];
      $.get("components/countries/timeline.html", function (data) {
        $("#countries").addClass("active");
        $("#global").removeClass();
        $("#about").removeClass();
        $("#home").removeClass();
        $("main").html(data); 

        let cases = [], deaths = [];
        $.each(value, function(key) {
          var value = response.timelineitems[0];
          //console.log(value[key]);
          if(key != 'stat') {
            cases.push({x: key, y: value[key].new_daily_cases});
            deaths.push({x: key, y: value[key].new_daily_deaths});
          }

        }) 
        
        var casedeath = [
          {name: 'Cases', points: cases},
          {name: 'Deaths', points: deaths}
        ]
        console.log([{cases, deaths}]);
        renderChart(casedeath, countryCode);
      });
    },
    error: function (response) {
      M.toast({html: 'Error Response'})
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
