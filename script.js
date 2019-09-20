var len;
var results = '';

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://mybamaid-421-search-api.cognitiveservices.azure.com/bing/v7.0/search/?' + $.param(params),
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "c7c469774dca4f6ab0d40d370e439838");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }
      console.log(results)
      $('#searchResults').html(results);
      $('#searchResults').dialog({title: "Search Results..."});
    })
    .fail(function () {
      alert("error");
    });
}

//similar to API search function provided but only links to the url for the first result

function apiSearchLucky() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://mybamaid-421-search-api.cognitiveservices.azure.com/bing/v7.0/search/?' + $.param(params),
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "c7c469774dca4f6ab0d40d370e439838");
      },
      type: "GET",
    })
    .done(function (data) {
      result = data.webPages.value[0].url;
      window.location.href = result;
    })
    .fail(function () {
      alert("error");
    });
}

// this click event uses the apiSearch function with the search button

$(document).ready(function(){
  $("#search").click(function(){
      document.getElementById("searchResults").style.visibility = "visible";
    apiSearch();
  });
});

// this event is for the I'm feeling lucky button

$(document).ready(function(){
  $("#lucky").click(function(){
    apiSearchLucky();
  });
});

//this value and function allow for the picture to be swapped

var pic1 = true; //this acts like a state, in a way

$(document).ready(function(){
  $("#bgchange").click(function(){
    var picture1 = "url(zoolanderbg1.jpg)";
    var picture2 = "url(zoolanderbg2.jpg)";
    if (pic1 === true) {
        document.body.style.backgroundImage=picture2;
        pic1 = false; //sets to false after switch, so another switch can happen
    }
    else {
        document.body.style.backgroundImage=picture1;
        pic1 = true; //set to true after switch can happen
    }
  });
});

//this DOM event is for bringing up a dialog with the current time

$(document).ready(function(){
  $("#currentTime").click(function(){
    var d = new Date();
    var meridian = "AM"
    var hours = d.getHours()
    var minutes = d.getMinutes()
    if (hours > 12) { //if loop checks to see if hours are over 12 so PM can be used instead
        hours -= 12;
        meridian = "PM"
    }
    document.getElementById("time").innerHTML = hours + ":" + minutes + " " + meridian;
    $('#time').dialog({title: "The Current Time is..."});
    document.getElementById("time").style.visibility = "visible";
  });
});