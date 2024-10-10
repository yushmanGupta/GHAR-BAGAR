function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i in uiBathrooms) {
      if (uiBathrooms[i].checked) {
          return parseInt(i) + 1;
      }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i in uiBHK) {
      if (uiBHK[i].checked) {
          return parseInt(i) + 1;
      }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
    var bhk = document.querySelector('input[name="uiBHK"]:checked').value;
    var bathrooms = document.querySelector('input[name="uiBathrooms"]:checked').value;
    var location = document.getElementById("uiLocations").value;

    var url = "/predict_home_price";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bhk: bhk,
            bathrooms: bathrooms,
            location: location
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("uiEstimatedPrice").innerHTML = "<h2>Estimated Price: ₹" + data.estimated_price + "</h2>";
    });
}


function onPageLoad() {
  console.log("document loaded");
  var url = "/get_location_names"; // Use this if you are using nginx
  $.get(url, function(data, status) {
      console.log("got response for get_location_names request");
      if (data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for (var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;
