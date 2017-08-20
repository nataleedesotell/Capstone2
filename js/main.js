// function main() {
  // map view before we get the location
var map = L.map('map', {
    center: L.latLng(40.779, -73.968),
    maxZoom: 17,
    minZoom: 13,
    //zoom on load
    zoom: 14

});

//location
lc = L.control.locate({
    strings: {
        title: "Where am I?"
    }
}).addTo(map);

var basemap = L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://maps.stamen.com">Stamen</a>'
});

basemap.addTo(map);



//COLORBREWER
//POLYGONS teal
var cartoCSSpools ="#layer {" +
  "polygon-fill: #1b9e77;" +
  "polygon-opacity: 1;" +
  "line-width: 1;" +
  "line-color: #FFF;" +
  "line-opacity: 0.0;" +
"}"

//POLYGONS pink
var cartoCSSplaygrounds ="#layer {" +
  "polygon-fill: #e7298a;" +
  "polygon-opacity: 1;" +
  "line-width: 1;" +
  "line-color: #FFF;" +
  "line-opacity: 0.0;" +
"}"
 
//POINTS
//will ideally use icons but styling markers for now
var cartoCSSwifi = "#layer { "+
    "marker-width: 13;" +
    "marker-fill: #7570b3;" +
    "marker-fill-opacity: 1;" +
    "marker-allow-overlap: true;" +
    "marker-line-width: 1;" +
    "marker-line-color: #FFF;" +
    "marker-line-opacity: 0.0;" +
  "}"

  //POINTS
//will ideally use icons but styling markers for now
var cartoCSSrestrooms = "#layer { "+
    "marker-width: 13;" +
    "marker-fill: #d95f02;" +
    "marker-fill-opacity: 1;" +
    "marker-allow-overlap: true;" +
    "marker-line-width: 1;" +
    "marker-line-color: #FFF;" +
    "marker-line-opacity: 0.0;" +
  "}"

//POINTS
var cartoCSScrime = "#layer {" +
  "marker-width: 13;" +
  "marker-fill: #e41a1c;" +
  "marker-fill-opacity: 1;" +
  "marker-allow-overlap: false;" +
  "marker-line-width: 1;" +
  "marker-line-color: #FFF;" +
  "marker-line-opacity: 0.0;" +
"}"

//LINES
var cartoCSSbikeroutes = "#layer {" +
  "line-width: 3;" +
  "line-color: #e6ab02;" +
  "line-opacity: 1;" +
"}"

//POLYGONS
//green color to mimic grass
var cartoCSSathleticfacilities = "#layer {" +
  "polygon-fill: #66a61e;" +
  "polygon-opacity: 1;" +
  "line-width: 1;" +
  "line-color: #FFF;" +
  "line-opacity: 0.0;" +
"}"

//order should be: athleticfacilities, playgrounds, bikeroutes, crime, wifi

var bikeroutes, wifi, crime, athleticfacilities, playgrounds, pools, restrooms

