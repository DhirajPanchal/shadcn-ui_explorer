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
}

export interface DataGridRequest {
  skip: number;
  limit: number;
  filter_by_list: [];
  sort_by_list: [];
}

export interface DataGridResponse<T> {
  skip: number;
  limit: number;
  total: number;
  data: T[];
}

export const VIEWER_GRID_DAFAULT_PAYLOAD: DataGridRequest = {
  skip: 0,
  limit: 5,
  filter_by_list: [],
  sort_by_list: [],
};

export const GRID_DAFAULT_DATA: DataGridResponse<GradeChangeRecord> = {
  skip: 0,
  limit: 5,
  total: 0,
  data: [],
};
