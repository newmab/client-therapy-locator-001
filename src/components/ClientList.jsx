import React from 'react';

const ClientList = ({ clients }) => {
  return (
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th className="border-b-2 p-2">Client Name</th>
          <th className="border-b-2 p-2">Address</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client, index) => (
          <tr key={index}>
            <td className="border-b p-2">{client.name}</td>
            <td className="border-b p-2">{client.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientList;
