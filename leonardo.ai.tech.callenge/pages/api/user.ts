import { getUsers, saveUsers } from "@/util/user";
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
    console.log("body", req.body);
  }

  if (method === "PUT") {
    console.log("method", req.method);
    console.log("body", req.body);

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
