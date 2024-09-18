import React from 'react';

const ClientList = ({ clients }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Client List</h2>
      <ul>
        {clients.map((client, index) => (
          <li key={index}>
            {client.name} - {client.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
