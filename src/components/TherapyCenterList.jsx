import React from 'react';

const TherapyCenterList = ({ centers }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Therapy Centers</h2>
      <ul>
        {centers.map((center, index) => (
          <li key={index}>
            {center.name} - {center.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TherapyCenterList;
