## India Water Tool

The objective of this repository is to collect surface water information for India at the district level.  There are three stages of the process:

1. The first step is to process a custom map, manually, in Carto with SQL and upload it to Fusion Tables.  
2. The second step aggregates NASA's normalized difference water index for each district and each year since 2000.  
3. The third and final step merges the rectangular data set into the *original* boundary map (prior to processing). 

All of these steps could be accomplished in one Python script, using the Carto and Earth Engine APIs and Python client libraries.  This is beyond the scope of this project; but it could be quickly incorporated if needed.

##### Normalized Difference Water Index

The returned data is based on the Normalized Difference Water Index (NDWI) derived from Landsat 7 composites.  Before continuing onto the processing steps, here is a description of the output.

The Landsat 7 composites are made from Level L1T orthorectified scenes, using the computed top-of-atmosphere (TOA) reflectance. See [Chander et al. (2009)](http://www.sciencedirect.com/science/article/pii/S0034425709000169) for details on the TOA computation. The NDWI is sensitive to changes in liquid water content of vegetation canopies. It is derived from the Near-IR band and a second IR band, ≈1.24μm when available and the nearest available IR band otherwise. It ranges in value from -1.0 to 1.0. See [Gao (1996)](http://www.sciencedirect.com/science/article/pii/S0034425796000673) for details.

The composites can be created within either 32-day or Annual intervals. The following describes the compositing range for both options:

1. The **32-day** composites are created from all the scenes in each 32-day period beginning from the first day of the year and continuing to the 352nd day of the year. The last composite of the year, beginning on day 353, will overlap the first composite of the following year by 20 days. All the images from each 32-day period are included in the composite, with the most recent pixel as the composite value.
2. The **annual** composites are created from all the scenes in each annual period beginning from the first day of the year and continuing to the last day of the year. All the images from each year are included in the composite, with the most recent pixel as the composite value.

### Process district map

The original data set, uploaded directly from WBCSD is found [**here**](https://danhammer.carto.com/tables/distrct_bdy).  The permissions are public, so that any developer can access the map online and make changes on their [Carto](https://www.carto.com) account.  The instructions are found in the first-stage SQL script [`preprocess.sql`](code/preprocess.sql).

> **input**: original boundary map

> **output**: fusion table of simplified boundaries


### Aggregate water information by district

There are actually two steps to this work, both the JavaScript to process the satellite imagery on Earth Engine and the Python code to process the (rather messy) output from Earth Engine.  The JavaScript, [`aggregate.js`](code/aggregate.js), aggregates the imagery for each district and exports to a CSV on Google Drive. The Python, [`process_results.py`](code/process_results.py), then processes the CSV into a Pandas data frame, cleans and reshapes the output, and finally outputs to yet another CSV for upload to Carto.

> **input**: fusion table of simplified boundaries

> **output**:  CSV with cartodb_id and annual water data

### Merge water information with boundaries

The final script, [`merge.sql`](code/merge.sql) performs an `INNER JOIN` on the output CSV and the *original* district boundaries.  

> **input**: CSV with cartodb_id and annual water data

> **output**:  Online Carto map with water data as column fields

### The final output

The final output has been merged into a Carto map.  The Carto infrastructure allows the data to be downloaded as a CSV, shapefile, KML, GeoJSON, and SVG files.  A map of the final data is [here](https://danhammer.carto.com/viz/fc82a266-577e-11e6-8107-0e3ff518bd15/embed_map), visualized for the 2016 composite.  The shapefile can be directly downloaded from [this link](https://dl.dropboxusercontent.com/u/5365589/distrct_bdy.zip). We can create a fully fledged web application (with animation) from this infrastructure fairly quickly.