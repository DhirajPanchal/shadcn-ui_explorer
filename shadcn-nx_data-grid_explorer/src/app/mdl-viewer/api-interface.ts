import axios from "axios";
import { GradeChangeRecord } from "./mdl-viewer-metadata";
import {
  DataGridRequest,
  DataGridResponse,
} from "@/components/frame-datagrid/model";

// export interface FetchParams {
//   index: number;
//   size: number;
//   filter?: any[];
//   sort?: any[];
// }

// export async function fetchGradeRecords(params: FetchParams) {
//     const response = await axios.post("/api/records/garde", params);
//     return response.data; // { index, size, total, data }
// }

export async function fetchGradeRecords({
  index,
  size,
}: DataGridRequest): Promise<{
  index: number;
  size: number;
  total: number;
  data: typeof dummyData;
}> {
  const start = (index - 1) * size;
  const end = start + size;

  return {
    index,
    size,
    total: dummyData.length,
    data: dummyData.slice(start, end),
  };
}

export const dummyData: GradeChangeRecord[] = [
  {
    id: 1,
    grade_customer_id: "C1",
    grade_customer_name: "Customer 1",
    grade_gedu_legal_name: "Customer 1001",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: "",
    status: "INITIAL",
  },
  {
    id: 2,
    grade_customer_id: "C2",
    grade_customer_name: "Customer 2",
    grade_gedu_legal_name: "Customer 1002",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: "A",
    status: "REVIEWING",
  },
  {
    id: 3,
    grade_customer_id: "C3",
    grade_customer_name: "Customer 3",
    grade_gedu_legal_name: "Customer 1003",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: undefined,
    status: "WAITING_FOR_APPROVAL",
  },
  {
    id: 4,
    grade_customer_id: "C4",
    grade_customer_name: "Customer 1",
    grade_gedu_legal_name: "Customer 1004",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: "B",
    status: "APPROVED",
  },
  {
    id: 5,
    grade_customer_id: "C5",
    grade_customer_name: "Customer 5",
    grade_gedu_legal_name: "Customer 1005",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: "C",
    status: "REVIEWING",
  },

  {
    id: 6,
    grade_customer_id: "C6",
    grade_customer_name: "Customer 6",
    grade_gedu_legal_name: "Customer 1006",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: "",
    status: "INITIAL",
  },
  {
    id: 7,
    grade_customer_id: "C7",
    grade_customer_name: "Customer 7",
    grade_gedu_legal_name: "Customer 1007",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: "A",
    status: "REVIEWING",
  },
  {
    id: 8,
    grade_customer_id: "C8",
    grade_customer_name: "Customer 8",
    grade_gedu_legal_name: "Customer 1008",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: undefined,
    status: "WAITING_FOR_APPROVAL",
  },
  {
    id: 9,
    grade_customer_id: "C9",
    grade_customer_name: "Customer 9",
    grade_gedu_legal_name: "Customer 1009",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: "B",
    status: "APPROVED",
  },
  {
    id: 10,
    grade_customer_id: "C10",
    grade_customer_name: "Customer 10",
    grade_gedu_legal_name: "Customer 1010",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: "C",
    status: "REVIEWING",
  },

  {
    id: 11,
    grade_customer_id: "C11",
    grade_customer_name: "Customer 11",
    grade_gedu_legal_name: "Customer 1011",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: "",
    status: "INITIAL",
  },
  {
    id: 12,
    grade_customer_id: "C12",
    grade_customer_name: "Customer 12",
    grade_gedu_legal_name: "Customer 1012",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: "A",
    status: "REVIEWING",
  },
  {
    id: 13,
    grade_customer_id: "C13",
    grade_customer_name: "Customer 13",
    grade_gedu_legal_name: "Customer 1013",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: undefined,
    status: "WAITING_FOR_APPROVAL",
  },
  {
    id: 14,
    grade_customer_id: "C14",
    grade_customer_name: "Customer 14",
    grade_gedu_legal_name: "Customer 1014",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: "B",
    status: "APPROVED",
  },
  {
    id: 15,
    grade_customer_id: "C15",
    grade_customer_name: "Customer 15",
    grade_gedu_legal_name: "Customer 1015",
    grade_default_date: "2025-04-01",
    grade_grp_default_reason_desc: "C",
    status: "REVIEWING",
  },
];
