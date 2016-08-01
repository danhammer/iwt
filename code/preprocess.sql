-- The first step

SELECT 
    ST_Simplify(the_geom_webmercator, 1000) as the_geom_webmercator,
    cartodb_id
FROM 
    distrct_bdy

-- Click "create data set from query" and call the resulting dataset
-- `district_bdy_simplified`. Download as kml for upload into fusion tables.
-- Currently, this is located at: 1kJF84hDpyk8XNDqHRFXdGzWKhxVWgSdCOLJgn9d4
-- Ensure that you set permissions to "Public on the web".