import React from 'react';

function TablePlaceholder() {
  return (
    <div className='card h-100 rounded-0 border-0 bg-transparent text-white'>
      <div className='card-header p-0 border-0 mb-2'>
        <div className='row g-0 placeholder-glow'>
          <div className='col-2 text-center'>
            <img
              src='currency-logo.png'
              alt='currency icon'
              className='w-100 rounded'
              style={{ height: '2rem', objectFit: 'contain' }}
            />
          </div>
          <div className='placeholder col-8 offset-1'></div>
        </div>
      </div>
      <div className='card-body p-0'>
        <div className='placeholder-glow h-100 w-100'>
          <div className='placeholder h-100 w-100'></div>
        </div>
      </div>
    </div>
  );
}
export default TablePlaceholder;