// add cartodb layer with one layer
cartodb.createLayer(map, {
  user_name: 'nrobson', // Required
  type: 'cartodb', // Required
  sublayers: [

      { // first sublayer is the one that is painted at the bottom
        sql: "SELECT * FROM bikeroutes", // Required
        cartocss: cartoCSSbikeroutes, // Required

     },
  { // first sublayer is the one that is painted at the bottom
      sql: "SELECT * FROM wifi", // Required
      cartocss: cartoCSSwifi, // Required

   },
   { // first sublayer is the one that is painted at the bottom
       sql: "SELECT * FROM crime", // Required
       cartocss: cartoCSScrime, // Required

    },

      { // first sublayer is the one that is painted at the bottom
          sql: "SELECT * FROM athleticfacilities", // Required
          cartocss: cartoCSSathleticfacilities, // Required

       },

             { // first sublayer is the one that is painted at the bottom
          sql: "SELECT * FROM playgrounds", // Required
          cartocss: cartoCSSplaygrounds, // Required

       },

             { // first sublayer is the one that is painted at the bottom
          sql: "SELECT * FROM pools WHERE name = 'Lasker'", // Required
          cartocss: cartoCSSpools, // Required

       },

           { // first sublayer is the one that is painted at the bottom
          sql: "SELECT * FROM restrooms", // Required
          cartocss: cartoCSSrestrooms, // Required

       },

  ]
}).addTo(map)
.done(function(layer){

bikeroutes = layer.getSubLayer(0); // declare a layer1 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['tostreet', 'fromstreet', 'comments'])
console.log(bikeroutes); // show in the console layer1

wifi = layer.getSubLayer(1); // declare a layer0 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(1), ['type', 'location'])
console.log(wifi); // show in the console layer0

crime = layer.getSubLayer(2); // declare a layer1 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(2), ['pd_desc', 'cmplnt_fr_'])
console.log(crime); // show in the console layer1

athleticfacilities = layer.getSubLayer(3); // declare a layer1 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(3), ['name', 'accessible'])
console.log(athleticfacilities); // show in the console 

playgrounds = layer.getSubLayer(4); // declare a layer1 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(4), [])
console.log(playgrounds); // show in the console 

pools = layer.getSubLayer(5); // declare a layer1 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(5), ['name', 'location', 'type'])
console.log(pools); // show in the console 

restrooms = layer.getSubLayer(6); // declare a layer1 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(6), ['name', 'location', 'hours'])
console.log(restrooms); // show in the console 

var $options = $('#layer_selector li');
$options.click(function(e) {
  // get the area of the selected layer
  var $li = $(e.target);
  var legend = $li.attr('id');
  if(selectedLayer != layer ){
    if (legend == 'bikeroutes'){
      layer.getSubLayer(0).show(); // wifi
      layer.getSubLayer(1).hide(); // crime
      layer.getSubLayer(2).hide(); //bikeroutes
      layer.getSubLayer(3).hide();
      layer.getSubLayer(4).hide();
      layer.getSubLayer(5).hide();
      layer.getSubLayer(6).hide();
    }
    else if (legend == 'wifi') {
      layer.getSubLayer(0).hide(); // wifi
      layer.getSubLayer(1).show(); // crime
      layer.getSubLayer(2).hide(); //bikeroutes
      layer.getSubLayer(3).hide();
      layer.getSubLayer(4).hide();
      layer.getSubLayer(5).hide();
      layer.getSubLayer(6).hide();
    }
    else if (legend == 'crime') {
      layer.getSubLayer(0).hide(); // wifi
      layer.getSubLayer(1).hide(); // crime
      layer.getSubLayer(2).show();//bikeroutes
      layer.getSubLayer(3).hide();
      layer.getSubLayer(4).hide();
      layer.getSubLayer(5).hide();
      layer.getSubLayer(6).hide();
    }
    else if (legend == 'athleticfacilities') {
      layer.getSubLayer(0).hide(); // wifi
      layer.getSubLayer(1).hide(); // crime
      layer.getSubLayer(2).hide();//bikeroutes
      layer.getSubLayer(3).show();
      layer.getSubLayer(4).hide();
      layer.getSubLayer(5).hide();
    }
      else if (legend == 'playgrounds') {
      layer.getSubLayer(0).hide(); // wifi
      layer.getSubLayer(1).hide(); // crime
      layer.getSubLayer(2).hide();//bikeroutes
      layer.getSubLayer(3).hide();
      layer.getSubLayer(4).show();
      layer.getSubLayer(6).hide();
    }
      else if (legend == 'pools') {
      layer.getSubLayer(0).hide(); // wifi
      layer.getSubLayer(1).hide(); // crime
      layer.getSubLayer(2).hide();//bikeroutes
      layer.getSubLayer(3).hide();
      layer.getSubLayer(4).hide();
      layer.getSubLayer(5).show();
      layer.getSubLayer(6).hide();
    }
      else if (legend == 'restrooms') {
      layer.getSubLayer(0).hide(); // wifi
      layer.getSubLayer(1).hide(); // crime
      layer.getSubLayer(2).hide();//bikeroutes
      layer.getSubLayer(3).hide();
      layer.getSubLayer(4).hide();
      layer.getSubLayer(5).hide();
      layer.getSubLayer(6).show();
    }
    else {
      layer.getSubLayer(0).show(); // wifi
      layer.getSubLayer(1).show(); // crime
      layer.getSubLayer(2).show();//bikeroutes
      layer.getSubLayer(3).show();
      layer.getSubLayer(4).show();
      layer.getSubLayer(5).show();
      layer.getSubLayer(6).show();
    }
  }
});

});

