import type { NextApiRequest, NextApiResponse } from "next";
import createApolloClient from "@/util/apollo-client";
import { gql } from "@apollo/client";

type ResPayloadType = {
  status: "success" | "error";
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResPayloadType>
) {
  const client = createApolloClient();

  try {
    const { data } = await client.query({
      query: gql`
        query Countries {
          countries(filter: { currency: { eq: "USD" } }) {
            code
            name
            capital
            languages {
              name
            }
          }
        }
      `,
    });

    const processe_data = data.countries.map(
      ({
        code,
        name,
        capital,
        languages,
      }: {
        code: string;
        name: string;
        capital: string;
        languages: Array<{ name: string }>;
      }) => ({
        code,
        name,
        capital,
        languages: languages.map(({ name }) => name),
      })
    );

    res.status(200).json({ status: "success", data: processe_data });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: "unable to fetch api resource" });
  }
}
