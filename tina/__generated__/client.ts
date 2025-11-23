import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
const url = process.env.NEXT_PUBLIC_TINA_GRAPHQL_URL || 'http://localhost:4001/graphql';
export const client = createClient({ url, token: process.env.TINA_TOKEN, queries,  });
export default client;
