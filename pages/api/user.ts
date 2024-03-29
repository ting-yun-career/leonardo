import { getUser, getUsers, saveUsers } from "@/util/user";
import type { NextApiRequest, NextApiResponse } from "next";

type ResPayloadType = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResPayloadType>
) {
  const { method } = req;

  if (method === "GET") {
    const { id } = req.query;
    const data = await getUser(id as string);
    if (data) {
      res.status(200).json({ status: "success", data });
    } else {
      res.status(500).json({ status: "fail", error: "unable to find user" });
    }
  } else if (method === "POST") {
    try {
      const newUserData = JSON.parse(req.body);
      const result = await getUsers();

      if (result.status === "success") {
        const newUsers = result.data?.map((user: User) => {
          if (user.id === newUserData.id) {
            return { ...user, ...newUserData };
          }
          return user;
        });

        await saveUsers(newUsers ?? []);

        res.status(200).json({ status: "success", data: newUserData });
        return;
      }
    } catch {
      res.status(500).json({ status: "fail", error: "unable to write to database" });
    }
  } else {
    res.status(500).json({ status: "fail", error: "method not supported" });
  }
}
