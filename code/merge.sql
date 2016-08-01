SELECT 
    d.cartodb_id,
    d.the_geom_webmercator,
    d.state,
    d.district,
    n.id,
    n.y2000,
    n.y2001,
    n.y2002,
    n.y2003,
    n.y2004,
    n.y2005,
    n.y2006,
    n.y2007,
    n.y2008,
    n.y2009,
    n.y2010,
    n.y2011,
    n.y2012,
    n.y2013,
    n.y2014,
    n.y2015,
    n.y2016
FROM distrct_bdy AS d
INNER JOIN ndwi AS n
ON n.id=d.cartodb_id