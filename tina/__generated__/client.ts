import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4002/graphql', token: 'undefined', queries,  });
export default client;
  