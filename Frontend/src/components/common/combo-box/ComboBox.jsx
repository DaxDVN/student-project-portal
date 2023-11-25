import React from 'react';

const ComboBox = ({ name, selection, value, onChange }) => {
  return (
    <div>
      <select className='select mr-2 filter--combo-box' value={value} onChange={onChange}>
        <option>{name}</option>
        {selection.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBox;