//attempt at creating a restroom search
$('#searchButton').click(function(){
  input = $( "#ad").val();
  var sql = new cartodb.SQL({ user: 'nrobson' });
  sql.getBounds("SELECT * FROM restrooms '" + input + "'").done(function(bounds) {
     map.fitBounds(bounds)
     });
   });

var wifiLocations = null;
var sqlQuery = "SELECT * FROM restrooms";
var cartoDBUserName = "nrobson";

// Set Global Variable that will hold your location
var myLocation = null;

// Set Global Variable that will hold the marker that goes at our location when found
var locationMarker = null;

// Listen for a click event on the Map element
map.on('click', locationFound);

// Function that will run when the location of the user is found
function locationFound(e){
    myLocation = e.latlng;
    closestrestrooms();
    locationMarker = L.marker(e.latlng);
    map.addLayer(locationMarker);
};

// Function that will run if the location of the user is not found
function locationNotFound(e){
    alert(e.message);
};

// Function will find and load the five nearest crimes to the user location
function closestrestrooms(){
  // Set SQL Query that will return five nearest crimes
  var sqlQueryClosest = "SELECT * FROM restrooms ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint("+myLocation.lng+","+myLocation.lat+"), 4326) LIMIT 1";

  // remove crimes if they are on the map already
  if(map.hasLayer(restrooms)){
    map.removeLayer(restrooms);
  };

  // remove locationMarker if on map
  if(map.hasLayer(locationMarker)){
    map.removeLayer(locationMarker);
  };

  // Get GeoJSON of five closest points to the user
  $.getJSON("https://"+cartoDBUserName+".carto.com/api/v2/sql?format=GeoJSON&q="+sqlQueryClosest, function(data) {
    crimeLocations = L.geoJson(data,{
      onEachFeature: function (feature, layer) {
        layer.bindPopup('' + feature.properties.location + ' ' + feature.properties.type + '');
        layer.cartodb_id=feature.properties.cartodb_id;
      }
    }).addTo(map);
  });
};

// Add Data from CARTO using the SQL API
// Declare Variables
// Create Global Variable to hold CARTO points
var cartoDBPoints = null;
var cartoDBLines = null;
var cartoDBPolygons = null;
var cartoDBUserName2 = "nrobson";



// Write SQL Selection Query to be Used on CARTO Table
//Select data from the empty table in Carto
var sqlQueryAddData = "SELECT * FROM data_collector";

var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "red",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

// Get CARTO selection as GeoJSON and Add to Map
function getGeoJSON(){
  $.getJSON("https://"+cartoDBUserName2+".carto.com/api/v2/sql?format=GeoJSON&q="+sqlQueryAddData, function(data) {
    cartoDBPoints = L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        //var marker = L.marker(latlng);
        marker.bindPopup('' + feature.properties.description + ' submitted by ' + feature.properties.name + '');
        //return L.circleMarker(latlng, geojsonMarkerOptions);
      },
    style:  {
        radius: 8,
        fillColor: "#ff7800",
        color: "#fff",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      }
    }).addTo(map);
  });
};

// Run showAll function automatically when document loads
$( document ).ready(function() {
  getGeoJSON();
});

// Initialise the FeatureGroup to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);


// Create Leaflet Draw Control for the draw tools and toolbox
//only allows points for now, might add polygon option later
var drawControl = new L.Control.Draw({
  draw : {
    marker: true,
    polygon : true,
    polyline : false,
    rectangle : false,
    circle : true
  },
  edit: {
    featureGroup: drawnItems
  },
  remove: true
});

// map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
  var type = e.layerType
  var layer = e.layer;
  drawnItems.addLayer(layer);
});

// Boolean global variable used to control visiblity of controls
var controlOnMap = false;

// Create variable for Leaflet.draw features
var drawnItems = new L.FeatureGroup();

