import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';

import { API_NAME_INDEX, API_INDEX_NAME } from '../api-currency';
import { ModalState } from '../types';
import { BTN_CSS, fetchApi, fetchJSON } from '../utility';
import { showToast } from '../toast';
import { hideSpinner, showSpinner } from '../spinner';
import Table from './Table';
import MatrixModal from './MatrixModal';
import TablePlaceholder from './TablePlaceholder';

declare var bootstrap: any;
function App() {
  const [modal_props, setModalProps] = useState<ModalState | null>(null);
  const [api_matrix, setApiMatrix] = useState<number[][] | null>(null);
  const file_input = useRef<HTMLInputElement>(null);
  const modal = useRef<Modal | null>(null);
  const modal_key = useRef<number>(0);
  const modal_div = useRef<HTMLDivElement>(null);

  const showModal = () => {
    try {
      modal.current?.show();
    } catch (error: any) {
      showToast(error.message);
    }
  };

  const fileInputHandler = async () => {
    try {
      showSpinner();
      const modal_data = await fetchJSON(file_input.current!.files![0]);
      modal_key.current++;
      setModalProps(modal_data);
      hideSpinner();
    } catch (error: any) {
      hideSpinner();
      showToast(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        showSpinner();
        const matrix = await fetchApi();
        setApiMatrix(matrix);
        hideSpinner();
      } catch (error: any) {
        hideSpinner();
        showToast(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (modal_props) {
      modal.current = new bootstrap.Modal(modal_div.current);
    }
    return () => {
      modal.current?.dispose();
    };
  }, [modal_props]);

  return (
    <>
      <div className='card vh-100 rounded-0 border-0 bg-transparent'>
        <div className='card-header d-flex p-0 border-0'>
          <div className='d-flex align-items-center'>
            <input
              type='file'
              className='d-none'
              id='import-file'
              accept='.txt,.json'
              ref={file_input}
              onChange={fileInputHandler}
            />
            <label htmlFor='import-file' className={BTN_CSS}>
              Import File
            </label>
          </div>

          {modal_props ? (
            <div className='d-flex align-items-center flex-fill overflow-auto'>
              <button className={BTN_CSS} onClick={showModal}>
                View Data
              </button>
              <span
                className='text-truncate badge'
                title={modal_props.file_name}>
                {modal_props.file_name}
              </span>
            </div>
          ) : null}
        </div>

        <div className='card-body p-0 overflow-auto'>
          {api_matrix ? (
            <Table
              matrix={api_matrix}
              index_name={API_INDEX_NAME}
              name_index={API_NAME_INDEX}
            />
          ) : (
            <TablePlaceholder />
          )}
        </div>
      </div>

      {modal_props ? (
        <MatrixModal
          key={modal_key.current}
          ref={modal_div}
          props={modal_props}
        />
      ) : null}
    </>
  );
}
export default App;
