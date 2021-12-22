import React from 'react';

import { RowProps } from '../types';
import { API_FULLNAME } from '../api-currency';
import { INVALID_CSS, VALID_CSS } from '../utility';

function TableRow({
  row,
  row_header,
  row_id,
  row_disabled,
  table_errors,
  rowEdit,
}: RowProps) {
  return (
    <tr>
      <th
        className='p-0 position-sticky start-0'
        title={API_FULLNAME[row_header]}>
        <small>{row_header}</small>
      </th>
      {row.map((col_value, i) => {
        const key = `${row_id}-${i}`;
        let css = VALID_CSS;
        if (isNaN(col_value) || col_value <= 0) {
          table_errors.current[key] = true;
          css = INVALID_CSS;
        }
        return (
          <td key={key} className='p-0'>
            <input
              className={css}
              type='number'
              data-row={row_id}
              data-col={i}
              defaultValue={`${col_value}`}
              disabled={row_disabled}
              onChange={rowEdit}
              style={{ fontSize: '.85rem' }}
            />
          </td>
        );
      })}
    </tr>
  );
}
export default TableRow;
