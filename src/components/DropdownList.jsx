import React, { useState } from 'react';

const DropdownList = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <button
        onClick={toggleDropdown}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md mb-2 text-left"
      >
        {title} {isOpen ? '-' : '+'}
      </button>
      {isOpen && <div className="border rounded-md p-4">{content}</div>}
    </div>
  );
};

export default DropdownList;
