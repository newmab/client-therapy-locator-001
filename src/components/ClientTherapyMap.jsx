import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ClientTherapyMap = ({ clients, centers }) => {
  const [isClientListVisible, setIsClientListVisible] = useState(true);

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
      map.remove(); // Clean up on component unmount
    };
  }, [clients, centers]);

  const toggleClientList = () => {
    setIsClientListVisible(!isClientListVisible);
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

      {/* Toggle button to show/hide client list */}
      <button
        onClick={toggleClientList}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
      >
        {isClientListVisible ? 'Hide Client List' : 'Show Client List'}
      </button>

      {/* Conditionally render the client list */}
      {isClientListVisible && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Client List</h2>
          <ul>
            {clients.map((client, index) => (
              <li key={index}>
                {client.name} - {client.address}
              </li>
            ))}
          </ul>
        </div>
      )}

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
