import { NextResponse } from "next/server";
import { MdlUser } from "@/types/mdl-user";

const MOCK_USERS: MdlUser[] = [
  {
    id: 0,
    name: "Dhiraj Panchal",
    ad_user_id: 12345,
    role: "REVIEWER",
    region: "India",
    site: "Bangalore",
    image_url: "male.png",
    creation_date: "",
    creation_user: "",
    last_modification_date: "",
    last_modification_user: "",
  },
  {
    id: 0,
    name: "Amit Verma",
    ad_user_id: 67890,
    role: "APPROVER",
    region: "US",
    site: "New York",
    image_url: "male.png",
    creation_date: "",
    creation_user: "",
    last_modification_date: "",
    last_modification_user: "",
  },
];

export async function GET(
  req: Request,
  { params }: { params: { ad_user_id: string } }
) {
  const adUserId = Number(params.ad_user_id);
  const user = MOCK_USERS.find((u) => u.ad_user_id === adUserId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
