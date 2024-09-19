import React, { useState, useEffect } from 'react';
import ClientImportForm from './components/ClientImportForm';
import ClientList from './components/ClientList';
import TherapyCenterList from './components/TherapyCenterList';
import ClientTherapyMap from './components/ClientTherapyMap';
import ClientAssignmentsTable from './components/ClientAssignmentsTable';
import DropdownList from './components/DropdownList'; // For collapsible list
import { calculateDistance } from './utils/calculateDistance';
import { geocodeAddress } from './utils/geocodeAddress';
import './input.css';

const App = () => {
  const [therapyCenters] = useState([
    {
      name: 'Fresno Center',
      address: '1586 W Shaw Ave, Fresno, CA',
      coords: { lat: 36.8083, lng: -119.8519 }
    },
    {
      name: 'Merced Center',
      address: '2848 Park Ave, Merced, CA',
      coords: { lat: 37.3022, lng: -120.4826 }
    },
    {
      name: 'Clovis Center',
      address: '3134 Willow Ave, Clovis, CA',
      coords: { lat: 36.8252, lng: -119.7031 }
    },
    {
      name: 'Visalia Center',
      address: '316 S Dunworth, Visalia, CA',
      coords: { lat: 36.3302, lng: -119.2921 }
    }
  ]);

  const [clients, setClients] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [showLines, setShowLines] = useState(false); // New state for line visibility
  const [selectedCenter, setSelectedCenter] = useState('All'); // Track selected center

  const handleAddClientsFromExcel = async (clientsData) => {
    for (const row of clientsData) {
      const fullAddress = `${row.Address}, ${row.City}, ${row.State}`;

      const addressMatchesCenter = therapyCenters.some(center => center.address === fullAddress);

      if (addressMatchesCenter) {
        console.log(`Skipping client from Excel. Address ${fullAddress} matches a therapy center.`);
        continue;
      }

      try {
        const coords = await geocodeAddress(fullAddress);
        const newClient = {
          name: row.Client,
          address: fullAddress,
          coords: coords,
        };

        setClients((prevClients) => [...prevClients, newClient]);

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
        const distance = calculateDistance(client.coords.lat, client.coords.lng, center.coords.lat, center.coords.lng);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestCenter = center;
        }
      });

      return {
        client: client.name,
        center: closestCenter ? closestCenter.name : 'No center available',
        distance: closestDistance !== Infinity ? closestDistance.toFixed(2) : 'N/A',
        clientCoords: client.coords, // Store client coordinates
        centerCoords: closestCenter ? closestCenter.coords : null // Store center coordinates
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
      <ClientImportForm onAddClients={handleAddClientsFromExcel} />

      {/* Show Lines Toggle Button */}
      <div className="text-center mb-4">
        <button
          onClick={() => setShowLines(!showLines)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
        >
          {showLines ? 'Hide Lines' : 'Show Lines'}
        </button>
      </div>

      <div className="mt-8 rounded-lg shadow-lg">
        <ClientTherapyMap
          clients={clients}
          centers={therapyCenters}
          assignments={assignments}
          showLines={showLines} // Pass the toggle state for lines
          selectedCenter={selectedCenter} // Pass selected center to map
        />
      </div>
      
      {assignments.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-md">
          <div>
            <h2 className="text-2xl font-bold mb-4">Client Assignments</h2>
            <ClientAssignmentsTable
              assignments={assignments}
              onFilterCenterChange={setSelectedCenter} // Get selected center from dropdown
            />
          </div>
          <div className="w-full">
            <DropdownList title="Clients" content={<ClientList clients={clients} />} />
            <DropdownList title="Therapy Centers" content={<TherapyCenterList centers={therapyCenters} />} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
