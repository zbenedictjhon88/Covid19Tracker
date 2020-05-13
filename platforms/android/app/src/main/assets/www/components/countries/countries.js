$(document).ready(function () { 
  // $.ajax({
  //   type: "GET",
  //   url: "https://coronavirus-19-api.herokuapp.com/countries ",
  //   dataType: "JSON",
  //   success: function (response) {
  //     for (let i = 1; i < 5; i++){
  //       $('#country').append(
  //         '<div class="w3-theme-l2 w3-container w3-padding-16 w3-margin-bottom w3-margin-top">' +
  //         '<label>Country:</label> <span class="w3-right">' + number_format(response[i].country, "", "", ",") + '</span><br>' +
  //         '<label>Cases:</label> <span class="w3-right">' + number_format(response[i].cases, "", "", ",") + '</span><br>' +
  //         '<label>Active:</label> <span class="w3-right">' + number_format(response[i].active, "", "", ",") + '</span><br>' +
  //         '<label>Recovered:</label> <span class="w3-right">' + number_format(response[i].recovered, "", "", ",") + '</span><br>' +
  //         '<label>Critical:</label> <span class="w3-right">' + number_format(response[i].critical, "", "", ",") + '</span><br>' +
  //         '<label>Deaths:</label> <span class="w3-right">' + number_format(response[i].deaths, "", "", ",") + '</span><br>' +
  //         '<label>Today Cases:</label> <span class="w3-right">' + number_format(response[i].todayCases, "", "", ",") + '</span><br>' +
  //         '<label>Today Deaths:</label> <span class="w3-right">' + number_format(response[i].todayDeaths, "", "", ",") + '</span><br>' +
  //         '</div>'
  //       );
  //     }
  //     console.log(response[1]);
  //     //var field = response.results[0];
  //     //$("#total_cases").html(number_format(field.total_cases, "", "", ","));
  //     //$("#source").html(field.source.url);
  //   },
  //   error: function (response) {
  //     alert('Error Response');
  //   },
  // });
});

