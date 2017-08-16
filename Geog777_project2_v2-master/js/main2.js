// function main() {
var map = L.map('map', {
    center: L.latLng(39.09461, -120.08),
    zoom: 11
});

var basemap = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

basemap.addTo(map);

var cartoCSSPeaks = "#layer { "+
    //"marker-width: ramp([elevation], range(2, 8)," +
    //"quantiles(5));" +
    "marker-width: 10;" +
    "marker-fill: #594316;" +
    "marker-fill-opacity: 0.9;" +
    "marker-allow-overlap: true;" +
    "marker-line-width: 1;" +
    "marker-line-color: #FFF;" +
    "marker-line-opacity: 1;" +

  "}"

var cartoCSSRecreationActivity = "#layer {" +
  "marker-width: 10;" +
  "marker-fill: #FFB927;" +
  "marker-fill-opacity: 0.9;" +
  "marker-allow-overlap: true;" +
  "marker-line-width: 1;" +
  "marker-line-color: #FFF;" +
  "marker-line-opacity: 1;" +
"}"

var cartoCSSBikeTrails = "#layer {" +
  "line-width: 2;" +
  "line-color: #d34dee;" +
  "line-opacity: 1;" +
"}"

var cartoCSSTrails = "#layer {" +
  "line-width: 2;" +
  "line-color: #1b8d63;" +
  "line-opacity: 1;" +
"}"

var cartoCSSRecreationFacility = "#layer {" +
  "polygon-fill: #d35b7b;" +
  "polygon-opacity: 0.5;" +
  "line-width: 1;" +
  "line-color: #FFF;" +
  "line-opacity: 0.5;" +
"}"

var cartoCSSScenicShorePoints = "#layer {" +
  "marker-width: 7;" +
  "marker-fill: #4ca3fa;" +
  "marker-fill-opacity: 0.9;" +
  "marker-allow-overlap: true;" +
  "marker-line-width: 1;" +
  "marker-line-color: #FFF;" +
  "marker-line-opacity: 1;" +
"}"

var cartoCSSRiver = "#layer {" +
  "line-width: 2.5;" +
  "line-color: #73def9;" +
  "line-opacity: 1;" +
"}"


var peaks, recreationActivity, bikeTrails, trails, recreationFacility, river, scenicPoints

// add cartodb layer with one layer
cartodb.createLayer(map, {
  user_name: 'wilson38', // Required
  type: 'cartodb', // Required
  sublayers: [
  { // first sublayer is the one that is painted at the bottom
      sql: "SELECT * FROM peaks", // Required
      cartocss: cartoCSSPeaks, // Required

   },
   { // first sublayer is the one that is painted at the bottom
       sql: "SELECT * FROM recreationactivities", // Required
       cartocss: cartoCSSRecreationActivity, // Required

    },
    { // first sublayer is the one that is painted at the bottom
        sql: "SELECT * FROM bike_trails_proposed", // Required
        cartocss: cartoCSSBikeTrails, // Required

     },
     { // first sublayer is the one that is painted at the bottom
         sql: "SELECT * FROM trailnfs", // Required
         cartocss: cartoCSSTrails, // Required

      },
      { // first sublayer is the one that is painted at the bottom
          sql: "SELECT * FROM recreation_facility", // Required
          cartocss: cartoCSSRecreationFacility, // Required

       },
       { // first sublayer is the one that is painted at the bottom
           sql: "SELECT * FROM wildscenicriversegment", // Required
           cartocss: cartoCSSRiver, // Required

        },
       { // first sublayer is the one that is painted at the bottom
           sql: "SELECT * FROM scenic_shoreline_points", // Required
           cartocss: cartoCSSScenicShorePoints, // Required

        },

  ]
}).addTo(map)
.done(function(layer){
peaks = layer.getSubLayer(0); // declare a layer0 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['name', 'elevation'])
console.log(peaks); // show in the console layer0

recreationActivity = layer.getSubLayer(1); // declare a layer1 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(1), ['recareanam', 'parentacti', 'openstatus', 'latitude', 'longitude'])
console.log(recreationActivity); // show in the console layer1

bikeTrails = layer.getSubLayer(2); // declare a layer1 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(2), ['name', 'miles', 'from_', 'to_'])
console.log(bikeTrails); // show in the console layer1

trails = layer.getSubLayer(3); // declare a layer1 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(3), ['trail_name', 'segment_le', 'trail_type'])
console.log(trails); // show in the console layer1

recreationFacility = layer.getSubLayer(4); // declare a layer1 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(4), ['facility', 'type', 'fac_open'])
console.log(recreationFacility); // show in the console layer1

river = layer.getSubLayer(5); // declare a layer1 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(5), ['gnis_name', 'total_mile'])
console.log(river); // show in the console layer1

scenicPoints = layer.getSubLayer(6); // declare a layer1 variable
cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(6), ['view_type', 'unit_name'])
console.log(scenicPoints); // show in the console layer1

var $options = $('#layer_selector li');
$options.click(function(e) {
  // get the area of the selected layer
  var $li = $(e.target);
  var legend = $li.attr('id');
  if(selectedLayer != layer ){
    // definitely more elegant ways to do this, but went for
    // ease of understanding
    if (legend == 'peaks'){
      layer.getSubLayer(0).show(); // countries
      layer.getSubLayer(1).hide(); // cables
      layer.getSubLayer(2).hide();
      layer.getSubLayer(3).hide();
      layer.getSubLayer(4).hide();
      layer.getSubLayer(5).hide();
      layer.getSubLayer(6).hide(); // populated places
    }
    else if (legend == 'recreationActivity') {
      layer.getSubLayer(0).hide(); // countries
      layer.getSubLayer(1).show(); // cables
      layer.getSubLayer(2).hide();
      layer.getSubLayer(3).hide();
      layer.getSubLayer(4).hide();
      layer.getSubLayer(5).hide();
      layer.getSubLayer(6).hide();
    }
    else if (legend == 'bikeTrails') {
      layer.getSubLayer(0).hide(); // countries
      layer.getSubLayer(1).hide(); // cables
      layer.getSubLayer(2).show();
      layer.getSubLayer(3).hide();
      layer.getSubLayer(4).hide();
      layer.getSubLayer(5).hide();
      layer.getSubLayer(6).hide();
    }
    else if (legend == 'trails') {
      layer.getSubLayer(0).hide(); // countries
      layer.getSubLayer(1).hide(); // cables
      layer.getSubLayer(2).hide();
      layer.getSubLayer(3).show();
      layer.getSubLayer(4).hide();
      layer.getSubLayer(5).hide();
      layer.getSubLayer(6).hide();
    }
    else if (legend == 'recreationFacility') {
      layer.getSubLayer(0).hide(); // countries
      layer.getSubLayer(1).hide(); // cables
      layer.getSubLayer(2).hide();
      layer.getSubLayer(3).hide();
      layer.getSubLayer(4).show();
      layer.getSubLayer(5).hide();
      layer.getSubLayer(6).hide();
    }
    else if (legend == 'river') {
      layer.getSubLayer(0).hide(); // countries
      layer.getSubLayer(1).hide(); // cables
      layer.getSubLayer(2).hide();
      layer.getSubLayer(3).hide();
      layer.getSubLayer(4).hide();
      layer.getSubLayer(5).show();
      layer.getSubLayer(6).hide();
    }
    else if (legend == 'scenicPoints') {
      layer.getSubLayer(0).hide(); // countries
      layer.getSubLayer(1).hide(); // cables
      layer.getSubLayer(2).hide();
      layer.getSubLayer(3).hide();
      layer.getSubLayer(4).hide();
      layer.getSubLayer(5).hide();
      layer.getSubLayer(6).show();
    }
    else {
      layer.getSubLayer(0).show(); // peaks
      layer.getSubLayer(1).show(); // cables
      layer.getSubLayer(2).show();
      layer.getSubLayer(3).show();
      layer.getSubLayer(4).show();
      layer.getSubLayer(5).show();
      layer.getSubLayer(6).show();
    }
  }
});

});


