import axios from "axios";
import {
  DataGridRequest,
  DataGridResponse,
  GradeChangeRecord,
} from "@/components/application/model";
import { dummyData } from "./dummy";
import { log } from "console";

export async function loadGradeRecords(payload: DataGridRequest) {
  // const response = await axios.post("/api/records/query", payload);
  // return response.data;
  console.log("API ");
  console.log(payload);
  const { skip, limit } = payload;
  const sliced = dummyData.slice(skip, skip + limit);

  const response: DataGridResponse<GradeChangeRecord> = {
    data: sliced,
    skip,
    limit,
    total: dummyData.length,
  };

  return response;
}
