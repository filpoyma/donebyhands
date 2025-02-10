export interface ICoordinates {
  lat: number;
  lon: number;
}

export interface IHaversineOptions {
  threshold?: number;
  unit: 'mile' | 'meter' | 'km' | 'nmi';
  format?: 'geojson' | '[lat,lon]' | '[lon,lat]' | '{lat,lng}' | '{lon,lat}';
}
