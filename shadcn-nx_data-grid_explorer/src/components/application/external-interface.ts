import { DUMMY_RECORDS } from "./dummy";
import {
  DashboardSummary,
  DataGridRequest,
  DataGridResponse,
  GradeChangeRecord,
  InputState,
} from "./model";

export async function loadDashboardSummary(): Promise<DashboardSummary> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    total_records: 125,
    initial_count: 30,
    pending_review_count: 45,
    approved_count: 50,
  };
}



export function recordListingAPI(inputState: InputState): GradeChangeRecord[] {
  const { skip = 0, limit = 10 } = inputState;

  // Total simulated data size (all records before pagination)
  const fullData: GradeChangeRecord[] = [...DUMMY_RECORDS];

  // Apply slicing (pagination)
  const paginatedData = fullData.slice(skip, skip + limit);

  return paginatedData;
}

export function XrecordListingAPI(
  payload: DataGridRequest
): GradeChangeRecord[] {
  //console.log("LISTING --------------------");

  //console.log(payload);

  let result = [...DUMMY_RECORDS];

  // Apply filters
  payload.filter_by_list?.forEach((filter) => {
    const { name, type } = filter;

    result = result.filter((record) => {
      const fieldValue = record[name as keyof GradeChangeRecord];

      if (type === "TEXT_LIKE") {
        const val = (filter.str_value ?? "").toLowerCase();
        return (fieldValue as string)?.toLowerCase().includes(val);
      }

      if (type === "DATE_GE") {
        const dateVal = filter.date_value ?? "";
        return new Date(fieldValue as string) >= new Date(dateVal);
      }

      if (type === "DATE_LE") {
        const dateVal = filter.date_value ?? "";
        return new Date(fieldValue as string) <= new Date(dateVal);
      }

      return true;
    });
  });

  // Apply sorts
  payload.sort_by_list?.forEach((sort) => {
    const { name, is_asc } = sort;

    result.sort((a, b) => {
      const valA = a[name as keyof GradeChangeRecord];
      const valB = b[name as keyof GradeChangeRecord];

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (valA > valB) return is_asc ? 1 : -1;
      if (valA < valB) return is_asc ? -1 : 1;
      return 0;
    });
  });

  console.log(" L1 : " + result.length + " -- " + payload.limit);

  // Apply pagination
  const start = payload.skip ?? 0;
  const end = start + (payload.limit ?? 10);

  return result.slice(start, end);
}
