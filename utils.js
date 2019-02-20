const baseUrl = "https://mybuslawrence.doublemap.com/map/v2/";
const routesSuff = "routes";
const busesSuff = "buses";
const stopsSuff = "stops";
const stopSuff = "eta?stop=";
const stopKey = "stop";
const busesKey = "buses";

async function getter(fieldName, promiseToGet, fresh = false) {
  if (!fresh) {
    const k = localStorage[fieldName];
    if (k) {
      return JSON.parse(k);
    }
  }
  //if you make it here, have to get fresh. store it.
  const z = await promiseToGet();
  localStorage[fieldName] = JSON.stringify(z);
  return z;
}
async function getBuses(fresh = false) {
  return getter("buses", () => myFetchAsJSON(baseUrl + busesSuff), fresh);
}

async function getRoutes(fresh = false) {
  return getter("routes", () => myFetchAsJSON(baseUrl + routesSuff), fresh);
}
async function getStops(fresh = false) {
  return getter("stops", () => myFetchAsJSON(baseUrl + stopsSuff), fresh);
}
function getParams() {
  return parse_query_string(window.location.search.substring(1));
}
async function myFetchAsJSON(targetUrl) {
  const k = await myFetch(targetUrl);
  return k.json();
}

//https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors/43268098
async function myFetch(targetUrl) {
  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const proxyUrl = "https://utils.pauliankline.com/proxy.php?csurl=";

  return fetch(proxyUrl + targetUrl);
}

//code taken from 'best' answer here: https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters
function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

//https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
//dist in KM
function getDist(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
function round(num, decimals) {
  const c = Math.pow(10, decimals);
  return Math.round(num * c) / c;
}
