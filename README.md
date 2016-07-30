## India Water Tool

The objective of this repository is to collect surface water information for India at the district level.  The first step is to process a custom map, manually, in Carto with SQL and upload it to Fusion Tables.  The second step aggregates NASA's normalized difference water index for each district and each year since 2000 using the Earth Engine Python API.  The code for the first step is pasted below (after running in the Carto interface), the code for the second step is properly tracked in the repo, and the final merge query is posted here to display in the information in Carto.

### Process district map


### Aggregate water information by district


### Merge water information with boundaries


