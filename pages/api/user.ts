import { getUser, getUsers, saveUsers } from "@/util/user";
import type { NextApiRequest, NextApiResponse } from "next";

type ResPayloadType = {
  status: string;
  data?: User;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResPayloadType>
) {
  const { method, body } = req;

  if (method === "GET") {
    const { id } = req.query;
    const data = getUser(id as string);
    if (data) {
      res.status(200).json({ status: "success", data });
    } else {
      res.status(500).json({ status: "fail", error: "unable to find user" });
    }
  } else if (method === "PUT") {
    try {
      const newUserData = JSON.parse(req.body);
      const result = getUsers();

      if (result.status === "success") {
        const newUsers = result.data.map((user: User) => {
          if (user.id === newUserData.id) {
            return { ...user, ...newUserData };
          }
          return user;
        });

        const isSaved = saveUsers(newUsers);

        if (isSaved) {
          res.status(200).json({ status: "success", data: newUserData });
        } else {
          res
            .status(500)
            .json({ status: "fail", error: "unable to save user" });
        }
      } else {
        res
          .status(500)
          .json({ status: "fail", error: "unable to read user data" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: "fail", error: "unable to parse user data" });
    }

    res.status(200).json({ status: "success" });
  } else {
    res.status(500).json({ status: "fail", error: "method not supported" });
  }
}