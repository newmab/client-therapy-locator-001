import React, { useState } from 'react';

const ClientAssignmentsTable = ({ assignments }) => {
  const [filterCenter, setFilterCenter] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  // Filter the assignments based on the selected center
  const filteredAssignments = assignments.filter(assignment =>
    filterCenter === 'All' || assignment.center === filterCenter
  );

  // Sort the filtered assignments by distance
  const sortedAssignments = filteredAssignments.sort((a, b) => {
    if (sortOrder === 'asc') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    }
    return parseFloat(b.distance) - parseFloat(a.distance);
  });

  return (
    <div>
      <div className="flex justify-between mb-4">
        {/* Dropdown to filter by center */}
        <select
          value={filterCenter}
          onChange={(e) => setFilterCenter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="All">All Centers</option>
          {/* Dynamically generate unique center options from assignments */}
          {Array.from(new Set(assignments.map((assignment) => assignment.center))).map((center) => (
            <option key={center} value={center}>
              {center}
            </option>
          ))}
        </select>

        {/* Button to toggle sorting */}
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="ml-4 border p-2 rounded-md bg-blue-500 text-white"
        >
          Sort by Distance ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>

      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-2">Client</th>
            <th className="border-b-2 p-2">Assigned Center</th>
            <th className="border-b-2 p-2">Distance (miles)</th>
          </tr>
        </thead>
        <tbody>
          {sortedAssignments.map((assignment, index) => (
            <tr key={index}>
              <td className="border-b p-2">{assignment.client}</td>
              <td className="border-b p-2">{assignment.center}</td>
              <td className="border-b p-2">{assignment.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientAssignmentsTable;
