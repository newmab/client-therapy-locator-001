import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ClientTherapyMap = ({ clients, centers }) => {
  useEffect(() => {
    const map = L.map('map', {
      center: [36.8083, -119.8519], // Center the map on Fresno
      zoom: 10,                     // Set the initial zoom level
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add therapy centers (red markers)
    centers.forEach((center) => {
      L.marker([center.coords.lat, center.coords.lng], {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color:#ff0000;width:12px;height:12px;border-radius:50%;"></div>`,
        }),
      })
        .addTo(map)
        .bindPopup(`${center.name}`);
    });

    // Add clients (blue markers)
    clients.forEach((client) => {
      if (client.coords) {
        L.marker([client.coords.lat, client.coords.lng], {
          icon: L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color:#0000ff;width:12px;height:12px;border-radius:50%;"></div>`,
          }),
        })
          .addTo(map)
          .bindPopup(`${client.name}`);
      }
    });

    // Handle resizing the map
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      map.remove();
    };
  }, [clients, centers]);

  return (
    <div
      id="map"
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  );
};

export default ClientTherapyMap;
