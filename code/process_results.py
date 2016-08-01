# A script to process the Earth Engine output and upload to Carto
import pandas

data = pandas.read_csv(
    '../intermediate-results/ndwi-ee.csv',
    usecols=['system:index', 'cartodb_id', 'ndwi']
).rename(
    columns={
        'system:index': 'year',
        'cartodb_id': 'id'
    }
)

data['year'] = 'y' + data['year'].str[0:4]
wide = data.pivot(index='id', columns='year', values='ndwi')
wide.to_csv('../intermediate-results/ndwi.csv')

