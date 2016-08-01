// Add simplified Indian district boundaries
var boundaries = ee.FeatureCollection("ft:1kJF84hDpyk8XNDqHRFXdGzWKhxVWgSdCOLJgn9d4");
Map.addLayer(boundaries);
Map.centerObject(boundaries, 5);
 
// There are two options for NDWI that are relevant for this work, the annual
// and monthly NDWI composites.  The identifers for the two are the following:
//    LANDSAT/LE7_L1T_ANNUAL_NDWI
//    LANDSAT/LE7_L1T_ANNUAL_NDWI
var collection = ee.ImageCollection('LANDSAT/LE7_L1T_ANNUAL_NDWI')
  .filterDate('2000-01-01', '2016-07-01') 
  .select('NDWI');


var ndwi_res = collection.map(
  function(img) {
    // Get the system start time property, and explicitly cast as a number
    // Note this time format is in milliseconds since Jan. 1, 1970
    var date = ee.Number(img.get('system:time_start'));
    // Add a band to the image representing that number
    img = img.addBands(date).rename(['ndwi', 'date']);
  
    // Use reduceRegions() as you did, but without the .setOutputs() call
    // on the reducer.
    var reduced = img.reduceRegions({
      collection: boundaries,
      reducer: ee.Reducer.mean(),
      scale: 250
    });
  
  return reduced;
});

// Export the feature set as a CSV to your Drive folder with a table named 
// `ndwi-ee`
Export.table.toDrive(
  ndwi_res.flatten(), 
  'ndwi-ee'
);
