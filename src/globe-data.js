// Globe data from the original GitHub Globe repository
export const GLOBE_DATA_JS = `
const countries = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "ISO_A3": "USA",
        "NAME": "United States"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-74, 40], [-122, 37], [-87, 41], [-74, 40]]]
      }
    },
    {
      "type": "Feature", 
      "properties": {
        "ISO_A3": "GBR",
        "NAME": "United Kingdom"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[0, 51], [-3, 53], [2, 52], [0, 51]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "ISO_A3": "JPN", 
        "NAME": "Japan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[139, 35], [140, 36], [138, 34], [139, 35]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "ISO_A3": "AUS",
        "NAME": "Australia" 
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[151, -33], [153, -27], [149, -35], [151, -33]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "ISO_A3": "DEU",
        "NAME": "Germany"
      },
      "geometry": {
        "type": "Polygon", 
        "coordinates": [[[13, 52], [15, 54], [11, 50], [13, 52]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "ISO_A3": "FRA",
        "NAME": "France"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[2, 48], [4, 50], [0, 46], [2, 48]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "ISO_A3": "CAN",
        "NAME": "Canada"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-79, 43], [-75, 45], [-83, 41], [-79, 43]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "ISO_A3": "BRA",
        "NAME": "Brazil"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-46, -23], [-44, -21], [-48, -25], [-46, -23]]]
      }
    }
  ]
};

export const flights = [
  {
    "order": 1,
    "startLat": 37.7749,
    "startLng": -122.4194,
    "endLat": 40.7128,
    "endLng": -74.0060,
    "status": true,
    "arcAlt": 0.3
  },
  {
    "order": 2,
    "startLat": 40.7128,
    "startLng": -74.0060,
    "endLat": 51.5074,
    "endLng": -0.1278,
    "status": true,
    "arcAlt": 0.4
  },
  {
    "order": 3,
    "startLat": 51.5074,
    "startLng": -0.1278,
    "endLat": 35.6762,
    "endLng": 139.6503,
    "status": true,
    "arcAlt": 0.5
  },
  {
    "order": 4,
    "startLat": 35.6762,
    "startLng": 139.6503,
    "endLat": -33.8688,
    "endLng": 151.2093,
    "status": false,
    "arcAlt": 0.4
  },
  {
    "order": 5,
    "startLat": -33.8688,
    "startLng": 151.2093,
    "endLat": 52.5200,
    "endLng": 13.4050,
    "status": true,
    "arcAlt": 0.35
  }
];

export const airports = [
  {
    "text": "SF",
    "size": 1.0,
    "city": "San Francisco",
    "lat": "37.7749",
    "lng": "-122.4194"
  },
  {
    "text": "NYC",
    "size": 1.0,
    "city": "New York",
    "lat": "40.7128",
    "lng": "-74.0060"
  },
  {
    "text": "LON",
    "size": 1.0,
    "city": "London",
    "lat": "51.5074",
    "lng": "-0.1278"
  },
  {
    "text": "TOK",
    "size": 1.0,
    "city": "Tokyo",
    "lat": "35.6762",
    "lng": "139.6503"
  },
  {
    "text": "SYD",
    "size": 1.0,
    "city": "Sydney",
    "lat": "-33.8688",
    "lng": "151.2093"
  },
  {
    "text": "BER",
    "size": 1.0,
    "city": "Berlin",
    "lat": "52.5200",
    "lng": "13.4050"
  }
];
