import React, { useState, useEffect } from 'react';
import ClientInputForm from './components/ClientInputForm';
import ClientImportForm from './components/ClientImportForm';
import ClientList from './components/ClientList';
import TherapyCenterList from './components/TherapyCenterList';
import ClientTherapyMap from './components/ClientTherapyMap';
import ClientAssignmentsTable from './components/ClientAssignmentsTable';
import { calculateDistance } from './utils/calculateDistance';
import { geocodeAddress } from './utils/geocodeAddress';

const App = () => {
  const [therapyCenters] = useState([
    {
      name: 'Fresno Center',
      address: '1586 W Shaw Ave, Fresno, CA',
      coords: { lat: 36.8083, lng: -119.8519 },
    },
    {
      name: 'Merced Center',
      address: '2848 Park Ave, Merced, CA',
      coords: { lat: 37.3022, lng: -120.4826 },
    },
    {
      name: 'Clovis Center',
      address: '3134 Willow Ave, Clovis, CA',
      coords: { lat: 36.8252, lng: -119.7031 },
    },
    {
      name: 'Visalia Center',
      address: '316 S Dunworth, Visalia, CA',
      coords: { lat: 36.3302, lng: -119.2921 },
    },
  ]);

  const [clients, setClients] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const handleAddClient = async (address) => {
    try {
      const addressMatchesCenter = therapyCenters.some(
        (center) => center.address === address
      );

      if (addressMatchesCenter) {
        console.log(`Skipping client. Address ${address} matches a therapy center.`);
        return;
      }

      const clientCoords = await geocodeAddress(address);
      const newClient = { name: `Client ${clients.length + 1}`, address, coords: clientCoords };
      setClients([...clients, newClient]);
      console.log('Client added:', newClient);
    } catch (error) {
      console.error('Error adding client:', error.message);
    }
  };

  const handleAddClientsFromExcel = async (clientsData) => {
    for (const row of clientsData) {
      const fullAddress = `${row.Address}, ${row.City}, ${row.State}`;

      const addressMatchesCenter = therapyCenters.some(
        (center) => center.address === fullAddress
      );

      if (addressMatchesCenter) {
        console.log(`Skipping client from Excel. Address ${fullAddress} matches a therapy center.`);
        continue;
      }

      try {
        console.log(`Geocoding Excel row address: ${fullAddress}`);
        const coords = await geocodeAddress(fullAddress);
        const newClient = {
          name: row.Client,
          address: fullAddress,
          coords: coords,
        };

        setClients((prevClients) => [...prevClients, newClient]);
        console.log('Excel client added:', newClient);

      } catch (error) {
        console.error(`Error processing row: ${JSON.stringify(row)} - ${error.message}`);
      }
    }
  };

  const assignClientsToCenters = () => {
    const newAssignments = clients.map((client) => {
      let closestCenter = null;
      let closestDistance = Infinity;

      therapyCenters.forEach((center) => {
        const distance = calculateDistance(
          client.coords.lat,
          client.coords.lng,
          center.coords.lat,
          center.coords.lng
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestCenter = center;
        }
      });

      return {
        client: client.name,
        center: closestCenter ? closestCenter.name : 'No center available',
        distance: closestDistance !== Infinity ? closestDistance.toFixed(2) : 'N/A',
      };
    });

    setAssignments(newAssignments);
  };

  useEffect(() => {
    if (clients.length > 0 && therapyCenters.length > 0) {
      assignClientsToCenters();
    }
  }, [clients, therapyCenters]);

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Client and Therapy Center Proximity</h1>
      
      {/* Client Input and Import Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <ClientInputForm onAddClient={handleAddClient} />
          <ClientImportForm onAddClients={handleAddClientsFromExcel} />
          <ClientList clients={clients} />
        </div>
        <div>
          <TherapyCenterList centers={therapyCenters} />
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Map View</h2>
        <div
          className="map-container"
          style={{
            height: '500px',
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            background: '#f0f0f0',
          }}
        >
          <ClientTherapyMap clients={clients} centers={therapyCenters} />
        </div>
      </div>

      {/* Client Assignments Table */}
      {assignments.length > 0 && (
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Client Assignments</h2>
          <ClientAssignmentsTable assignments={assignments} />
        </div>
      )}
    </div>
  );
};

export default App;
