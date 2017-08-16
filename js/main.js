

// var cartoCSSPeaks = "#layer { "+
//     //"marker-width: ramp([elevation], range(2, 8)," +
//     //"quantiles(5));" +
//     "marker-width: 8;" +
//     "marker-fill: #594316;" +
//     "marker-fill-opacity: 0.9;" +
//     "marker-allow-overlap: true;" +
//     "marker-line-width: 1;" +
//     "marker-line-color: #FFF;" +
//     "marker-line-opacity: 1;" +

//   "}"

// var peaksAreOn = false;

// //add data to map
// var wifi = cartodb.createLayer(map, {
//     user_name: 'nrobson',
//     type: 'cartodb',
//     sublayers: [{type: "cartodb",
//     sql: 'SELECT * FROM wifi',
//     cartocss: cartoCSSPeaks,

// }]
// }, { https: true })

// .addTo(map)
//   .done(function(layer) {
//             // add infowindow
//             cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['name', 'elevation'])
//           });




// var cartoCSSRecreationActivity = "#layer {" +
//   "marker-width: 8;" +
//   "marker-fill: #FFB927;" +
//   "marker-fill-opacity: 0.9;" +
//   "marker-allow-overlap: true;" +
//   "marker-line-width: 1;" +
//   "marker-line-color: #FFF;" +
//   "marker-line-opacity: 1;" +
// "}"

// //add data to map
// var recreationActivity = cartodb.createLayer(map, {
//     user_name: 'nrobson',
//     type: 'cartodb',
//     sublayers: [{type: "cartodb",
//     sql: 'SELECT * FROM recreationactivities',
//     cartocss: cartoCSSRecreationActivity,

// }]
// }, { https: true })

// .addTo(map)
//   .done(function(layer) {
//             // add infowindow
//             cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['recareanam', 'parentacti', 'openstatus', 'latitude', 'longitude'])
//           });

// var cartoCSSbikeroutes = "#layer {" +
//   "line-width: 1.5;" +
//   "line-color: #d34dee;" +
//   "line-opacity: 1;" +
// "}"

// //add data to map
// var bikeRoutes = cartodb.createLayer(map, {
//     user_name: 'nrobson',
//     type: 'cartodb',
//     sublayers: [{type: "cartodb",
//     sql: 'SELECT * FROM bikeroutes',
//     cartocss: cartoCSSbikeroutes,

// }]
// }, { https: true })

// .addTo(map)
// .done(function(layer) {
//           // add infowindow
//           cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['name', 'miles', 'from_', 'to_'])
//         });

// var cartoCSSTrails = "#layer {" +
//   "line-width: 1.5;" +
//   "line-color: #1b8d63;" +
//   "line-opacity: 1;" +
// "}"

// //add data to map
// var trails = cartodb.createLayer(map, {
//     user_name: 'nrobson',
//     type: 'cartodb',
//     sublayers: [{type: "cartodb",
//     sql: 'SELECT * FROM trailnfs',
//     cartocss: cartoCSSTrails,

// }]
// }, { https: true })

// .addTo(map)
// .done(function(layer) {
//           // add infowindow
//           cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['trail_name', 'segment_le', 'trail_type'])
//         });

// var cartoCSSathleticfacilities = "#layer {" +
//   "polygon-fill: #d35b7b;" +
//   "polygon-opacity: 0.5;" +
//   "line-width: 1;" +
//   "line-color: #FFF;" +
//   "line-opacity: 0.5;" +
// "}"

// //add data to map
// var athleticfacilities = cartodb.createLayer(map, {
//     user_name: 'nrobson',
//     type: 'cartodb',
//     sublayers: [{type: "cartodb",
//     sql: 'SELECT * FROM athleticfacilities',
//     cartocss: cartoCSSathleticfacilities,
//     layerIndex: 5
// }]
// }, { https: true })

// .addTo(map)
// .done(function(layer) {
//           // add infowindow
//           cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['facility', 'type', 'fac_open'])
//         });

// var cartoCSScrime = "#layer {" +
//   "marker-width: 7;" +
//   "marker-fill: #4ca3fa;" +
//   "marker-fill-opacity: 0.9;" +
//   "marker-allow-overlap: true;" +
//   "marker-line-width: 1;" +
//   "marker-line-color: #FFF;" +
//   "marker-line-opacity: 1;" +
// "}"

// //add data to map
// var crime = cartodb.createLayer(map, {
//     user_name: 'nrobson',
//     type: 'cartodb',
//     sublayers: [{type: "cartodb",
//     sql: 'SELECT * FROM crime',
//     cartocss: cartoCSScrime,
//     layerIndex: 
// }]
// }, { https: true })

// .addTo(map)
// .done(function(layer) {
//           // add infowindow
//           cartodb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['view_type', 'unit_name'])
//         });

// L.control.layers(wifi, crime, bikeRoutes, trails, athleticfacilities).addTo(map);

// //search for nearest wifi?
// $('#searchButton').click(function(){
//   input = $( "#ad").val();
//   var sql = new cartodb.SQL({ user: 'nrobson' });
//   sql.getBounds("SELECT * FROM wifi '" + input + "'").done(function(bounds) {
//      map.fitBounds(bounds)
//      });
//    });

// var wifiLocations = null;
// var sqlQuery = "SELECT * FROM wifi";
// //create a variable for all free wifi
// var sqlQueryFree = "SELECT * FROM wifi WHERE type='Free'"
// var cartoDBUserName = "nrobson";

// //function to add all wifi
// function showAll(){
//     if(map.hasLayer(wifiLocations)){
//         map.removeLayer(wifiLocations);
//     };
//     // Get CARTO selection as GeoJSON and Add to Map
//     $.getJSON("https://"+cartoDBUserName+".carto.com/api/v2/sql?format=GeoJSON&q="+sqlQuery, function(data) {
//         recreationLocations = L.geoJson(data,{
//             onEachFeature: function (feature, layer) {
//                 layer.bindPopup('<p><b>' + feature.properties.recareanam + '</b><br /><em>' + feature.properties.parentacti + '</em></p>');
//                 layer.cartodb_id=feature.properties.cartodb_id;
//             }
//         }).addTo(map);
//     });
// };

// // Run showAll function automatically when document loads
// $( document ).ready(function() {
//   showAll();
// });
