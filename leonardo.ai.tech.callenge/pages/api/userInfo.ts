// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs").promises;

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("req.body", req.body);

  const users = getUsers();
  console.log("users", users);

  res.status(200).json({});
}

export function getUsers() {
  try {
    const data: User[] = fs.readFileSync(`../../data/users.json`);
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", error };
  }
}

export function getUser(id: string) {
  const result = getUsers();
  if (result.status === "success") {
    const user = result.data?.find((u) => u.id === id) ?? null;
  }
}
