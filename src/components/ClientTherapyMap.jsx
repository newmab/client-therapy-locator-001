import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ClientTherapyMap = ({ clients, centers, assignments }) => {
  const [showLines, setShowLines] = useState(false); // State to toggle lines visibility

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

    // Draw lines between clients and their assigned therapy centers
    if (showLines && assignments.length > 0) {
      assignments.forEach((assignment) => {
        const client = clients.find(c => c.name === assignment.client);
        const center = centers.find(c => c.name === assignment.center);
        if (client && center) {
          L.polyline([
            [client.coords.lat, client.coords.lng],
            [center.coords.lat, center.coords.lng],
          ], { color: 'blue' }).addTo(map);
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
  }, [clients, centers, showLines, assignments]);

  const toggleShowLines = () => {
    setShowLines(!showLines);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Therapy Centers</h1>
      <ul>
        {centers.map((center, index) => (
          <li key={index}>
            <strong>{center.name}</strong> - {center.address}
          </li>
        ))}
      </ul>

      {/* Toggle button for showing lines */}
      <button
        onClick={toggleShowLines}
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-700"
      >
        {showLines ? 'Hide Lines' : 'Show Lines'}
      </button>

      {/* Map Container */}
      <div
        id="map"
        style={{
          height: '600px', // Explicit height
          width: '100%',
        }}
      />
    </div>
  );
};

export default ClientTherapyMap;
