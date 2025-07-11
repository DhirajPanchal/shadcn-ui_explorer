export interface GradeChangeRecord {
  id?: number | null;
  grade_region?: string | null;
  grade_site?: string | null;
  grade_industry?: string | null;
  grade_method?: string | null;
  grade_customer_id?: string | null;
  grade_customer_name?: string | null;
  grade_gedu_legal_name?: string | null;
  grade_gedu_global_id?: string | null;
  grade_default_date?: string | null;
  grade_initial_default_date?: string | null;
  grade_resolution_date?: string | null;
  grade_grp_default_reason_desc?: string | null;
  grade_grp_resolution_status_desc?: string | null;
  grade_default_effective_from_date?: string | null;
  grade_default_effective_to_date?: string | null;
  new_initial_default_date?: string | null;
  new_resolution_date?: string | null;
  new_grp_default_reason_desc?: string | null;
  new_grp_resolution_status_desc?: string | null;
  viewer_name?: string | null;
  viewer_comments?: string | null;
  viewer_modification_date?: string | null;
  reviewer_name?: string | null;
  reviewer_comments?: string | null;
  reviewer_modification_date?: string | null;
  approver_name?: string | null;
  approver_comments?: string | null;
  approver_modification_date?: string | null;
  action?: string | null;
  status?: string | null;
  creation_date?: string | null;
  creation_user?: string | null;
  last_modification_date?: string | null;
  last_modification_user?: string | null;

  field1?: string;
  field2?: string;
  field3?: string;
  field4?: string;
  field5?: string;

  field6?: string;
  field7?: string;
  field8?: string;
  field9?: string;
  field10?: string;
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends unknown, TValue> {
    label?: string;
    type?: "text" | "enum" | "date" | "number";
    enumValues?: string[];
  }
}

export interface DashboardSummary {
  total_records: number;
  initial_count: number;
  pending_review_count: number;
  approved_count: number;
}

export interface FilterBy {
  name: string;
  type: string;
  list_of_str_value?: string[];
  list_of_date_value?: string[];
  str_value?: string;
  date_value?: string;
}

export interface SortBy {
  name: string;
  is_asc: boolean;
}

export interface DataGridRequest {
  skip: number;
  limit: number;
  filter_by_list: FilterBy[];
  sort_by_list: SortBy[];
}

export interface DataGridResponse<T> {
  skip: number;
  limit: number;
  total: number;
  data: T[];
}

export const VIEWER_GRID_DAFAULT_PAYLOAD: DataGridRequest = {
  skip: 0,
  limit: 20,
  filter_by_list: [],
  sort_by_list: [],
};

export const REVIEWER_GRID_DAFAULT_PAYLOAD: DataGridRequest = {
  skip: 0,
  limit: 10,
  filter_by_list: [
    {
      name: "status",
      type: "TEXT_IN",
      list_of_str_value: ["INITIAL", "PENDING_REVIEW"],
    },
  ],
  sort_by_list: [
    {
      name: "status",
      is_asc: false,
    },
    {
      name: "last_modification_date",
      is_asc: false,
    },
  ],
};

export const APPROVER_GRID_DAFAULT_PAYLOAD: DataGridRequest = {
  skip: 0,
  limit: 10,
  filter_by_list: [
    {
      name: "status",
      type: "TEXT_IN",
      list_of_str_value: ["PENDING_APPROVAL"],
    },
  ],
  sort_by_list: [],
};

export const ADMIN_GRID_DAFAULT_PAYLOAD: DataGridRequest = {
  skip: 0,
  limit: 10,
  filter_by_list: [],
  sort_by_list: [],
};

export const GRID_DAFAULT_DATA: DataGridResponse<GradeChangeRecord> = {
  skip: 0,
  limit: 5,
  total: 0,
  data: [],
};

//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//

export interface InputState {
  skip?: number;
  limit?: number;
  filters?: FilterBy[];
  sorts?: SortBy[];
  globalSearchText?: string;
  globalSearchDate?: string;
  includeHistory?: boolean;
}

export interface OutputState<T> {
  skip?: number;
  limit?: number;
  total?: number;
  data?: T[];
}

export const DEFAULT_INPUT_STATE: InputState = {
  skip: 0,
  limit: 10,
  filters: [],
  sorts: [],
  globalSearchText: "",
  globalSearchDate: "",
  includeHistory: true,
};

export const DEFAULT_OUTPUT_STATE: OutputState<GradeChangeRecord> = {
  skip: 0,
  limit: 10,
  total: 15,
  data: [],
};

export interface LogItem {
  change_record_id: number;
  action: string;
  user_role: string;
  comments?: string;
  creation_date?: string;
  changes?: LogItemChange[];
}

export interface LogItemChange {
  field_name?: string;
  new_value?: string;
  old_value?: string;
}
