export interface IOpenCellRequestData {
  rent_request: string;
  lat: number;
  lon: number;
}

export interface IOpenCellResponseData {
  message: string;
}

export interface ICellStatusServerResponse {
  open: boolean;
  start_cell_info: boolean;
  end_cell_info: boolean;
}

export interface ICellStatus {
  isOpen: boolean;
  isCellWasOpenedAtStart: boolean;
  isCellWasOpenedAtEnd: boolean;
}
