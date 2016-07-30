## India Water Tool

The objective of this repository is to collect surface water information for India at the district level.  There are three stages of the process:

1. The first step is to process a custom map, manually, in Carto with SQL and upload it to Fusion Tables.  
2. The second step aggregates NASA's normalized difference water index for each district and each year since 2000.  
3. The third and final step merges the rectangular data set into the *original* boundary map (prior to processing). 

All of these steps could be accomplished in one Python script, using the Carto and Earth Engine APIs and Python client libraries.  This is beyond the scope of this project; but it could be quickly incorporated if needed.

### Process district map

The original data set, uploaded directly from WBCSD is found [**here**](https://danhammer.carto.com/tables/distrct_bdy).  The permissions are public, so that any developer can access the map online and make changes on their [Carto](https://www.carto.com) account.  The instructions are found in the [first-stage script](first.sql).

> **input**: original boundary map

> **output**: fusion table of simplified boundaries


### Aggregate water information by district


> **input**: fusion table of simplified boundaries

> **output**:  CSV with cartodb_id and annual water data

### Merge water information with boundaries


> **input**: CSV with cartodb_id and annual water data

> **output**:  Online Carto map with water data as column fields