import React, { ChangeEvent, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { String_Boolean, TableProps } from '../types';
import { hideSpinner, showSpinner } from '../spinner';
import { showToast } from '../toast';
import { bellmanFord, getProfit, toLog } from '../solve';
import { BTN_CSS, filterData } from '../utility';
import { API_FULLNAME } from '../api-currency';
import TableRow from './TableRow';

function Table({ matrix, index_name, name_index }: TableProps) {
  const [filtered_currency, setFilteredCurrency] =
    useState<string[]>(index_name);
  const [editable, setEditable] = useState<boolean>(false);
  const input_control = useRef<HTMLInputElement>(null);
  const table_errors = useRef<String_Boolean>({});
  const arbitrage_btn = useRef<HTMLButtonElement>(null);
  const log_matrix = useRef<number[][] | null>(null);

  const checkError = () => {
    const error_keys = Object.keys(table_errors.current);
    if (error_keys.length > 0) {
      const [row, col] = error_keys[0].split('-');
      throw new Error(
        `Row: ${index_name[+row]}, Column: ${index_name[+col]} invalid.`
      );
    }
  };

  const editBtnHandler = () => {
    try {
      setEditable(true);
    } catch (error: any) {
      showToast(error.message);
    }
  };

  const saveBtnHandler = () => {
    try {
      checkError();
      setEditable(false);
    } catch (error: any) {
      showToast(error.message);
    }
  };

  const arbitrageBtnHandler = () => {
    try {
      showSpinner();
      checkError();
      if (log_matrix.current === null) {
        log_matrix.current = toLog(matrix);
      }
      const results = bellmanFord(log_matrix.current, index_name);
      const results_strings = Object.keys(results).map((key) => {
        const profit_percentage = getProfit(results[key], matrix);
        return `${key} ${profit_percentage}% profit!`;
      });
      hideSpinner();
      if (results_strings.length > 0) {
        for (const result_string of results_strings) {
          showToast(result_string, false);
        }
      } else {
        showToast('No arbitrage oppportunity detected.');
      }
    } catch (error: any) {
      hideSpinner();
      showToast(error.message);
    }
  };

  const editInputHandler = debounce((e: ChangeEvent<HTMLInputElement>) => {
    try {
      const element = e.target;
      const row = +element.dataset.row!;
      const col = +element.dataset.col!;
      const key = `${row}-${col}`;
      const element_value = element.value.trim();
      if (element_value === '') {
        table_errors.current[key] = true;
        element.classList.toggle('is-invalid', true);
        return;
      }
      const element_num_value = +element_value;
      if (element_num_value <= 0) {
        table_errors.current[key] = true;
        element.classList.toggle('is-invalid', true);
        throw new Error('Rate cannot less than 0.');
      }
      matrix[row][col] = element_num_value;
      if (log_matrix.current) {
        log_matrix.current[row][col] = -Math.log(element_num_value);
      }
      if (key in table_errors.current) {
        delete table_errors.current[key];
        element.classList.toggle('is-invalid', false);
      }
    } catch (error: any) {
      showToast(error.message);
    }
  }, 500);

  const filterInputHandler = debounce(() => {
    try {
      showSpinner();
      setFilteredCurrency(filterData(input_control.current!.value, index_name));
      hideSpinner();
    } catch (error: any) {
      hideSpinner();
      showToast(error.message);
    }
  }, 500);

  return (
    <div className='card h-100 border-0 rounded-0 bg-transparent'>
      <div className='card-header d-flex p-0 border-0'>
        <div className='row g-0 flex-fill align-items-center'>
          <div className='d-none d-md-block col-md-2'>
            <img
              src='currency-logo.png'
              alt='currency icon'
              className='w-100 rounded'
              style={{ height: '2rem', objectFit: 'contain' }}
            />
          </div>
          <div className='col-12 col-md-10'>
            <input
              type='search'
              className='form-control shadow-none rounded-0'
              placeholder='filter table...'
              onInput={filterInputHandler}
              ref={input_control}
            />
          </div>
        </div>
        {editable ? (
          <button className={BTN_CSS} onClick={saveBtnHandler}>
            Save
          </button>
        ) : (
          <button className={BTN_CSS} onClick={editBtnHandler}>
            Edit Table
          </button>
        )}
        <button
          className={BTN_CSS}
          onClick={arbitrageBtnHandler}
          disabled={editable}
          ref={arbitrage_btn}>
          Run <img src='currency-exchange.svg' alt='exchange' />
        </button>
      </div>

      <div className='card-body p-0 overflow-auto'>
        <table className='table table-dark table-borderless m-0 text-warning text-center'>
          <thead>
            <tr>
              <th
                className='p-0 position-sticky start-0 top-0 text-white'
                style={{ zIndex: 10 }}>
                <small>
                  From<sub>{String.fromCharCode(8595)}</sub>To
                  <sup>{String.fromCharCode(8594)}</sup>
                </small>
              </th>
              {index_name.map((name) => {
                return (
                  <th
                    className='p-0 position-sticky top-0'
                    key={name}
                    title={API_FULLNAME[name]}
                    style={{ minWidth: '4rem' }}>
                    <small>{name}</small>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filtered_currency.map((name) => {
              return (
                <TableRow
                  row={matrix[name_index[name]]}
                  row_header={name}
                  row_id={name_index[name]}
                  row_disabled={!editable}
                  rowEdit={editInputHandler}
                  table_errors={table_errors}
                  key={`${name}-${name_index[name]}`}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Table;
