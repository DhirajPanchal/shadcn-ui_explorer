export interface MdlUser {
  id: number;
  name: string;
  role: "VIEWER" | "REVIEWER" | "APPROVER";
  creation_date: string;
  creation_user: string;
  last_modification_date: string;
  last_modification_user: string;
  region: string;
  site: string;
  ad_user_id: number;
  image_url?: string;
}
