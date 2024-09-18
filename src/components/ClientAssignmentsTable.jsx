import React from 'react';

const ClientAssignmentsTable = ({ assignments }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Client</th>
          <th className="px-4 py-2">Assigned Center</th>
          <th className="px-4 py-2">Distance (miles)</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((assignment, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{assignment.client}</td>
            <td className="border px-4 py-2">{assignment.center}</td>
            <td className="border px-4 py-2">{assignment.distance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientAssignmentsTable;