$('#searchButton').click(function(){
  input = $( "#ad").val();
  var sql = new cartodb.SQL({ user: 'wilson38' });
  sql.getBounds("SELECT * FROM recreationactivities '" + input + "'").done(function(bounds) {
     map.fitBounds(bounds)
     });
   });

var recreationLocations = null;
var sqlQuery = "SELECT * FROM recreationactivities";
var sqlQueryHiking = "SELECT * FROM recreationactivities WHERE parentacti='Hiking'"
var cartoDBUserName = "wilson38";
// Function to add all coffee shops

// Set Global Variable that will hold your location
var myLocation = null;

// Set Global Variable that will hold the marker that goes at our location when found
var locationMarker = null;

// Listen for a click event on the Map element
map.on('click', locationFound);

// Function that will run when the location of the user is found
function locationFound(e){
    myLocation = e.latlng;
    closestRecreation();
    locationMarker = L.marker(e.latlng);
    map.addLayer(locationMarker);
};

// Function that will run if the location of the user is not found
function locationNotFound(e){
    alert(e.message);
};

// Function will find and load the five nearest coffee shops to a user location
function closestRecreation(){
  // Set SQL Query that will return five closest coffee shops
  var sqlQueryClosest = "SELECT * FROM recreationactivities ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint("+myLocation.lng+","+myLocation.lat+"), 4326) LIMIT 5";

  // remove CoffeeShopLocations if on map
  if(map.hasLayer(recreationLocations)){
    map.removeLayer(recreationLocations);
  };

  // remove locationMarker if on map
  if(map.hasLayer(locationMarker)){
    map.removeLayer(locationMarker);
  };

  // Get GeoJSON of five closest points to the user
  $.getJSON("https://"+cartoDBUserName+".carto.com/api/v2/sql?format=GeoJSON&q="+sqlQueryClosest, function(data) {
    recreationLocations = L.geoJson(data,{
      onEachFeature: function (feature, layer) {
        layer.bindPopup('' + feature.properties.recareanam + '' + feature.properties.parentacti + '');
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
var cartoDBUserName2 = "wilson38";
// Write SQL Selection Query to be Used on CARTO Table
// Name of table is 'data_collector'
var sqlQueryAddData = "SELECT * FROM data_collector";

var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
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
var drawControl = new L.Control.Draw({
  draw : {
    marker: true,
    polygon : false,
    polyline : false,
    rectangle : false,
    circle : false
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

  // Do whatever else you need to. (save to db, add to map etc)

  drawnItems.addLayer(layer);
});

// Boolean global variable used to control visiblity
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

// Function to remove the draw control from the map
function stopEdits(){
  map.removeControl(drawControl);
  controlOnMap = false;
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
        var sql = "INSERT INTO data_collector (the_geom, name, description, latitude, longitude) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('";
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

// Function to remove the draw control from the map
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
  // function createSelector(layers) {
  //   var sql = new cartodb.SQL({ user: 'documentation' });
