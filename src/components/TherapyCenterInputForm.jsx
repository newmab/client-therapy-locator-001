// src/components/TherapyCenterInputForm.jsx
import React, { useState } from 'react';

const TherapyCenterInputForm = ({ onAddCenter }) => {
  const [centerAddress, setCenterAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (centerAddress.trim()) {
      setLoading(true);
      setError('');
      try {
        await onAddCenter(centerAddress);
        setCenterAddress('');
      } catch (err) {
        setError('Failed to add therapy center. Please check the address and try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="center-address">
          Therapy Center Address
        </label>
        <input
          id="center-address"
          type="text"
          value={centerAddress}
          onChange={(e) => setCenterAddress(e.target.value)}
          placeholder="Enter therapy center address"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          disabled={loading}
          autoComplete="off" // Remove autocomplete
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Therapy Center'}
        </button>
      </div>
    </form>
  );
};

export default TherapyCenterInputForm;
