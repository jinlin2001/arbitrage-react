import { String_Number, ModalState, ApiResponse } from './types';
import { API_NAME_INDEX, API_INDEX_NAME } from './api-currency';

async function fetchJSON(file: File): Promise<ModalState> {
  const file_text = await file.text();
  const file_json = JSON.parse(file_text);
  const index_name = Object.keys(file_json);
  const name_index: String_Number = {};
  let index = 0;
  for (const name of index_name) {
    name_index[name] = index++;
  }

  const matrix = index_name.map((base_currency, i) => {
    const row = new Array<number>(index_name.length).fill(Number.NaN);
    row[i] = 1;
    for (const foreign_currency in file_json[base_currency]) {
      const rate = +file_json[base_currency][foreign_currency];
      if (!isNaN(rate) && name_index[foreign_currency] !== undefined) {
        row[name_index[foreign_currency]] = rate;
      }
    }
    return row;
  });
  return {
    modal_matrix: matrix,
    index_name,
    name_index,
    file_name: file.name,
  };
}

async function fetchApi() {
  const api_url = `https://api.frankfurter.app/latest?from=`;
  const api_request: Promise<Response>[] = [];
  for (const currency_name of API_INDEX_NAME) {
    api_request.push(fetch(`${api_url}${currency_name}`));
  }
  const api_responses = await Promise.all(api_request);
  const matrix_promise = api_responses.map(async (response, i) => {
    const api_data: ApiResponse = await response.json();
    const row: number[] = [];
    row[i] = 1;
    for (const name in api_data.rates) {
      row[API_NAME_INDEX[name]] = api_data.rates[name];
    }
    return row;
  });
  const matrix = await Promise.all(matrix_promise);
  return matrix;
}

function filterData(filter_txt: string, currency_list: string[]) {
  const filter_txt_upper = filter_txt.trim().toUpperCase();
  const filtered_list = currency_list.filter((currency_name) => {
    return currency_name.includes(filter_txt_upper);
  });
  return filtered_list;
}

const VALID_CSS =
  'form-control w-auto p-0 rounded-0 text-center bg-transparent text-white';
const INVALID_CSS = `${VALID_CSS} is-invalid`;
const BTN_CSS =
  'btn btn-sm btn-outline-secondary shadow-none rounded-0 text-white text-nowrap';

export { fetchApi, fetchJSON, filterData, INVALID_CSS, VALID_CSS, BTN_CSS };
