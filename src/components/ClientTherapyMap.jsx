import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ClientTherapyMap = ({ clients, centers, assignments, showLines, selectedCenter }) => {
  useEffect(() => {
    const map = L.map('map', {
      center: [36.7783, -119.4179], // Center the map on California
      zoom: 7, // Set the initial zoom level
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

    // Draw lines if showLines is true and the center is selected
    if (showLines) {
      assignments.forEach((assignment) => {
        if (
          selectedCenter === 'All' || // Show all lines if 'All' is selected
          assignment.center === selectedCenter // Show lines only for the selected center
        ) {
          if (assignment.centerCoords && assignment.clientCoords) {
            L.polyline(
              [
                [assignment.clientCoords.lat, assignment.clientCoords.lng],
                [assignment.centerCoords.lat, assignment.centerCoords.lng],
              ],
              { color: 'black', weight: 1 } // Thin black lines
            ).addTo(map);
          }
        }
      });
    }

    // Handle resizing the map
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      map.remove();
    };
  }, [clients, centers, assignments, showLines, selectedCenter]);

  return (
    <div
      id="map"
      style={{
        height: '500px',
        width: '100%',
      }}
    />
  );
};

export default ClientTherapyMap;
