import { DUMMY_RECORDS } from "./dummy";
import {
  DashboardSummary,
  DataGridRequest,
  DataGridResponse,
  GradeChangeRecord,
} from "./model";

export async function loadDashboardSummary(): Promise<DashboardSummary> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    total_records: 125,
    initial_count: 30,
    pending_review_count: 45,
    approved_count: 50,
  };
}

export async function loadGradeRecords(
  payload: DataGridRequest
): Promise<DataGridResponse<GradeChangeRecord>> {
  console.log(payload);

  const { skip, limit, filter_by_list, sort_by_list } = payload;

  let filtered = [...DUMMY_RECORDS];

  // --- Apply Filters ---
  filter_by_list?.forEach((filter) => {
    if (filter.name && filter.type === "TEXT_IN" && filter.list_of_str_value) {
      filtered = filtered.filter((rec: any) =>
        filter.list_of_str_value!.includes(rec[filter.name])
      );
    } else if (
      filter.name &&
      filter.type === "TEXT_CONTAINS" &&
      filter.str_value
    ) {
      const search = filter.str_value.toLowerCase();
      filtered = filtered.filter((rec: any) =>
        String(rec[filter.name] || "")
          .toLowerCase()
          .includes(search)
      );
    }
  });

  // --- Apply Sorting ---
  sort_by_list?.forEach((sort) => {
    filtered.sort((a: any, b: any) => {
      const valA = a[sort.name];
      const valB = b[sort.name];
      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      return sort.is_asc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  });

  // --- Pagination ---
  const paginated = filtered.slice(skip, skip + limit);

  return {
    skip,
    limit,
    total: filtered.length,
    data: paginated,
  };
}
