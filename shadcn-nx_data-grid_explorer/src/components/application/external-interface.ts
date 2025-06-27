import { GradeChangeRecord, InputState, FilterBy, SortBy } from "./model";
import { DUMMY_RECORDS } from "./dummy";

/**
 * Applies filters based on inputState.filters
 */
function applyFilters(
  data: GradeChangeRecord[],
  filters: FilterBy[]
): GradeChangeRecord[] {
  return data.filter((item) => {
    return filters.every((filter) => {
      const value = (item as any)[filter.name];
      if (value === undefined || value === null) return false;

      switch (filter.type) {
        case "TEXT_LIKE":
          const needle = (filter.str_value ?? "").toString().toLowerCase();
          return value?.toString().toLowerCase().includes(needle);
        case "EQUAL":
          return value === filter.str_value;

        case "NUMBER_EQ":
          if (filter.list_of_str_value?.length) {
            return filter.list_of_str_value.includes(value.toString());
          }
          if (filter.str_value) {
            return Number(value) === Number(filter.str_value);
          }
          return false;

        case "DATE_GE":
          return new Date(value) >= new Date(filter.date_value ?? "");
        case "DATE_LE":
          return new Date(value) <= new Date(filter.date_value ?? "");
        default:
          return true;
      }
    });
  });
}

/**
 * Applies sorting based on inputState.sorts
 */
function applySorting(
  data: GradeChangeRecord[],
  sorts: SortBy[]
): GradeChangeRecord[] {
  return [...data].sort((a, b) => {
    for (const { name, is_asc } of sorts) {
      const aVal = (a as any)[name];
      const bVal = (b as any)[name];

      if (aVal == null || bVal == null) continue;
      if (aVal < bVal) return is_asc ? -1 : 1;
      if (aVal > bVal) return is_asc ? 1 : -1;
    }
    return 0;
  });
}

/**
 * Applies pagination
 */
function applyPagination(
  data: GradeChangeRecord[],
  skip: number,
  limit: number
): GradeChangeRecord[] {
  return data.slice(skip, skip + limit);
}

/**
 * Main mock API method
 * Accepts inputState: InputState and returns filtered + sorted + paginated data
 */
export function recordListingAPI(inputState: InputState): GradeChangeRecord[] {
  const { skip = 0, limit = 10, filters = [], sorts = [] } = inputState;

  let result = [...DUMMY_RECORDS];

  result = applyFilters(result, filters);
  result = applySorting(result, sorts);
  result = applyPagination(result, skip, limit);

  return result;
}
