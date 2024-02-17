import type { NextApiRequest, NextApiResponse } from "next";

type ResPayloadType = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResPayloadType>
) {
  console.log("req.body", req.body);

  res.status(200).json({ name: "" });
}

// import createApolloClient from "@/util/apollo-client";
// import { gql } from "@apollo/client";
// export async function getStaticProps() {
//   const client = createApolloClient();

//   const { data } = await client.query({
//     query: gql`
//       query Countries {
//         countries(filter: { currency: { eq: "USD" } }) {
//           code
//           name
//           capital
//           languages {
//             name
//           }
//         }
//       }
//     `,
//   });

//   return {
//     props: {
//       countries: data.countries,
//     },
//   };
// }
