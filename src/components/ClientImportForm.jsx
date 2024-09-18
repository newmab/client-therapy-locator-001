import React from 'react';
import * as XLSX from 'xlsx';

const ClientImportForm = ({ onAddClients }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      onAddClients(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="mb-4">
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default ClientImportForm;
