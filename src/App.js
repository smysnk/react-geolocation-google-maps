import React, { Component, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

import useLocations from './hooks/useLocations';
import Marker from './Marker';
import Stats from './Stats';

const getMapOptions = (maps) => {
  return {
    streetViewControl: false,
    scaleControl: true,
    fullscreenControl: false,
    styles: [{
        featureType: "poi.business",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }],
    gestureHandling: "greedy",
    // disableDoubleClickZoom: true,
    minZoom: 11,
    maxZoom: 55,
    mapTypeControl: true,
    mapTypeId: maps.MapTypeId.SATELLITE,
    mapTypeControlOptions: {
      style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: maps.ControlPosition.BOTTOM_CENTER,
      mapTypeIds: [
        maps.MapTypeId.ROADMAP,
        maps.MapTypeId.SATELLITE,
        maps.MapTypeId.HYBRID
      ],
    },
    zoomControl: true,
    clickableIcons: false
  };
}

export default function Map() {
  const locations = useLocations();
  const [mapRef, setMapRef] = useState();
  const [circle, setCircle] = useState();
  const [path, setPath] = useState();

  const {
    longitude = 0,
    latitude = 0,
    accuracy = 0
  } = locations[locations.length - 1] || {};

  console.log(locations);

  useEffect(() => {

    if (!mapRef) { 
      return;
    }
    // console.log('useEffect', latitude, longitude, accuracy, mapRef);
    // setCordinates(props.center);

    if (circle) {
      circle.setMap(null);
    }
    setCircle(new mapRef.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0,
      map: mapRef.map,
      center: new mapRef.maps.LatLng(latitude, longitude),
      radius: accuracy / 2,
    }));

    let color = '#FF0000';    

    let a = new mapRef.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 0,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: mapRef.map,
      center: new mapRef.maps.LatLng(latitude, longitude),
      radius: 0.2,
    });
    a.addListener("click", () => {
      // map.setZoom(8);
      // map.setCenter(marker.getPosition() as google.maps.LatLng);
      console.log(a);
      if (a.radius !== 1) {
        a.setRadius(1);
      } else {
        a.setRadius(25);
      }
      // a.strokeWeight = 1;
      // a.map();
    });

    if (path) {
      path.setMap(null)
    }
    setPath(new mapRef.maps.Polyline({
      path: locations.map((location) => ({ lat: location.latitude, lng: location.longitude })),
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: mapRef.map,
    }));

 }, [locations, mapRef])



const handleApiLoaded = (map, maps) => {
  setMapRef({ maps, map });
  // new maps.Circle({
  //   position: {
  //     lat: 51.0447,
  //     lng: 114.0719,
  //   },
  //   map,
  // });
  // console.log(map);
  // const circle = new maps.Circle(populationOptions);
  // map.fitBounds(circle.getBounds());

  // markers.forEach((marker, i) => {
  //   marker.addListener('click', () => {
  //     infowindows[i].open(map, marker);
  //   });
  // });
};

  const location = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 18
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <Stats text={`Accuracy: ${accuracy}`} />
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals={true}
        bootstrapURLKeys={{ key: 'AIzaSyCqQwEmEBphhmoUCb60lGCE0EX-YnRWB0k' }}
        defaultCenter={location.center}
        defaultZoom={location.zoom}
        center={[latitude, longitude]}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        // options={getMapOptions}
      >
        <Marker
          text={'location'}
          lat={latitude}
          lng={longitude}
        />
      </GoogleMapReact>
    </div>
  );

}
