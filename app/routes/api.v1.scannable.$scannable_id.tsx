import type { LoaderFunctionArgs } from "@remix-run/node";
import { getScannable } from "~/database/queries/scannables";

export const loader = async ({ 
    params,
}: LoaderFunctionArgs) => {

  const scannable = await getScannable(params.scannable_id as string);
  console.log(JSON.stringify(scannable));
  
  return new Response(JSON.stringify(scannable), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
}