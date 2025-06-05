export interface DataGridRequest {
  index: number;
  size: number;
  filter: [];
  sort: [];
}

export interface DataGridResponse<T> {
  index: number;
  size: number;
  total: number;
  data: T[];
}
