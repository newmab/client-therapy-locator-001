import React from 'react';

const TherapyCenterList = ({ centers }) => {
  return (
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th className="border-b-2 p-2">Center Name</th>
          <th className="border-b-2 p-2">Address</th>
        </tr>
      </thead>
      <tbody>
        {centers.map((center, index) => (
          <tr key={index}>
            <td className="border-b p-2">{center.name}</td>
            <td className="border-b p-2">{center.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TherapyCenterList;
