/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function () {
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function () {
    app.receivedEvent("deviceready");
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector(".listening");
    var receivedElement = parentElement.querySelector(".received");

    listeningElement.setAttribute("style", "display:none;");
    receivedElement.setAttribute("style", "display:block;");

    global();

    console.log("Received Event: " + id);
  },
};

function global() {
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
      alert('Error Response: ' + response);
    },
  });

  $.get("components/global/global.html", function (data) {
    $("#global").addClass("w3-theme");
    $("main").html(data);
    $.getScript("components/global/global.js");
  });
}




