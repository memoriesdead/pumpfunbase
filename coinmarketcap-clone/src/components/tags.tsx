import React from 'react';

const Tags = () => {
  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
      <h3 className="text-xl font-bold text-[#1E1E1E] mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">YZI Labs Portfolio</span>
        <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Bitcoin Ecosystem</span>
        <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Layer 1</span>
        <button className="text-blue-500 text-xs font-medium">Show all</button>
      </div>
    </div>
  );
};

export default Tags;
