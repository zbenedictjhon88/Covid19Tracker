$(document).ready(function () {
  $("#global").click(function () {
    $.getScript("../components/global/global.js");
    $.get("components/global/global.html", function (data) {
      $("#global").addClass("w3-theme");
      $("#countries").removeClass("w3-theme");
      $("main").html(data);
    });
  });

  $("#countries").click(function () {
    $.getScript("../components/countries/countries.js");
    $.get("components/countries/countries.html", function (data) {
      $("#countries").addClass("w3-theme");
      $("#global").removeClass("w3-theme");
      $("main").html(data);      
    });
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
