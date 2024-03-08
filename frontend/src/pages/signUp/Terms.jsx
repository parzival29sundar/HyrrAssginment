import React from 'react';

const Terms = ({ onCheckboxChange }) => {
  return (
    <div className='form-control flex flex-row'>
      <label className='label gap-2 cursor-pointer' style={{display: 'flex', alignItems: 'center'}}>
        <input
          type="checkbox"
          className='checkbox checkbox-accent checkbox-sm'
          onChange={onCheckboxChange}
        />
        <span className='label-text'>Do you agree with the Terms and Condition?</span>
      </label>
    </div>
  );
};

export default Terms;
