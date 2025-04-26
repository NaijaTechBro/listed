import React from 'react';
import StartupForm from '../../components/startup/StartupForm';

const AddStartupWrapper: React.FC = () => {


  return (
    <div>
      <div className="mb-6">
        {/* <h1 className="text-2xl font-bold">{isEditing ? 'Edit Startup' : 'Add New Startup'}</h1>
        <p className="text-gray-600">
          {isEditing 
            ? 'Update your startup information on GetListed' 
            : 'List your startup on the African Startup Directory'}
        </p> */}
      </div>

      <StartupForm />

    </div>
  );
};

export default AddStartupWrapper;