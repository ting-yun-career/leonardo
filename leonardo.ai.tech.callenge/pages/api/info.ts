import type { NextApiRequest, NextApiResponse } from "next";
import createApolloClient from "@/util/apollo-client";
import { gql } from "@apollo/client";

type ResPayloadType = {
  status: "success" | "error";
  payload: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResPayloadType>
) {
  console.log("req.body", req.body);

  const client = createApolloClient();

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

  console.log(data);

  res.status(200).json({ status: "success", payload: "" });
}

// export async function getStaticProps() {

//   return {
//     props: {
//       countries: data.countries,
//     },
//   };
// }
