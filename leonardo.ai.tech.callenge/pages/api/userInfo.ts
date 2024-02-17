import { getUsers } from "@/util/user";
import type { NextApiRequest, NextApiResponse } from "next";

type ResPayloadType = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResPayloadType>
) {
  console.log("req.body", req.body);

  const users = getUsers();
  console.log("users", users);

  res.status(200).json({ name: "" });
}
