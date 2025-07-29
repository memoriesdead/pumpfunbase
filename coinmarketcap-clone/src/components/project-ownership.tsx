import React from 'react';

const ProjectOwnership = () => {
  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
      <h3 className="text-xl font-bold text-[#1E1E1E] mb-4">Do you own this project?</h3>
      <div className="space-y-4">
        <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
          Update Token Info
        </button>
        <button className="w-full bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
          Submit Token Unlocks
        </button>
      </div>
    </div>
  );
};

export default ProjectOwnership;
