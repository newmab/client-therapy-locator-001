import React, { useState } from 'react';

const ClientInputForm = ({ onAddClient }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address) {
      onAddClient(address);
      setAddress('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Enter client address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-2">
        Add Client
      </button>
    </form>
  );
};

export default ClientInputForm;