// Function to add the draw control to the map to start editing
function startEdits(){
  if(controlOnMap == true){
    map.removeControl(drawControl);
    controlOnMap = false;
  }
  map.addControl(drawControl);
  controlOnMap = true;
};

// Function to remove the draw control from the map when clicking "stop edits"
function stopEdits(){
  map.removeControl(drawControl);
  controlOnMap = false;
};


function showNone() {
location.reload();
console.log("reset the map");
};

// Use the jQuery UI dialog to create a dialog and set options
var dialog = $("#dialog").dialog({
  autoOpen: false,
  height: 300,
  width: 350,
  modal: true,
  position: {
    my: "center center",
    at: "center center",
    of: "#map"
  },
  buttons: {
    "Add to Database": setData,
    Cancel: function() {
      dialog.dialog("close");
      map.removeLayer(drawnItems);
    }
  },
  close: function() {
    // form[ 0 ].reset();
    console.log("Dialog closed");
  }
});

// Stops default form submission and ensures that setData or the cancel function run
var form = dialog.find("form").on("submit", function(event) {
  event.preventDefault();
});

// Function to run when feature is drawn on map
map.on('draw:created', function (e) {
  var layer = e.layer;
  drawnItems.addLayer(layer);
  map.addLayer(drawnItems);
  dialog.dialog("open");
});

// $("#dialog").dialog()


function setData() {
    var enteredUsername = username.value;
    var enteredDescription = description.value;
    drawnItems.eachLayer(function (layer) {
        var sql = "INSERT INTO data_collector (the_geom, name, description, lat, long) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('";
        var a = layer.getLatLng();
        var sql2 ='{"type":"Point","coordinates":[' + a.lng + "," + a.lat + "]}'),4326),'" + enteredDescription + "','" + enteredUsername + "','" + a.lat + "','" + a.lng +"')";
        var pURL = sql+sql2;
        submitToProxy(pURL);
        console.log("Feature has been submitted to the Proxy");
    });
    map.removeLayer(drawnItems);
    drawnItems = new L.FeatureGroup();
    console.log("drawnItems has been cleared");
    dialog.dialog("close");
};

// Submit data to the PHP using a jQuery Post method
 var submitToProxy = function(q){
   $.post("php/callProxy.php", {
     qurl:q,
     cache: false,
     timeStamp: new Date().getTime()
   }, function(data) {
     console.log(data);
     refreshLayer();
   });
 };

// refresh the layers to show the updated dataset
function refreshLayer() {
 if (map.hasLayer(cartoDBPoints)) {
   map.removeLayer(cartoDBPoints);
 };
 getGeoJSON();
};


// Function to add the draw control to the map to start editing
function startEdits(){
  if(controlOnMap == true){
    map.removeControl(drawControl);
    controlOnMap = false;
  }
  map.addControl(drawControl);
  controlOnMap = true;
};

// Function to remove the draw controls from the map (upper left buttons)
function stopEdits(){
  map.removeControl(drawControl);
  controlOnMap = false;
};

// Function to run when feature is drawn on map
map.on('draw:created', function (e) {
  var layer = e.layer;
  drawnItems.addLayer(layer);
  map.addLayer(drawnItems);
  dialog.dialog("open");
});

var selectedLayer;
  // create layer selector


// //START STOP EDIT BUTTONS

//   var imgObj;
// var animate = null;
// function init(){
//     imgObj = document.getElementById('myImage');
//     imgObj.style.position= 'relative';
//     imgObj.style.left = '0px';
// }

// startStopImg = function(){{
//   if(controlOnMap == true){
//     map.removeControl(drawControl);
//     controlOnMap = false;
//   }
//   map.addControl(drawControl);
//   controlOnMap = true;
//   change();
// };
// }

// // function moveRight(){
// // imgObj.style.left = (parseInt(imgObj.style.left) + 10) + 'px';
// // animate = setTimeout(moveRight,50); 
// // }

// change = function(){
// var elem = document.getElementById("startButton");
// if (elem.value=="Stop") elem.value = "Start";
// else elem.value = "Stop";
// }

// stop = function(){
//     clearTimeout(animate);
//     animate = null;
//     stopEdits();

// }
// window.onload = init();