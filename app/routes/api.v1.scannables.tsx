import type { LoaderFunctionArgs } from "@remix-run/node";
import { getScannables } from "~/database/queries/scannables";

export const loader = async ({ 
    params,
}: LoaderFunctionArgs) => {
    const scannables = await getScannables();
    console.log(JSON.stringify(scannables));
    return new Response(JSON.stringify(scannables), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
  }