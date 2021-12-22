import { Modal } from 'bootstrap';
import { ChangeEvent } from 'react';

export interface String_HTMLInput {
  [k: string]: HTMLInputElement;
}
export interface String_Number {
  [k: string]: number;
}
export interface String_String {
  [k: string]: string;
}
export interface String_Boolean {
  [k: string]: boolean;
}
export interface String_Numbers {
  [k: string]: number[];
}
export interface ApiResponse {
  base: string;
  date: string;
  amount: number;
  rates: String_Number;
}
export interface ModalState {
  modal_matrix: number[][];
  file_name: string;
  index_name: string[];
  name_index: String_Number;
}
export interface ModalProps {
  props: ModalState;
}
export interface TableProps {
  matrix: number[][];
  index_name: string[];
  name_index: String_Number;
}
export interface DisplayModalRef {
  modal: Modal;
}
export interface RowProps {
  row: number[];
  row_header: string;
  row_id: number;
  row_disabled: boolean;
  table_errors: React.MutableRefObject<String_Boolean>;
  rowEdit: (e: ChangeEvent<HTMLInputElement>) => void;
}
