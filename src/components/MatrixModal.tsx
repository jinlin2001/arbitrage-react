import React, { forwardRef } from 'react';

import { ModalProps } from '../types';
import Table from './Table';

const MatrixModal = forwardRef<HTMLDivElement, ModalProps>(({ props }, ref) => {
  return (
    <div ref={ref} className='modal' data-bs-backdrop='static' tabIndex={-1}>
      <div className='modal-dialog modal-fullscreen'>
        <div className='modal-content bg-dark'>
          <div className='modal-header p-2'>
            <span className='badge'>{`File: ${props.file_name}`}</span>
            <button
              type='button'
              className='btn-close btn-close-white shadow-none'
              data-bs-dismiss='modal'></button>
          </div>

          <div className='modal-body p-0'>
            <Table
              matrix={props.modal_matrix}
              index_name={props.index_name}
              name_index={props.name_index}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
export default MatrixModal;
